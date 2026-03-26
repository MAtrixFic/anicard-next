'use client'
import PreviewSelectionCard, { BaseFrame } from "@/components/additionals/cards/PreviewSelectionCard";
import { createPortal } from "react-dom";
import useSelectionCard from '@/devs/hooks/useSelection'
import { ICard } from "@/components/additionals/Windows/CardGlobalChoiseList";
import { useCards } from "@/devs/hooks/server/useCards";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { CardPanel } from "../../page";
import LightButton from "@/components/additionals/buttons/LightButton";
import AdminPanel from "@/components/routes/inventory/AdminPanel";

const Page = () => {
    const { getCards } = useCards()
    const [inventoryCards, setInventoryCards] = useState<ICard[]>([])
    const [selectedCard, setSelectedCard] = useSelectionCard<ICard>()
    useQuery({
        queryKey: ['adminCards'],
        queryFn: async () => {
            const data = await getCards('adminCards')
            setInventoryCards(data);
            return data
        }
    })

    const [adminMode, setAdminMode] = useState<'no' | 'edit' | 'create'>('no')

    const [cardsChoise, setCardsChoise] = useState<null | Element>()
    useEffect(() => {
        setCardsChoise(document.querySelector('.cards-choise'))
    }, [])
    return (
        <>
            {
                inventoryCards.map((v, i) =>
                    <PreviewSelectionCard
                        key={v?.id}
                        setSelection={setSelectedCard}
                        selectedCard={selectedCard}
                        thisCard={v}

                    >
                        <BaseFrame rarity={v.rarity} rating={v.rating.toString()} name="Рем" attribute="" />
                    </PreviewSelectionCard>)
            }
            {cardsChoise && createPortal(
                <div className="admin-logic">
                    <LightButton title={'Создать карту'} func={() => setAdminMode('create')} />
                </div>
                , cardsChoise)
            }
            {selectedCard &&
                createPortal(<CardPanel selectedElement={selectedCard}>
                    {/* <LightButton title={'Удалить карту'} /> */}
                </CardPanel>, document.body)}
            {['create', 'edit'].includes(adminMode) && <AdminPanel setAdminMode={setAdminMode} type={'cards'} />}
        </>
    )
}

export default Page
