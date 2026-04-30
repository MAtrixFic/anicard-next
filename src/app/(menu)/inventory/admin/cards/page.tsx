'use client'
import PreviewSelectionCard, { BaseFrame } from "@/components/additionals/cards/PreviewSelectionCard";
import { createPortal } from "react-dom";
import useSelectionCard from '@/devs/hooks/useSelection'
import { ICard } from "@/components/additionals/Windows/CardGlobalChoiseList";
import { useCards } from "@/devs/hooks/server/useCards";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { CardPanel } from "../../cards/page";
import LightButton from "@/components/additionals/buttons/LightButton";
import AdminPanel from "@/components/routes/inventory/AdminPanel";
import { useAdmin } from "@/devs/hooks/server/useAdmin";

const Page = () => {
    const { getCards } = useCards()
    const [inventoryCards, setInventoryCards] = useState<ICard[]>([])
    const [selectedCard, setSelectedCard] = useSelectionCard<ICard>()
    const { RemoveAdminCard } = useAdmin()
    useQuery({
        queryKey: ['adminCards'],
        queryFn: async () => {
            const data = await getCards('adminCards')
            setInventoryCards(data);
            return data
        }
    })
    const cardsChoise = useRef<Element>(null)
    useEffect(() => {
        cardsChoise.current = document.querySelector('.cards-choise')
    }, [])
    const [adminMode, setAdminMode] = useState<'no' | 'edit' | 'create'>('no')
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
                        <BaseFrame
                            rarity={v.rarity}
                            rating={v.rating.toString()}
                            name={v.character || ''}
                            attribute={v.attribute}
                            university={v.universe}
                        />
                    </PreviewSelectionCard>)
            }
            {cardsChoise.current && createPortal(
                <div className="admin-logic">
                    <LightButton title={'Создать карту'} func={() => setAdminMode('create')} />
                </div>
                , cardsChoise.current)
            }
            {selectedCard &&
                createPortal(
                    <CardPanel selectedElement={selectedCard}>
                        <LightButton title={'Удалить карту'} func={() => RemoveAdminCard(selectedCard.id.toString())} />
                    </CardPanel>
                    , document.body)
            }
            {['create', 'edit'].includes(adminMode) && <AdminPanel setAdminMode={setAdminMode} type={'cards'} />}
        </>
    )
}

export default Page
