'use client'
import { IBattleCard } from "@/devs/store/BattleStore"
import LightButton from "@/components/additionals/buttons/LightButton"
import { Cloudly } from "@/components/icons/Weathers"
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
import { TCardRarity } from "@/components/additionals/Windows/CardGlobalChoiseList"

export type TSelectedBattleCard = IBattleCard | null
export type TSelectionCardsArr = [TSelectedBattleCard, TSelectedBattleCard, TSelectedBattleCard]

interface IBatteResCard {
    attribute: string,
    damage: number,
    health: number,
    id: number,
    max_health: number
    photo: string,
    rarity: TCardRarity,
}

const Fight = () => {
    const { ws, players } = useBattleSocket()

    const portalContainer = usePortal()
    const [selectedCard, setSelectedCard] = useSelection<IBattleCard>(false, '.fight__inventory');
    const [handCards, setHandCards] = useState<IBattleCard[]>([])
    // const [rivalCards, setRivalCards] = useState<IBattleCard[]>([])
    const [selectionBattleCards, setSelectionBattleCards] = useState<TSelectionCardsArr>([null, null, null])
    const [hps, setHps] = useState<{ rivalHP: number, yourHP: number }>({ rivalHP: 200, yourHP: 200 })

    const [battleState, setBattleState] = useState<string>('deployment')

    const setBattleCard = useCallback((index: number) => {
        if (selectedCard) {
            const battleCardsPreview = Object.create(selectionBattleCards)
            battleCardsPreview[index] = selectedCard
            setSelectionBattleCards(battleCardsPreview);
            setSelectedCard(null);
        }
    }, [selectedCard])

    useEffect(() => {
        setHps(prev => ({
            rivalHP: prev.rivalHP > 0 ? prev.rivalHP : 0,
            yourHP: prev.yourHP > 0 ? prev.yourHP : 0
        }))
    }, [hps.rivalHP, hps.yourHP])

    useEffect(() => {
        if (ws) ws.onmessage = (event) => {
            const jsonEvent = JSON.parse(event.data)
            if (jsonEvent.type === EventTypes.BATTLE_STATE) {
                console.log(jsonEvent.state.phase, jsonEvent.state.player_hand)
                if (jsonEvent.state.phase) {
                    console.log(jsonEvent.state.player_hand)
                    // if () {
                    SetHandCards(jsonEvent.state.player_hand)
                    setBattleState(jsonEvent.state.phase);
                    setHps(() => ({
                        rivalHP: jsonEvent.state.opponent_hp,
                        yourHP: jsonEvent.state.player_hp
                    }))
                    // const rivalBattleCards: IBattleCard[] = (jsonEvent.state.opponent_field as IBatteResCard[]).map(v => ({
                    //     attribute: v.attribute,
                    //     damage: v.damage,
                    //     health: v.health,
                    //     id: v.id,
                    //     maxHealth: v.max_health,
                    //     photo: v.photo,
                    //     rarity: v.rarity,
                    // }))
                    // setRivalCards(rivalBattleCards)
                    // }
                }
            }
        }
    }, [ws])

    function SetHandCards(cards: IBatteResCard[]) {
        const handCards: IBattleCard[] = cards.map(v => ({
            attribute: v.attribute,
            damage: v.damage,
            health: v.health,
            id: v.id,
            maxHealth: v.max_health,
            photo: v.photo,
            rarity: v.rarity,
        }))
        setHandCards(handCards)
    }

    useEffect(() => {
        if (ws)
            ws.send(JSON.stringify({
                type: EventTypes.BATTLE_STATE
            }))
    }, [])

    return (
        <div className="fight">
            {portalContainer && createPortal(<FightHeader />, portalContainer)}
            <div className="fight__rival">
                <HealthBar userName={players[1]} health={hps.rivalHP / 2} additionalStyle="rival" />
            </div>
            <div className="fight__battle-scene">
                {/* <BattleScene
                    battleState={battleState}
                    rivalCards={rivalCards}
                    selectionBattleCards={selectionBattleCards}
                    setBattleCard={setBattleCard}
                    selectedCard={selectedCard}
                    setSelectedCard={setSelectedCard} /> */}
            </div>
            <div className="fight__user-manager">
                <HealthBar userName={players[0]} health={hps.yourHP / 2} additionalStyle="you" />
                <section className="fight__card-inventory">
                    <ul className="fight__inventory">
                        {handCards.map((v, i) =>
                            <BattleCard
                                key={v!.id + i}
                                thisCard={v}
                                selectedCard={selectedCard}
                                setSelection={(card: IBattleCard | null) => setSelectedCard(battleState === 'deployment' ? card : null)}
                            />
                        )}
                    </ul>
                </section>
            </div>
            {battleState === 'finished' && <FinishWindow hps={hps} />}
        </div>
    )
}

interface IFinishWindowProps {
    hps: {
        rivalHP: number,
        yourHP: number
    }
}

const FinishWindow = ({ hps }: IFinishWindowProps) => {
    const [ws, setWS, setWSTimer] = useOverWindowStatus(300);
    const [winMode, setWinMode] = useState<'draw' | 'win' | 'loose' | 'no'>('no');
    const router = useRouter();

    useEffect(() => {
        setWSTimer();
        if (hps.rivalHP <= 0 && hps.yourHP <= 0) {
            setWinMode('draw')
            return
        }

        if (hps.rivalHP <= 0) {
            setWinMode('win')
            return
        }
        if (hps.yourHP <= 0) {
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
        draw: 100,
        win: 250,
        loose: -140,
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
                            <LightButton title={"Выйти"} additionStyle="green" func={() => router.push('/')} />
                        </div>
                    </section>
                </div>
            </div>
        </OverBlackSpace>
    )
}

const WeatherElement = () => {
    const [openDesc, setOpenDesc] = useState(false)
    const weatherRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function CloseDescWindow(event: MouseEvent) {
            if (weatherRef.current && !weatherRef.current.contains(event.target as Node))
                setOpenDesc(false)
        }
        document.body.addEventListener('click', CloseDescWindow)

        return () => document.body.removeEventListener('click', CloseDescWindow)
    }, [])

    return (
        <div className="weather-element" ref={weatherRef}>
            <button className="weather-element__btn" onClick={() => setOpenDesc(prev => !prev)}>
                <Cloudly />
            </button>
            {openDesc &&
                < div className="weather-element__desc-block">
                    <p className="weather-element__desc">
                        Описание погоды
                    </p>
                </div>
            }
        </div >
    )
}

const FightHeader = () => {
    return (
        <header className="fight-header">
            <div className="fight-header__container">
                <div className="fight-header__left-block">
                    <LightButton additionStyle="purple" title={'Выйти'} />
                </div>
                <div className="fight-header__right-block">
                    <WeatherElement />
                </div>
            </div>
        </header>
    )
}


export default Fight