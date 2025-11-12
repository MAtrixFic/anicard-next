'use client'
import PreviewSelectionCard from "@/components/additionals/cards/PreviewSelectionCard"
import { useCardsStore } from "@/devs/store/CardsStore"
import PreviewCard from "@/components/additionals/cards/PreviewCard"

const Fight = () => {
    const cards = useCardsStore(state => state.allCards)
    return (
        <div className="fight">
            <div className="battle-scene">
                <div className="battle-scene__fight-container battle-scene__fight-containe-rival">

                </div>
                <div className="battle-scene__fight-container battle-scene__fight-containe-you">

                </div>
            </div>

            <div className="fight__user-manager">
                <section className="health-bar">
                    <div className="health-bar__user-logo-container">
                        <div className="health-bar__user-name-container">
                            <span className="health-bar__user-name">MAtrix</span>
                        </div>
                    </div>
                    <div className="health-bar__user-health-bar-container">

                    </div>
                </section>
                <section className="fight__card-inventory">
                    <ul className="fight__inventory">
                        {cards.map((v, i) =>
                            <li className="fight__inv-element">
                                <PreviewCard
                                    key={v?.id + i}
                                    thisCard={v}
                                />
                            </li>
                        )}
                    </ul>
                </section>
            </div>
        </div>
    )
}

export default Fight