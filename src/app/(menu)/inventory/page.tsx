'use client'
import PreviewSelectionCard from "@/components/additionals/cards/PreviewSelectionCard"
import useSelectionCard from "@/devs/hooks/useSelection"
import { CardDesctiption, ICard } from "@/components/additionals/Windows/CardGlobalChoiseList"
import LightButton from "@/components/additionals/buttons/LightButton"
import useOverWindowStatus from "@/devs/hooks/useOverWindowStatus"
import MarketOfferWindow from "@/components/additionals/Windows/MarketOfferWindow"
import { createPortal } from "react-dom"
import Filter from "@/components/additionals/form/Filter"
import AdminPanel from "@/components/routes/inventory/AdminPanel"
import { useEffect, useState } from "react"
import { useUser } from "@/devs/hooks/server/useUser"
import { useCards } from "@/devs/hooks/server/useCards"
import { useAdmin } from "@/devs/hooks/server/useAdmin"

type TCardsMode = 'adminCards' | 'allCards'

const Page = () => {
    const { user } = useUser()
    const { getCards } = useCards()
    const [selectedCard, setSelectedCard] = useSelectionCard<ICard>()
    const [cardsMode, setCardsMode] = useState<TCardsMode>('allCards')

    const [inventoryCards, setInventoryCards] = useState<ICard[]>([])
    const [previewCards, setPreviewCards] = useState<ICard[]>([])

    useEffect(() => {
        if (user)
            getCards(cardsMode).then(data => {
                setInventoryCards(data);
                setPreviewCards(data);
            })
    }, [user?.id || 0, cardsMode])


    // function SetFilter(data: { search: string, rarity: string, attribute: string, category: string }) {
    //     console.log(data)
    //     setInventoryCards(previewCards.filter(v =>
    //         (data.search.length > 0 ? v.character.toLowerCase().includes(data.search.toLowerCase()) : true)
    //         &&
    //         (data.rarity.length > 0 ? v.rarity.toLowerCase().includes(data.rarity.toLowerCase()) : true)
    //         &&
    //         (data.attribute.length > 0 ? v.attribute.toLowerCase().includes(data.attribute.toLowerCase()) : true)))
    // }

    return (
        <div className="cards-choise">
            <div className="cards-choise__list-container">
                <section className="cards-choise__filter-container">
                    <Filter style="cards-choise__filter pd" submit={() => ''} />
                </section>
                <section className="cards-choise__cards-list">
                    <ul className="cards-choise__list">
                        {inventoryCards.map((v, i) =>
                            <PreviewSelectionCard
                                key={v?.id}
                                setSelection={setSelectedCard}
                                selectedCard={selectedCard}
                                thisCard={v}
                            />
                        )}
                    </ul>
                </section>
            </div>
            <CardPanel isAdmin={user?.isAdmin} setCardsMode={setCardsMode} cardsMode={cardsMode} selectedCard={selectedCard} />
        </div >
    )
}

interface ICardPanelProps {
    isAdmin?: boolean,
    selectedCard: ICard | null,
    setCardsMode: (mode: TCardsMode) => void,
    cardsMode: TCardsMode
}

export const CardPanel = ({ isAdmin, selectedCard, setCardsMode, cardsMode }: ICardPanelProps) => {
    const [adminMode, setAdminMode] = useState<'no' | 'edit' | 'create'>('no')
    const [marketWindowStatus, _, setMarketWindowVisibility] = useOverWindowStatus(400);
    const { RemoveAdminCard } = useAdmin()
    return (
        <>
            {isAdmin &&
                < div className="admin-logic">
                    <LightButton title={'Создать карту'} func={() => setAdminMode('create')} additionStyle="green" />
                    <LightButton title={cardsMode} additionStyle="green" func={() => setCardsMode(cardsMode === 'adminCards' ? 'allCards' : 'adminCards')} />
                </div>}
            {
                selectedCard && <div className="desc-panel">
                    {isAdmin && <div className="desc-panel__admin-logic">
                        <LightButton title='Удалить' additionStyle="purple" func={() => RemoveAdminCard(selectedCard.id.toString())} />
                    </div>}
                    <LightButton title='Выставить на обмен' additionStyle="green" func={setMarketWindowVisibility} />
                    {['opened', 'to-hide'].includes(marketWindowStatus) && selectedCard &&
                        createPortal(<MarketOfferWindow card={selectedCard} func={setMarketWindowVisibility} additionStyle={marketWindowStatus} />, document.body)
                    }
                    <CardDesctiption
                        {...selectedCard}
                    />
                </div>
            }
            {['edit', 'create'].includes(adminMode) && <AdminPanel setAdminMode={setAdminMode} card={selectedCard as ICard} />}
        </>
    )
}

export default Page