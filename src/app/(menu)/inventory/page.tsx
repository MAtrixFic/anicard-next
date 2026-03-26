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
import { useQuery } from "@tanstack/react-query"
import { BaseFrame } from "@/components/additionals/cards/PreviewSelectionCard"
import CardsChoise from "@/components/additionals/cardsList/CardsChoise"
import { IPet } from "@/devs/store/PetsStore"

type TCardsMode = 'adminCards' | 'allCards'

const Page = () => {
    const { getCards } = useCards()
    const [selectedCard, setSelectedCard] = useSelectionCard<ICard>()

    const [inventoryCards, setInventoryCards] = useState<ICard[]>([])
    // const [previewCards, setPreviewCards] = useState<ICard[]>([])

    useQuery({
        queryKey: ['allCards'],
        queryFn: async () => {
            const data = await getCards('allCards')
            setInventoryCards(data);
            return data
        }
    })

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
        <CardsChoise panel={selectedCard && <CardPanel selectedElement={selectedCard} />}>
            {
                inventoryCards.map((v, i) =>
                    <PreviewSelectionCard
                        key={v?.id}
                        setSelection={setSelectedCard}
                        selectedCard={selectedCard}
                        thisCard={v}

                    >
                        <BaseFrame rarity={v.rarity} rating={v.rating.toString()} name="Рем" attribute="" />
                    </PreviewSelectionCard>)}
        </CardsChoise >
    )
}

interface ICardPanelProps {
    selectedElement: ICard | IPet,
    children?: React.ReactNode
    // setCardsMode: (mode: TCardsMode) => void,
    // cardsMode: TCardsMode
}

export const CardPanel = ({ selectedElement, children }: ICardPanelProps) => {
    return (
        < div className="cards-options">
            {/* {['adminCards'].includes(cardsMode) && <LightButton title={'Создать карту'} func={() => setAdminMode('create')} additionStyle="dark" />}
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
                    } */}
            <div className="cards-options__manage">
                {children}
            </div>
            <div className="desc-panel">
                <CardDesctiption
                    {...selectedElement}
                />
            </div>
        </div>
        //     }
        //     {['edit', 'create'].includes(adminMode) && <AdminPanel setAdminMode={setAdminMode} card={selectedCard as ICard} />}
        // </>
    )
}

export default Page