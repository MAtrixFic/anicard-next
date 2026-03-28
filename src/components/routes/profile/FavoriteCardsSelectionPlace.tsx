'use client'

import { useRef } from 'react'
import OverBlackSpace, { type IOverBlackSpaceProps } from '../../additionals/OverBlackSpace'
import PurpleButton from '../../additionals/buttons/PurpleButton'
import CardGlobalChoiseList, { type ICard } from '../../additionals/Windows/CardGlobalChoiseList'
import { IUser } from '@/devs/store/UserStore'
import { useCards } from '@/devs/hooks/server/useCards'

export interface IForeignWindowProps extends IFavoriteCardsSelectionPlaceProps {
}

interface IFavoriteCardsSelectionPlaceProps extends IOverBlackSpaceProps {
    func: () => void,
    user?: IUser
}

const FavoriteCardsSelectionPlace = ({ func, additionStyle, user }: IFavoriteCardsSelectionPlaceProps) => {
    const favoriteCard = useRef<(ICard | null)[]>([]);
    const { SetInvCards, getCards } = useCards()

    async function StoreFavoriteCards() {
        const cards = favoriteCard.current.filter(v => v !== null)
        SetInvCards('favorite', cards.length > 0 ? cards.map(v => v!.id) : [])
        func()
    }



    return (
        <OverBlackSpace additionStyle={additionStyle}>
            <CardGlobalChoiseList
                choisenMaterialNumber={3}
                materialRef={favoriteCard}
                materialType='favorite-cards'
                loadAllMaterials={async () => getCards('allCards')}
                loadSelectedMaterials={async () => getCards('favorite')}
            />
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
