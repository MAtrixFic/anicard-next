'use client'
import { createPortal } from "react-dom";
import useSelectionCard from '@/devs/hooks/useSelection'
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { CardPanel } from "../../cards/page";
import LightButton from "@/components/additionals/buttons/LightButton";
import AdminPanel from "@/components/routes/inventory/AdminPanel";
import usePets from "@/devs/hooks/server/usePets";
import { IPet } from "@/devs/store/PetsStore";
import PreviewSelectionPets from "@/components/additionals/pets/PreviewSelectionPets";
import { PetFrame } from "@/components/additionals/pets/PreviewSelectionPets";
import { useAdmin } from "@/devs/hooks/server/useAdmin";

const Page = () => {
    const { getPets } = usePets()
    const [inventoryPets, setInventoryPets] = useState<IPet[]>([])
    const [selectedPet, setSelectedPet] = useSelectionCard<IPet>()
    const { RemoveAdminPet } = useAdmin()
    useQuery({
        queryKey: ['adminPets'],
        queryFn: async () => {
            const data = await getPets('adminPets')
            console.log(data);
            setInventoryPets(data);
            return data
        }
    })

    const [adminMode, setAdminMode] = useState<'no' | 'edit' | 'create'>('no')

    const cardsChoise = useRef<Element>(null)
    useEffect(() => {
        cardsChoise.current = document.querySelector('.cards-choise')
    }, [])
    return (
        <>
            {
                inventoryPets.map((v, i) =>
                    <PreviewSelectionPets
                        key={v?.id}
                        setSelection={setSelectedPet}
                        selectedPet={selectedPet}
                        thisPet={v}
                    >
                        <PetFrame attribute={v.attribute} rarity={v.rarity} rating={v.rating.toString()} name={v.character} />
                    </PreviewSelectionPets>)
            }
            {cardsChoise.current && createPortal(
                <div className="admin-logic">
                    <LightButton title={'Создать питомца'} func={() => setAdminMode('create')} />
                </div>
                , cardsChoise.current)
            }
            {selectedPet &&
                createPortal(<CardPanel selectedElement={selectedPet}>
                    <LightButton title={'Удалить карту'} func={() => RemoveAdminPet(selectedPet.id.toString())} />
                </CardPanel>, document.body)}
            {['create', 'edit'].includes(adminMode) && <AdminPanel setAdminMode={setAdminMode} type={'pets'} />}
        </>
    )
}

export default Page
