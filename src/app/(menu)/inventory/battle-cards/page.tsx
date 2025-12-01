'use client'
import CardGlobalChoiseList, { ICard } from "@/components/additionals/Windows/CardGlobalChoiseList"
import LightButton from "@/components/additionals/buttons/LightButton"
import { CookieGet } from "@/components/server/CookieManager"
import { DeleteInventoryCards, SetInventoryCards } from "@/components/server/comp/InventoryApi"
import { useRef } from "react"

const Page = () => {
    const battleCardsRef = useRef<(ICard | null)[]>([])

    async function StoreBattleCards() {
        if (battleCardsRef.current.length > 0) {
            const userId = await CookieGet('userId')
            if (userId) {
                console.log('battle send', battleCardsRef.current.filter(v => v !== null).map(v => v.id))
                const deleteRes = await DeleteInventoryCards(userId.value, 'battle')
                if (deleteRes) {
                    const setRes = await SetInventoryCards(userId.value, 'battle', battleCardsRef.current.filter(v => v !== null).map(v => v.id))
                    console.log(setRes)
                }
                else
                    console.log('dont update cards')
            }
        }
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