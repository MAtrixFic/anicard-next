'use client'
import LightButton from "@/components/additionals/buttons/LightButton"
import Image from "next/image"
import { useEffect, useState, useRef, useCallback, useMemo } from "react"
import { createPortal } from "react-dom"
import usePortal from "@/devs/hooks/usePortal"
import BattleCard from "@/components/additionals/cards/BattleCard"
import useSelection from "@/devs/hooks/useSelection"
import BattleScene from "@/components/routes/battleField/BattleScene"
import HealthBar from "@/components/routes/battleField/HealthBar"
import useOverWindowStatus from "@/devs/hooks/useOverWindowStatus"
import OverBlackSpace from "@/components/additionals/OverBlackSpace"
import { useRouter } from "next/navigation"
import useBattleSocket from "@/devs/hooks/server/useBattleSocket"
import { EventTypes } from "@/devs/store/BattleSocketStore"
import { ICard, TCardRarity } from "@/components/additionals/Windows/CardGlobalChoiseList"

export type TSelectedBattleCard = IBattleCard | null
export type TSelectionCardsArr = [TSelectedBattleCard, TSelectedBattleCard, TSelectedBattleCard]
export type TBattleState = 'deployment' | 'battle' | 'ended' | 'ready'

interface IBatteResCard {
    attribute: string,
    damage: number,
    health: number,
    id: number,
    max_health: number
    photo: string,
    rarity: TCardRarity,
}

interface IBattleResult {
    card_damage1: number,
    card_damage2: number,
    slot: number,
    damage_to_player2: number,
    damage_to_player1: number,
    player1_card: IBatteResCard,
    player2_card: IBatteResCard,
}

export interface IBattleCard extends Omit<ICard, 'universe' | 'rating' | 'category'> {
    health: number
    maxHealth: number
    damage: number
}

export type TSetResultCards = (cards: TSelectionCardsArr) => void
export type TSetHandCards = (cards: IBattleCard[]) => void

export function SetBattleCardsCards<T extends TSetResultCards>(cards: IBatteResCard[], func: T, prevCards?: TSelectionCardsArr) {
    const handCards: TSelectionCardsArr = cards.map((v, i) => v ? ({
        attribute: v.attribute,
        damage: v.damage,
        health: v.health,
        id: v.id,
        maxHealth: v.max_health,
        photo: v.photo,
        rarity: v.rarity,
    }) : prevCards ? prevCards[i] ? ({
        attribute: prevCards[i].attribute,
        damage: prevCards[i].damage,
        health: 0,
        id: prevCards[i].id,
        maxHealth: prevCards[i].maxHealth,
        photo: prevCards[i].photo,
        rarity: prevCards[i].rarity,
    }) : null : null) as TSelectionCardsArr
    func(handCards)
}

export function SetHandCards<T extends TSetHandCards>(cards: IBatteResCard[], func: T) {
    const handCards: IBattleCard[] = cards.map(v => ({
        attribute: v.attribute,
        damage: v.damage,
        health: v.health,
        id: v.id,
        maxHealth: v.max_health,
        photo: v.photo,
        rarity: v.rarity,
    }))
    func(handCards)
}

export function SetResult<T extends TSetResultCards, P extends TSetResultCards>(rival: IBatteResCard[], player: IBatteResCard[], prevRival: TSelectionCardsArr, prevPlayer: TSelectionCardsArr, setRival: T, setPlayer: P) {
    SetBattleCardsCards(rival, setRival, prevRival);
    SetBattleCardsCards(player, setPlayer, prevPlayer)
}

