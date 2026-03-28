'use client'
import PreviewSelectionCard from "@/components/additionals/cards/PreviewSelectionCard"
import useSelectionCard from "@/devs/hooks/useSelection"
import { CardDesctiption, ICard } from "@/components/additionals/Windows/CardGlobalChoiseList"
import {  useState } from "react"
import { useCards } from "@/devs/hooks/server/useCards"
import { useQuery } from "@tanstack/react-query"
import { BaseFrame } from "@/components/additionals/cards/PreviewSelectionCard"
import CardsChoise from "@/components/additionals/cardsList/CardsChoise"
import { IPet } from "@/devs/store/PetsStore"

const Page = () => {
    const { getCards } = useCards()
    const [selectedCard, setSelectedCard] = useSelectionCard<ICard>()

    const [inventoryCards, setInventoryCards] = useState<ICard[]>([])

    useQuery({
        queryKey: ['allCards'],
        queryFn: async () => {
            const data = await getCards('allCards')
            setInventoryCards(data);
            return data
        }
    })

    return (
        <CardsChoise panel={selectedCard && <CardPanel selectedElement={selectedCard} />}>
            {
                inventoryCards.map((v) =>
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
}

export const CardPanel = ({ selectedElement, children }: ICardPanelProps) => {
    return (
        < div className="cards-options">
            <div className="cards-options__manage">
                {children}
            </div>
            <div className="desc-panel">
                <CardDesctiption
                    {...selectedElement}
                />
            </div>
        </div>
    )
}

export default Page