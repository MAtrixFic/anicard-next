'use client'
import PreviewSelectionCard from "@/components/additionals/cards/PreviewSelectionCard"
import { useCardsStore } from "@/devs/store/CardsStore"
import useSelectionCard from "@/devs/hooks/useSelection"
import { CardDesctiption, ICard } from "@/components/additionals/Windows/CardGlobalChoiseList"
import LightButton from "@/components/additionals/buttons/LightButton"
import useOverWindowStatus from "@/devs/hooks/useOverWindowStatus"
import MarketOfferWindow from "@/components/additionals/Windows/MarketOfferWindow"
import { createPortal } from "react-dom"
import { useUserStore } from "@/devs/store/UserStore"
import Filter from "@/components/additionals/form/Filter"
import AdminPanel from "@/components/routes/inventory/AdminPanel"
import { useState } from "react"

const Page = () => {
    const cards = useCardsStore(state => state.allCards)
    const [selectedCard, setSelectedCard] = useSelectionCard<ICard>()
    const [marketWindowStatus, setMarketWindowStatus, setMarketWindowVisibility] = useOverWindowStatus(400);

    const [adminMode, setAdminMode] = useState<'no' | 'edit' | 'create'>('no')
    const [inventoryCards, setInventoryCards] = useState<ICard[]>(() => cards)

    function SetFilter(data: { search: string, rarity: string, attribute: string, category: string }) {
        console.log(data)
        setInventoryCards(cards.filter(v =>
            (data.search.length > 0 ? v.name.toLowerCase().includes(data.search.toLowerCase()) : true)
            &&
            (data.rarity.length > 0 ? v.rang.toLowerCase().includes(data.rarity.toLowerCase()) : true)
            &&
            (data.attribute.length > 0 ? v.options.attribute.toLowerCase().includes(data.attribute.toLowerCase()) : true)))
    }

    return (
        <div className="cards-choise">
            <div className="cards-choise__list-container">
                <section className="cards-choise__filter-container">
                    <Filter style="cards-choise__filter pd" submit={SetFilter} />
                </section>
                <section className="cards-choise__cards-list">
                    <ul className="cards-choise__list">
                        {inventoryCards.map((v, i) =>
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
            <div className="admin-logic">
                <LightButton title={'Создать карту'} func={() => setAdminMode('create')} additionStyle="green" />
            </div>
            {selectedCard && <div className="desc-panel">
                <div className="desc-panel__admin-logic">
                    <LightButton title='Редактировать' additionStyle="green" func={() => setAdminMode('edit')} />
                    <LightButton title='Удалить' additionStyle="purple" func={() => { }} />
                </div>
                <LightButton title='Выставить на обмен' additionStyle="green" func={setMarketWindowVisibility} />
                {['opened', 'to-hide'].includes(marketWindowStatus) && selectedCard &&
                    createPortal(<MarketOfferWindow card={selectedCard} func={setMarketWindowVisibility} additionStyle={marketWindowStatus} />, document.body)
                }
                <CardDesctiption
                    opts={selectedCard ? [{ key: 'Ранг', value: selectedCard.rang }] : []}
                    name={selectedCard?.name}
                />
            </div>}
            {['edit', 'create'].includes(adminMode) && <AdminPanel setAdminMode={setAdminMode} adminMode={adminMode} card={selectedCard as ICard} />}
        </div>
    )
}

export default Page