const Fight = () => {
    const { ws, players, environment, CloseWS, location, weather } = useBattleSocket()
    const router = useRouter()

    const isYou = useMemo(() => environment === 'weather', [])
    const portalContainer = usePortal()
    const [selectedCard, setSelectedCard] = useSelection<IBattleCard>(false, '.fight__inventory');
    const [selectionBattleCards, setSelectionBattleCards] = useState<TSelectionCardsArr>([null, null, null])
    const [handCards, setHandCards] = useState<IBattleCard[]>([])
    const [rivalCards, setRivalCards] = useState<TSelectionCardsArr>([null, null, null])

    const [hps, setHps] = useState<{ rivalHP: number, yourHP: number }>({ rivalHP: 200, yourHP: 200 })
    const [battleState, setBattleState] = useState<TBattleState>('deployment')
    const [timer, setTimer] = useState<number>(0)

    const setBattleCard = useCallback((index: number) => {
        if (selectedCard) {
            let battleCardsPreview = Object.create(selectionBattleCards)
            battleCardsPreview = (battleCardsPreview as TSelectionCardsArr).map(v => v ? v.id === selectedCard.id ? null : v : v)
            battleCardsPreview[index] = selectedCard
            setSelectionBattleCards(battleCardsPreview);
            setSelectedCard(null);
        }
    }, [selectedCard])

    async function ExitBattle() {
        CloseWS()
        router.push('/')
    }

    useEffect(() => {
        setHps(prev => ({
            rivalHP: prev.rivalHP > 0 ? prev.rivalHP : 0,
            yourHP: prev.yourHP > 0 ? prev.yourHP : 0
        }))
    }, [hps.rivalHP, hps.yourHP])

    useEffect(() => {
        if (ws) ws.onmessage = (event) => {
            const jsonEvent = JSON.parse(event.data)
            console.log(jsonEvent)
            if (jsonEvent.type === EventTypes.BATTLE_STATE) {
                SetHandCards(jsonEvent.state.player_hand, setHandCards)
                if (jsonEvent.state.phase) {
                    if (jsonEvent.state.phase === 'deployment') {
                        setBattleState('deployment')
                        SetBattleCardsCards(jsonEvent.state.player_field, setSelectionBattleCards)
                    }
                }
            }
            if (jsonEvent.type === EventTypes.ROUND_RESULT) {
                const result = jsonEvent.results as IBattleResult[];
                let rival = result.map(v => isYou ? v.player2_card : v.player1_card)
                let player = result.map(v => isYou ? v.player1_card : v.player2_card)
                result.forEach((_, i) => {
                    if (rival[i])
                        rival[i].damage = isYou ? result[i].card_damage2 : result[i].card_damage1
                    if (player[i])
                        player[i].damage = isYou ? result[i].card_damage1 : result[i].card_damage2
                    console.log(result[i].card_damage1, result[i].card_damage2)
                })
                setTimeout(() => {
                    setBattleState('battle')
                    setTimeout(() => {
                        console.log(rival, player)
                        SetResult(rival, player, jsonEvent.state.opponent_field, jsonEvent.state.player_field, setRivalCards, setSelectionBattleCards)
                        SetHandCards(jsonEvent.state.player_hand, setHandCards)
                        setHps(() => ({
                            rivalHP: isYou ? jsonEvent.player2_hp : jsonEvent.player1_hp,
                            yourHP: isYou ? jsonEvent.player1_hp : jsonEvent.player2_hp
                        }))
                    }, 2000)
                }, 200)
                SetResult(jsonEvent.state.opponent_field, jsonEvent.state.player_field, rivalCards, selectionBattleCards, setRivalCards, setSelectionBattleCards)
            }
            if (jsonEvent.type === EventTypes.BATTLE_ENDED) {
                setTimeout(() => {
                    setBattleState('ended')
                }, 6000)
                setHps(() => ({
                    rivalHP: isYou ? jsonEvent.player2_hp : jsonEvent.player1_hp,
                    yourHP: isYou ? jsonEvent.player1_hp : jsonEvent.player2_hp
                }))
                ws.send(JSON.stringify({
                    type: EventTypes.BATTLE_STATE
                }))
            }
            if (jsonEvent.type === EventTypes.TIMER_UPDATE) {
                setTimer(jsonEvent.time_left)
            }
        }
    }, [ws])

    useEffect(() => {
        if (ws)
            ws.send(JSON.stringify({
                type: EventTypes.BATTLE_STATE
            }))
    }, [])

    useEffect(() => {
        console.log(selectedCard, handCards)
    }, [selectedCard])


    function ReadyBattle() {
        console.log(JSON.stringify({
            type: 'ready',
            field: selectionBattleCards.map(v => v ? v.id : null)
        }))
        if (ws) ws.send(JSON.stringify({
            type: 'ready',
            field: selectionBattleCards.map(v => v ? v.id : null)
        }))
        setBattleState('ready')
    }

    return (
        <div className="fight">
            {portalContainer && createPortal(<FightHeader battleState={battleState} timer={timer} exit={ExitBattle} weather={weather} location={location} />, portalContainer)}
            <div className="fight__rival">
                <HealthBar userName={players[1]} health={hps.rivalHP / 2} additionalStyle="rival" />
            </div>
            <div className="fight__battle-scene">
                <BattleScene
                    rivalCards={rivalCards}
                    battleState={battleState}
                    selectionBattleCards={selectionBattleCards}
                    setBattleCard={setBattleCard}
                    selectedCard={selectedCard}
                    setSelectedCard={setSelectedCard}
                    readyFunc={ReadyBattle}
                />
            </div>
            <div className="fight__user-manager">
                <HealthBar userName={players[0]} health={hps.yourHP / 2} additionalStyle="you" />
                <section className="fight__card-inventory">
                    <ul className="fight__inventory">
                        {handCards.filter(v => !selectionBattleCards.map(sv => sv ? sv.id : -1).includes(v.id)).map((v, i) =>
                            <BattleCard
                                key={v!.id}
                                thisCard={v}
                                selectedCard={selectedCard}
                                setSelection={(card: IBattleCard | null) => setSelectedCard(battleState === 'deployment' ? card : null)}
                            />
                        )}
                    </ul>
                </section>
            </div>
            {battleState === 'ended' && <FinishWindow hps={hps} exit={ExitBattle} />}
        </div>
    )
}

