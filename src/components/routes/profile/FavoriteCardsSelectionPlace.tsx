'use client'

import { useRef } from 'react'
import { useCardsStore } from '../../../devs/store/CardsStore'
import OverBlackSpace, { type IOverBlackSpaceProps } from '../../additionals/OverBlackSpace'
import PurpleButton from '../../additionals/buttons/PurpleButton'
import CardGlobalChoiseList, { type ICard } from '../../additionals/cards/CardGlobalChoiseList'

interface IFavoriteCardsSelectionPlaceProps extends IOverBlackSpaceProps {
    func: () => void
}

const FavoriteCardsSelectionPlace = ({ func, additionStyle }: IFavoriteCardsSelectionPlaceProps) => {
    const favoriteCard = useRef<ICard[]>([]);
    const SetCards = useCardsStore(state => state.SetCards)


    function StoreFavoriteCards() {
        if (favoriteCard.current.length > 0) {
            SetCards('favoriteCards', favoriteCard.current);
            func();
        }
    }

    return (
        <OverBlackSpace additionStyle={additionStyle}>
            <CardGlobalChoiseList choisenCardsNumber={3} cardsRef={favoriteCard} cardsType='favoriteCards' />
            <div className="over-black-space__btns">
                <PurpleButton title="Сохранить" additionStyle="tiny" func={StoreFavoriteCards} />
                <PurpleButton title="Выйти" additionStyle="tiny" func={func} />
            </div>
        </OverBlackSpace>
    )
}

export default FavoriteCardsSelectionPlace
