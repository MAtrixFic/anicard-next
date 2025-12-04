'use client'
import { useCallback, useEffect, useState } from "react"
import PreviewCard from "../../additionals/cards/PreviewCard"
import PurpleButton from "../../additionals/buttons/PurpleButton"
import FavoriteCardsSelectionPlace from "./FavoriteCardsSelectionPlace"
import { createPortal } from "react-dom"
import { useCardsStore } from "../../../devs/store/CardsStore"
import useOverWindowStatus from "@/devs/hooks/useOverWindowStatus"
import { IUser } from "@/devs/store/UserStore"
import { useCards } from "@/devs/hooks/server/useCards"
import { ICard } from "@/components/additionals/Windows/CardGlobalChoiseList"
import { useQuery } from "@tanstack/react-query"

const FavoriteCardsList = ({ user }: { user?: IUser }) => {
    const [listMode, setListMode, setListWindowMode] = useOverWindowStatus(400);
    const [cardsSelection, setCardsSelection, setCardsWindowMode] = useOverWindowStatus(400);
    const { getCards } = useCards();



    const { data } = useQuery({
        queryKey: ['favorite'],
        queryFn: async () => getCards('favorite').then(data => {
            return data
        })
    })

    return (
        <section className="profile__user-favorite-cards">
            <div className="profile__favorite-cards-btn__container">
                <PurpleButton title="Избранные карты" additionStyle="tiny" func={setListWindowMode} />
            </div>
            <div className="pofile__favorite-cards-list-container">
                {['to-hide', 'opened'].includes(listMode) && data &&
                    < ul className={`cards-list ${listMode}`}>
                        <PreviewCard func={setCardsWindowMode} thisCard={data[0]} />
                        <PreviewCard func={setCardsWindowMode} thisCard={data[1]} />
                        <PreviewCard func={setCardsWindowMode} thisCard={data[2]} />
                    </ul>
                }
                {['to-hide', 'opened'].includes(cardsSelection) && createPortal(<FavoriteCardsSelectionPlace user={user} additionStyle={cardsSelection} func={setCardsWindowMode} />, document.body)}
            </div>
        </section >
    )
}

export default FavoriteCardsList