'use client'
import CardGlobalChoiseList, { ICard } from "@/components/additionals/Windows/CardGlobalChoiseList"
import LightButton from "@/components/additionals/buttons/LightButton"
import { useCardsStore } from "@/devs/store/CardsStore"
import { useRef } from "react"

const Page = () => {
    const battleCardsRef = useRef<ICard[]>([])
    const SetCards = useCardsStore(state => state.SetCards)

    function StoreBattleCards() {
        if (battleCardsRef.current.length > 0) {
            SetCards('battleCards', battleCardsRef.current);
        }
    }

    return (
        <div className="battle-cards">
            <CardGlobalChoiseList cardsRef={battleCardsRef} cardsType='battleCards' choisenCardsNumber={6} />
            <div className="desc-panel reverse">
                <LightButton title='Сохранить' additionStyle="green" func={StoreBattleCards} />
            </div>
        </div>
    )
}

export default Page