'use client'
import { useCardsStore } from "@/devs/store/CardsStore"
import { IBattleCard, useBattleStore } from "@/devs/store/BattleStore"
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

export type TSelectedBattleCard = IBattleCard | null
export type TSelectionCardsArr = [TSelectedBattleCard, TSelectedBattleCard, TSelectedBattleCard]

const Fight = () => {
    const battleCards = useCardsStore(state => state.battleCards)
    const setCards = useBattleStore(state => state.setCards)
    const rivalCards = useBattleStore(state => state.rivalBattleCards)
    const userCards = useBattleStore(state => state.userBattleCards)
    const battleState = useBattleStore(state => state.battleState)
    const setBattleState = useBattleStore(state => state.setBattleState)

    const portalContainer = usePortal()
    const [defeatedCards, setDefeatedCards] = useState<IBattleCard[]>([])
    const [selectedCard, setSelectedCard] = useSelection<IBattleCard>(false, '.fight__inventory');
    const [selectionBattleCards, setSelectionBattleCards] = useState<TSelectionCardsArr>([null, null, null])

    const [selectionRatingPreBattle, setSelectionRatingPreBattle] = useState<(number | null)[]>([])
    const [rivalRatingPreBattle, setRivalRatingPreBattle] = useState<(number | null)[]>([])

    const [hps, setHps] = useState<{ rivalHP: number, yourHP: number }>({ rivalHP: 200, yourHP: 200 })

    const setBattleCard = useCallback((index: number) => {
        if (selectedCard) {
            const battleCardsPreview = Object.create(selectionBattleCards)
            battleCardsPreview[index] = selectedCard
            setSelectionBattleCards(battleCardsPreview);
            setSelectedCard(null);
        }
    }, [selectedCard])

    useEffect(() => {
        setCards('userBattleCards', userCards.filter(v => !selectionBattleCards.includes(v)))

        selectionBattleCards.forEach((v) => {
            if (v)
                if (v!.hp <= 0) {
                    setTimeout(() => {
                        setDefeatedCards(prev => [...prev, v!])
                        setSelectionBattleCards(prev => prev.map(val => val?.id === v!.id ? null : val) as TSelectionCardsArr);
                    }, 2400)
                }
        })
    }, [selectionBattleCards])

    useEffect(() => {
        setCards('userBattleCards', userCards.filter(v => !defeatedCards.includes(v!)))
    }, [defeatedCards])

    useEffect(() => {
        rivalCards.forEach((v, i) => {
            if (v)
                if (v!.hp <= 0) {
                    setTimeout(() => {
                        const newRivalCards = rivalCards.map((val, index) => index === i ? null : val)
                        setCards('rivalBattleCards', newRivalCards);
                    }, 2400)
                }
        })
    }, [rivalCards])

    useEffect(() => {
        setBattleState('waiting-battle')
        setCards('userBattleCards', battleCards.map(v => ({ ...v, hp: v.options.rating })))
    }, [])

    useEffect(() => {
        setHps(prev => ({
            rivalHP: prev.rivalHP > 0 ? prev.rivalHP : 0,
            yourHP: prev.yourHP > 0 ? prev.yourHP : 0
        }))
    }, [hps.rivalHP, hps.yourHP])

    useEffect(() => {
        switch (battleState) {
            case 'battle':
                setRivalRatingPreBattle(rivalCards.map((v) => v ? v.options.rating : null));
                setSelectionRatingPreBattle(selectionBattleCards.map((v) => v ? v.options.rating : null))
                let rDamage = 0;
                let yDamage = 0;
                setTimeout(() => {
                    console.log('Battle')
                    const newYourBattleCards = selectionBattleCards.map((v, i) => {
                        const damagePrev = v ? rivalCards[i] ? (v!.options.rating - rivalCards[i]?.hp) > 0 ? (v!.options.rating - rivalCards[i]?.hp) : 0 : v!.options.rating : 0
                        rDamage += damagePrev
                        return v ? ({
                            ...v, hp: rivalCards[i] ? v!.hp - (rivalCards[i]?.options.rating || 0) : v.hp,
                            options: {
                                attribute: v.options.attribute,
                                rating: damagePrev
                            }
                        }) : null
                    })
                    const newRivalCards = rivalCards.map((v, i) => {
                        const damagePrev = v ? selectionBattleCards[i] ? (v!.options.rating - selectionBattleCards[i]?.hp) > 0 ? (v!.options.rating - selectionBattleCards[i]?.hp) : 0 : v!.options.rating : 0
                        yDamage += damagePrev
                        return v ? ({
                            ...v, hp: selectionBattleCards[i] ?
                                v!.hp - (selectionBattleCards[i]?.options.rating || 0) : v.hp,
                            options: {
                                attribute: v.options.attribute,
                                rating: damagePrev
                            }
                        }) : null
                    })
                    console.log(rDamage, yDamage)
                    setCards('rivalBattleCards', newRivalCards);
                    setSelectionBattleCards(newYourBattleCards as TSelectionCardsArr);
                    setTimeout(() => {
                        setHps(prev => ({
                            rivalHP: prev.rivalHP - rDamage,
                            yourHP: prev.yourHP - yDamage
                        }))
                        setTimeout(() => {
                            setBattleState('waiting-battle')
                        }, 300)
                    }, 2000)
                }, 1000)
                break;
            case 'waiting-battle':
                setSelectionBattleCards(selectionBattleCards.map((v, i) => v ? ({
                    ...v, options: {
                        rating: selectionRatingPreBattle[i] ? selectionRatingPreBattle[i] : v.options.rating,
                        attribute: v.options.attribute
                    }
                }) : null) as TSelectionCardsArr)
                setCards('rivalBattleCards', rivalCards.map((v, i) => v ? ({
                    ...v, options: {
                        rating: rivalRatingPreBattle[i] ? rivalRatingPreBattle[i] : v.options.rating,
                        attribute: v.options.attribute
                    }
                }) : null) as TSelectionCardsArr)
                if (hps.rivalHP <= 0 || hps.yourHP <= 0) {
                    setBattleState('finished')
                }
                break;
        }
    }, [battleState])

    return (
        <div className="fight">
            {portalContainer && createPortal(<FightHeader />, portalContainer)}
            <div className="fight__rival">
                <HealthBar userName="CorpBros" health={hps.rivalHP / 2} additionalStyle="rival" />
            </div>
            <div className="fight__battle-scene">
                <BattleScene
                    battleState={battleState}
                    rivalCards={rivalCards}
                    selectionBattleCards={selectionBattleCards}
                    setBattleCard={setBattleCard}
                    selectedCard={selectedCard}
                    setSelectedCard={setSelectedCard} />
            </div>
            <div className="fight__user-manager">
                <HealthBar userName="MAtrix" health={hps.yourHP / 2} additionalStyle="you" />
                <section className="fight__card-inventory">
                    <ul className="fight__inventory">
                        {userCards.map((v, i) =>
                            <BattleCard
                                key={v!.id + i}
                                thisCard={v!}
                                selectedCard={selectedCard}
                                setSelection={(card: IBattleCard | null) => setSelectedCard(battleState === 'waiting-battle' ? card : null)}
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