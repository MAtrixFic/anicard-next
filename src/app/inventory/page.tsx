'use client'
import Input from "@/components/additionals/Input"
import SearchFilter from "@/components/routes/profile/SearchFilter"
import PreviewSelectionCard from "@/components/additionals/cards/PreviewSelectionCard"
import { useCardsStore } from "@/devs/store/CardsStore"
import useSelectionCard from "@/devs/hooks/useSelectionCard"
import { CardDesctiption } from "@/components/additionals/Windows/CardGlobalChoiseList"
import LightButton from "@/components/additionals/buttons/LightButton"
import useOverWindowStatus from "@/devs/hooks/useOverWindowStatus"
import MarketOfferWindow from "@/components/additionals/Windows/MarketOfferWindow"
import { createPortal } from "react-dom"


const Page = () => {
    const cards = useCardsStore(state => state.allCards)
    const [selectedCard, setSelectedCard] = useSelectionCard()
    const [marketWindowStatus, setMarketWindowStatus, setMarketWindowVisibility] = useOverWindowStatus(400);

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
                <LightButton title='Продать' additionStyle="green" func={setMarketWindowVisibility} />
            </div>}
            {['opened', 'to-hide'].includes(marketWindowStatus) && selectedCard &&
                createPortal(<MarketOfferWindow card={selectedCard} func={setMarketWindowVisibility} additionStyle={marketWindowStatus} />, document.body)
            }
        </div>
    )
}
export default Page