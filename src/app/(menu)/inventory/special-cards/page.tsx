'use client'
import CardGlobalChoiseList, { ICard } from "@/components/additionals/Windows/CardGlobalChoiseList"
import LightButton from "@/components/additionals/buttons/LightButton"
import { useCards } from "@/devs/hooks/server/useCards"
import { useRef } from "react"

const Page = () => {
    const specialCardsRef = useRef<(ICard | null)[]>([])
    const { SetInvCards } = useCards()

    async function StoreSpecialCards() {
        const cards = specialCardsRef.current.filter(v => v !== null)
        SetInvCards('special', cards.length > 0 ? cards.map(v => v!.id) : [])
    }


    return (
        <div className="battle-cards">
            <CardGlobalChoiseList cardsRef={specialCardsRef} cardsType='special' choisenCardsNumber={1} />
            <div className="desc-panel reverse">
                <LightButton title='Сохранить' additionStyle="green" func={StoreSpecialCards} />
            </div>
        </div>
    )
}

export default Page