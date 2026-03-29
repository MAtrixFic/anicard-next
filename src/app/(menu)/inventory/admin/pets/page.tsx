'use client'
import { createPortal } from "react-dom";
import useSelectionCard from '@/devs/hooks/useSelection'
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { CardPanel } from "../../page";
import LightButton from "@/components/additionals/buttons/LightButton";
import AdminPanel from "@/components/routes/inventory/AdminPanel";
import usePets from "@/devs/hooks/server/usePets";
import { IPet } from "@/devs/store/PetsStore";
import PreviewSelectionPets from "@/components/additionals/pets/PreviewSelectionPets";
import { PetFrame } from "@/components/additionals/pets/PreviewSelectionPets";

const Page = () => {
    const { getPets } = usePets()
    const [inventoryPets, setInventoryPets] = useState<IPet[]>([])
    const [selectedPet, setSelectedPet] = useSelectionCard<IPet>()
    useQuery({
        queryKey: ['allPets'],
        queryFn: async () => {
            const data = await getPets('adminPets')
            console.log(data);
            setInventoryPets(data);
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
            {cardsChoise && createPortal(
                <div className="admin-logic">
                    <LightButton title={'Создать питомца'} func={() => setAdminMode('create')} />
                </div>
                , cardsChoise)
            }
            {selectedPet &&
                createPortal(<CardPanel selectedElement={selectedPet}>
                    {/* <LightButton title={'Удалить карту'} /> */}
                </CardPanel>, document.body)}
            {['create', 'edit'].includes(adminMode) && <AdminPanel setAdminMode={setAdminMode} type={'pets'} />}
        </>
    )
}

export default Page
