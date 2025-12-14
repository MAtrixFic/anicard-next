import { useRef } from "react"
import CardGlobalChoiseList, { type ICard } from "../../additionals/Windows/CardGlobalChoiseList"
import PurpleButton from "../../additionals/buttons/PurpleButton"
import { useCardsStore } from "../../../devs/store/CardsStore"

const BattleCards = () => {
    const battleCardsRef = useRef<ICard[]>([])

    const SetCards = useCardsStore(state => state.SetCards)

    function StoreBattleCards() {
        if (battleCardsRef.current.length > 0) {
            SetCards('battle', battleCardsRef.current);
        }
    }

    return (
        <div className="battle-cards">
            <CardGlobalChoiseList cardsRef={battleCardsRef} cardsType='battle' choisenCardsNumber={6} />
            <div className="battle-cards__btns">
                <PurpleButton title={'Сохранить'} func={StoreBattleCards} additionStyle="tiny" />
            </div>
        </div>
    )
}

export default BattleCards