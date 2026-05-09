'use client'
import useSelectionCard from "@/devs/hooks/useSelection"
import { useState } from "react"
import PreviewSelectionPets, { PetFrame } from "@/components/additionals/pets/PreviewSelectionPets"
import { useQuery } from "@tanstack/react-query"
import CardsChoise from "@/components/additionals/cardsList/CardsChoise"
import { IPet } from "@/devs/store/PetsStore"
import usePets from "@/devs/hooks/server/usePets"
import { CardPanel, UpgradePanel } from "../cards/page"

const Page = () => {
    const { getPets } = usePets()
    const [selectedPet, setSelectedPet] = useSelectionCard<IPet>()

    const [inventoryPets, setInventoryPets] = useState<IPet[]>([])

    useQuery({
        queryKey: ['allPets'],
        queryFn: async () => {
            const data = await getPets('allPets')
            console.log(data);
            setInventoryPets(data);
            return data
        }
    })

    return (
        <CardsChoise
            panel={selectedPet && <CardPanel selectedElement={selectedPet} >
                <UpgradePanel type="pet" index={selectedPet.id} />
            </CardPanel>}
        >
            {
                inventoryPets.map((v) =>
                    <PreviewSelectionPets
                        key={v?.id}
                        setSelection={setSelectedPet}
                        selectedPet={selectedPet}
                        thisPet={v}
                    >
                        <PetFrame
                            name={v.character}
                            rating={v.current_rating?.toString() || '0'}
                            attribute={v.attribute}
                            rarity={v.rarity} />
                    </PreviewSelectionPets>)}
        </CardsChoise >
    )
}

export default Page