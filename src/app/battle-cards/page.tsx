'use client'
import CardGlobalChoiseList, { ICard } from "@/components/additionals/cards/CardGlobalChoiseList"
import PurpleButton from "@/components/additionals/PurpleButton"
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
            <div className="battle-cards__btns">
                <PurpleButton title={'Сохранить'} func={StoreBattleCards} additionStyle="tiny" />
            </div>
        </div>
    )
}

export default Page