'use client'
import CardGlobalChoiseList, { ICard } from "@/components/additionals/Windows/CardGlobalChoiseList"
import LightButton from "@/components/additionals/buttons/LightButton"
import { useRef } from "react"

const Page = () => {
    const petsRef = useRef<(ICard | null)[]>([])

    async function StorePets() {
        console.log("Котя сохранен")
    }


    return (
        <div className="battle-cards">
            <CardGlobalChoiseList cardsRef={petsRef} cardsType='special' choisenCardsNumber={1} />
            <div className="desc-panel reverse">
                <LightButton title='Сохранить' additionStyle="green" func={StorePets} />
            </div>
        </div>
    )
}

export default Page