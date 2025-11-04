'use client'
import Input from "@/components/additionals/Input"
import SearchFilter from "@/components/routes/profile/SearchFilter"
import PreviewSelectionCard from "@/components/additionals/cards/PreviewSelectionCard"
import { useCardsStore } from "@/devs/store/CardsStore"
import useSelectionCard from "@/devs/hooks/useSelectionCard"
import { CardDesctiption } from "@/components/additionals/cards/CardGlobalChoiseList"
import LightButton from "@/components/additionals/buttons/LightButton"
const Page = () => {
    const cards = useCardsStore(state => state.allCards)
    const [selectedCard, setSelectedCard] = useSelectionCard()

    return (
        <div className="cards-choise">
            <div className="cards-choise__list-container">
                <section className="cards-choise__filter pd">
                    <Input />
                    <SearchFilter />
                </section>
                <section className="cards-choise__cards-list">
                    <ul className="cards-choise__list">
                        {cards.map((v, i) =>
                            <PreviewSelectionCard
                                key={v?.id + i}
                                setSelection={setSelectedCard}
                                selectedCard={selectedCard}
                                thisCard={v}
                            />
                        )}
                    </ul>
                </section>
            </div>
            {selectedCard && <div className="desc-panel">
                <CardDesctiption
                    opts={selectedCard ? [{ key: 'Ранг', value: selectedCard.rang }] : []}
                    name={selectedCard?.name}
                />
                <LightButton title='Продать' additionStyle="green" />
            </div>}
        </div>
    )
}
export default Page