interface IFinishWindowProps {
    hps: {
        rivalHP: number,
        yourHP: number
    },
    exit: () => void;
}

const FinishWindow = ({ hps, exit }: IFinishWindowProps) => {
    const [ws, setWS, setWSTimer] = useOverWindowStatus(300);
    const [winMode, setWinMode] = useState<'draw' | 'win' | 'loose' | 'no'>('no');

    useEffect(() => {
        setWSTimer();
        if (hps.rivalHP <= 0 && hps.yourHP <= 0 || hps.yourHP === hps.rivalHP) {
            setWinMode('draw')
            return
        }

        if (hps.rivalHP <= 0 || hps.yourHP > hps.rivalHP) {
            setWinMode('win')
            return
        }
        if (hps.yourHP <= 0 || hps.yourHP > hps.rivalHP) {
            setWinMode('loose')
            return
        }

    }, [])

    const finishTitle = useMemo(() => ({
        draw: 'Ничья',
        win: 'Победа',
        loose: 'Поражение',
        no: ''
    }), [winMode])

    const finishScore = useMemo(() => ({
        draw: 0,
        win: +10,
        loose: 0,
        no: 0
    }), [winMode])

    return (
        <OverBlackSpace additionStyle={ws}>
            <div className="finish-window">
                <div className="finish-window__body">
                    <section className="finish-window__section finish-window__section-main">
                        <div className="finish-window__container finish-window__container-status">
                            <h2 className="finish-window__status-text">
                                {finishTitle[winMode]}
                            </h2>
                        </div>
                        <div className="finish-window__container finish-window__container-score">
                            <div className="finish-window__score-container">
                                <h2 className="finish-window__score-text">
                                    {finishScore[winMode]}
                                </h2>
                            </div>
                        </div>
                    </section>
                    <section className="finish-window__section">
                        <div className="finish-window__container finish-window__container-logic">
                            <LightButton title={"Выйти"} additionStyle="green" func={exit} />
                        </div>
                    </section>
                </div>
            </div>
        </OverBlackSpace>
    )
}

const FightElement = ({ element }: { element: string }) => {
    return (
        <div className="weather-element">
            <Image width={36} height={36} alt="element" src={`https://obviously-vocal-seagull.cloudpub.ru${element}.png`} />
        </div >
    )
}

const FightHeader = ({ timer, exit, weather, location, battleState }: { timer: number, exit: () => void, weather: string, location: string, battleState: string }) => {
    return (
        <header className="fight-header">
            <div className="fight-header__container">
                <div className="fight-header__left-block">
                    <LightButton additionStyle="purple" title={'Выйти'} func={exit} />
                </div>
                <div className="fight-header__right-block">
                    <div className="fight-header__timer">
                        <span className="fight-header__timer-text">
                            {timer}
                        </span>
                    </div>
                    <div className="fight-header__state">
                        <span className="fight-header__state-text">
                            {battleState}
                        </span>
                    </div>
                    <FightElement element={weather} />
                    <FightElement element={location} />
                </div>
            </div>
        </header>
    )
}


export default Fight