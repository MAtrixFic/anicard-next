'use client'
import CardGlobalChoiseList, { ICard } from "@/components/additionals/Windows/CardGlobalChoiseList"
import LightButton from "@/components/additionals/buttons/LightButton"
import usePets from "@/devs/hooks/server/usePets"
import { useRef } from "react"

const Page = () => {
    const petsRef = useRef<(ICard | null)[]>([])
    const { getPets, SetInvPets } = usePets()

    async function StorePets() {
        const pets = petsRef.current.filter(v => v !== null)
        SetInvPets('battle', pets.length > 0 ? pets.map(v => v!.id) : [])
    }


    return (
        <div className="pets">
            <CardGlobalChoiseList
                materialRef={petsRef}
                materialType='battle-pet'
                loadAllMaterials={async () => getPets('allPets')}
                loadSelectedMaterials={async () => getPets('battle')}
                choisenMaterialNumber={1}
            />

            <div className="admin-logic">
                <div className="desc-panel reverse">
                    <LightButton title='Сохранить' func={StorePets} />
                </div>
            </div>
        </div>
    )
}

export default Page