'use client'

import { useRef } from 'react'
import { useCardsStore } from '../../../devs/store/CardsStore'
import OverBlackSpace, { type IOverBlackSpaceProps } from '../../additionals/OverBlackSpace'
import PurpleButton from '../../additionals/buttons/PurpleButton'
import CardGlobalChoiseList, { type ICard } from '../../additionals/Windows/CardGlobalChoiseList'
import { IUser } from '@/devs/store/UserStore'
import { DeleteInventoryCards, SetInventoryCards } from '@/components/server/comp/InventoryApi'

export interface IForeignWindowProps extends IFavoriteCardsSelectionPlaceProps {
}

interface IFavoriteCardsSelectionPlaceProps extends IOverBlackSpaceProps {
    func: () => void,
    user?: IUser
}

const FavoriteCardsSelectionPlace = ({ func, additionStyle, user }: IFavoriteCardsSelectionPlaceProps) => {
    const favoriteCard = useRef<(ICard | null)[]>([]);

    async function StoreFavoriteCards() {
        if (favoriteCard.current.length > 0) {
            console.log('length')
            const userId = user?.id
            console.log(user?.id)
            if (userId) {
                console.log('favorite send', favoriteCard.current.filter(v => v !== null).map(v => v.id))
                const deleteRes = await DeleteInventoryCards(userId.toString(), 'favorite')
                if (deleteRes) {
                    const setRes = await SetInventoryCards(userId.toString(), 'favorite', favoriteCard.current.filter(v => v !== null).map(v => v.id))
                    console.log(setRes)
                }
                else
                    console.log('dont update cards')
            }
        }
        func()
    }



    return (
        <OverBlackSpace additionStyle={additionStyle}>
            <CardGlobalChoiseList choisenCardsNumber={3} cardsRef={favoriteCard} cardsType='favorite' />
            <div className="desc-panel pg">
                <div className="desc-panel__container">
                    <PurpleButton title="Сохранить" additionStyle="tiny" func={StoreFavoriteCards} />
                    <PurpleButton title="Выйти" additionStyle="tiny" func={func} />
                </div>
            </div>
        </OverBlackSpace>
    )
}

export default FavoriteCardsSelectionPlace
