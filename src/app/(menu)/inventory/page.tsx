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
import { use, useEffect, useState } from "react"
import { useUser } from "@/devs/hooks/server/useUser"
import { useCards } from "@/devs/hooks/server/useCards"
import { useAdmin } from "@/devs/hooks/server/useAdmin"
import { useQuery } from "@tanstack/react-query"
import { BaseFrame } from "@/components/additionals/cards/PreviewSelectionCard"
import usePets from "@/devs/hooks/server/usePets"

type TCardsMode = 'adminCards' | 'allCards'

const Page = () => {
    const { data: user } = useUser()
    const { getCards } = useCards()
    const { getPets } = usePets()
    const [selectedCard, setSelectedCard] = useSelectionCard<ICard>()
    const [cardsMode, setCardsMode] = useState<TCardsMode>('allCards')

    const [inventoryCards, setInventoryCards] = useState<ICard[]>([])
    const [previewCards, setPreviewCards] = useState<ICard[]>([])

    useQuery({
        queryKey: [cardsMode],
        queryFn: async () => {
            const data = await getCards(cardsMode)
            setInventoryCards(data);
            setPreviewCards(data);
            return data
        }
    })

    useEffect(() => {
        getPets('allPets').then(data => console.log('pets:', data));
    }, [])


    console.log(inventoryCards)

    // async function DoMethod(data: ICard) {
    //     const filteredResult = Object.fromEntries(
    //         Object.entries(data).filter(([_, value]) =>
    //             value ? value.toString().length > 0 && value.toString() !== '0' : false
    //         )
    //     );
    //     setInventoryCards(previewCards.filter(v => Object.keys(filteredResult).every(vk => v[vk as keyof ICard] == filteredResult[vk])
    //     ))
    // }


    return (
        <div className="cards-choise">
            <div className="cards-choise__list-container">
                <section className="cards-choise__filter-container">
                    {/* <Filter style="cards-choise__filter pd" submit={DoMethod} /> */}
                </section>
                <section className="cards-choise__cards-list">
                    <ul className="cards-choise__list">
                        {inventoryCards.map((v, i) =>
                            <PreviewSelectionCard
                                key={v?.id}
                                setSelection={setSelectedCard}
                                selectedCard={selectedCard}
                                thisCard={v}

                            >
                                <BaseFrame rarity={v.rarity} rating={v.rating.toString()} name="Рем" attribute="" />
                            </PreviewSelectionCard>
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
                    {['adminCards'].includes(cardsMode) && <LightButton title={'Создать карту'} func={() => setAdminMode('create')} additionStyle="dark" />}
                    <LightButton title={cardsMode} func={() => setCardsMode(cardsMode === 'adminCards' ? 'allCards' : 'adminCards')} />
                </div>}
            {
                selectedCard && <div className="desc-panel">
                    {isAdmin && ['adminCards'].includes(cardsMode) && <div className="desc-panel__admin-logic">
                        <LightButton title='Удалить' additionStyle="purple" func={() => RemoveAdminCard(selectedCard.id.toString())} />
                    </div>}
                    {['allCards'].includes(cardsMode) && <LightButton title='Выставить на обмен' additionStyle="green" func={setMarketWindowVisibility} />}
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