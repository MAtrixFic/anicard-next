'use client'
import CardGlobalChoiseList, { ICard } from "@/components/additionals/Windows/CardGlobalChoiseList"
import LightButton from "@/components/additionals/buttons/LightButton"
import { CookieGet } from "@/components/server/CookieManager"
import { DeleteInventoryCards, SetInventoryCards } from "@/components/server/comp/InventoryApi"
import { useCards } from "@/devs/hooks/server/useCards"
import { useRef } from "react"

const Page = () => {
    const battleCardsRef = useRef<(ICard | null)[]>([])
    const { SetInvCards } = useCards()

    async function StoreBattleCards() {
        const cards = battleCardsRef.current.filter(v => v !== null)
        SetInvCards('battle', cards.length > 0 ? cards.map(v => v!.id) : [])
    }


    return (
        <div className="battle-cards">
            <CardGlobalChoiseList cardsRef={battleCardsRef} cardsType='battle' choisenCardsNumber={6} />
            <div className="desc-panel reverse">
                <LightButton title='Сохранить' additionStyle="green" func={StoreBattleCards} />
            </div>
        </div>
    )
}

export default Page