'use client'
import { useCallback, useState } from "react"
import PreviewCard from "../../additionals/cards/PreviewCard"
import PurpleButton from "../../additionals/buttons/PurpleButton"
import FavoriteCardsSelectionPlace from "./FavoriteCardsSelectionPlace"
import { createPortal } from "react-dom"
import { useCardsStore } from "../../../devs/store/CardsStore"
import useOverWindowStatus from "@/devs/hooks/useOverWindowStatus"

const FavoriteCardsList = () => {
    const [listMode, setListMode, setListWindowMode] = useOverWindowStatus(400);
    const [cardsSelection, setCardsSelection, setCardsWindowMode] = useOverWindowStatus(400);
    const favoriteCards = useCardsStore(state => state.favoriteCards);
    return (
        <section className="profile__user-favorite-cards">
            <div className="profile__favorite-cards-btn__container">
                <PurpleButton title="Избранные карты" additionStyle="tiny" func={setListWindowMode} />
            </div>
            <div className="pofile__favorite-cards-list-container">
                {['to-hide', 'opened'].includes(listMode) &&
                    <ul className={`cards-list ${listMode}`}>
                        <PreviewCard func={setCardsWindowMode} thisCard={favoriteCards[0]} />
                        <PreviewCard func={setCardsWindowMode} thisCard={favoriteCards[1]} />
                        <PreviewCard func={setCardsWindowMode} thisCard={favoriteCards[2]} />
                    </ul>
                }
                {['to-hide', 'opened'].includes(cardsSelection) && createPortal(<FavoriteCardsSelectionPlace additionStyle={cardsSelection} func={setCardsWindowMode} />, document.body)}
            </div>
        </section>
    )
}

export default FavoriteCardsList