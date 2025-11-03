'use client'
import { useCallback, useState } from "react"
import PreviewCard from "../../additionals/cards/PreviewCard"
import PurpleButton from "../../additionals/PurpleButton"
import FavoriteCardsSelectionPlace from "./FavoriteCardsSelectionPlace"
import { createPortal } from "react-dom"
import { useCardsStore } from "../../../devs/store/CardsStore"

type windowsMode = 'hide' | 'show' | 'to-hide'

const FavoriteCardsList = () => {
    const [listMode, setListMode] = useState<windowsMode>('hide')
    const [cardsSelection, setCardsSelection] = useState<windowsMode>('hide');
    const favoriteCards = useCardsStore(state => state.favoriteCards);

    function SetCardsListMode(method: (arg: windowsMode) => void, prop: windowsMode) {
        if (prop == 'show') {
            method('to-hide')
            setTimeout(() => {
                method('hide')
            }, 400)
        }
        else method('show')
    }

    const setFavoriteList = useCallback(() => SetCardsListMode(setListMode, listMode), [listMode])
    const setSelectionList = useCallback(() => SetCardsListMode(setCardsSelection, cardsSelection), [cardsSelection])
    return (
        <section className="profile__user-favorite-cards">
            <div className="profile__favorite-cards-btn__container">
                <PurpleButton title="Избранные карты" additionStyle="tiny" func={setFavoriteList} />
            </div>
            <div className="pofile__favorite-cards-list-container">
                {['to-hide', 'show'].includes(listMode) &&
                    <ul className={`cards-list ${listMode}`}>
                        <PreviewCard func={setSelectionList} src={favoriteCards[0]?.src} />
                        <PreviewCard func={setSelectionList} src={favoriteCards[1]?.src}/>
                        <PreviewCard func={setSelectionList} src={favoriteCards[2]?.src}/>
                    </ul>
                }
                {['to-hide', 'show'].includes(cardsSelection) && createPortal(<FavoriteCardsSelectionPlace additionStyle={cardsSelection} func={setSelectionList} />, document.body)}
            </div>
        </section>
    )
}

export default FavoriteCardsList