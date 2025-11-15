'use client'
import { useCardsStore } from "@/devs/store/CardsStore"
import PreviewBattleCard from "@/components/additionals/cards/PreviewBattleCard"
import LightButton from "@/components/additionals/buttons/LightButton"
import { Cloudly } from "@/components/icons/Weathers"
import { useEffect, useState, useRef } from "react"
import { createPortal } from "react-dom"
import usePortal from "@/devs/hooks/usePortal"
import BattleCard from "@/components/additionals/cards/BattleCard"
import { ICard } from "@/components/additionals/Windows/CardGlobalChoiseList"
import useSelection from "@/devs/hooks/useSelection"


const Fight = () => {
    const cards = useCardsStore(state => state.allCards)
    const portalContainer = usePortal()

    const [selectedCard, setSelectedCard] = useSelection<ICard>()
    const [selectionBattleCards, setSelectionBattleCards] = useState<[ICard | null, ICard | null, ICard | null]>([null, null, null])

    function SetBattleCardard(index: number) {
        if (selectedCard) {
            const battleCardsPreview = Object.create(selectionBattleCards)
            battleCardsPreview[index] = selectedCard
            setSelectionBattleCards(battleCardsPreview);
            setSelectedCard(null);
        }
    }

    return (
        <div className="fight">
            {portalContainer && createPortal(<FightHeader />, portalContainer)}
            <div className="fight__rival">
                <HealthBar userName="CorpBros" health={100} additionalStyle="rival" />
            </div>
            <div className="fight__battle-scene">
                <div className="battle-scene">
                    <div className="battle-scene__fight-container battle-scene__fight-containe-rival">
                        <ul className="battle-scene__cards-list">
                            {new Array(3).fill(null).map((v, i) =>
                                <PreviewBattleCard rival key={v + i} thisCard={undefined} />
                            )}
                        </ul>
                    </div>
                    <div className="battle-scene__fight-container battle-scene__fight-containe-you">
                        <ul className="battle-scene__cards-list">
                            {new Array(3).fill(null).map((v, i) =>
                                <PreviewBattleCard
                                    key={v + i}
                                    thisCard={selectionBattleCards[i] || undefined}
                                    func={() => SetBattleCardard(i)}
                                    activeElemenet={selectionBattleCards[i] && <BattleCard
                                        thisCard={selectionBattleCards[i]}
                                        selectedCard={selectedCard}
                                        setSelection={setSelectedCard}
                                    />}
                                />
                            )}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="fight__user-manager">
                <HealthBar userName="MAtrix" health={100} additionalStyle="you" />
                <section className="fight__card-inventory">
                    <ul className="fight__inventory">
                        {cards.slice(0, 6).filter(v => !selectionBattleCards.includes(v)).map((v, i) =>
                            <BattleCard
                                key={v?.id + i}
                                thisCard={v}
                                selectedCard={selectedCard}
                                setSelection={setSelectedCard}
                            />
                        )}
                    </ul>
                </section>
            </div>
        </div>
    )
}

interface IHealthBar {
    userName: string,
    health: number,
    additionalStyle?: string,
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

const HealthBar = ({ userName, health, additionalStyle }: IHealthBar) => {
    return (
        <section className={`health-bar ${additionalStyle}`}>
            <div className="health-bar__user-logo-container">
                <div className="health-bar__user-name-container">
                    <span className="health-bar__user-name">{userName}</span>
                </div>
            </div>
            <div className="health-bar__user-health-bar-container" />
        </section>
    )
}

export default Fight