"use"
import { type ICard } from "../Windows/CardGlobalChoiseList"
import Image from "next/image"
import { BACK_ORIGIN } from "@/components/server/fetches/env.config"
import React from "react"

export interface IPreviewSelectionCardProps {
    setSelection: (card: ICard | null) => void,
    selectedCard: ICard | null,
    thisCard: ICard,
    children?: React.ReactNode
}

const PreviewSelectionCard = ({ setSelection, selectedCard, thisCard, children }: IPreviewSelectionCardProps) => {

    function SetStateOfCard() {
        setSelection(thisCard.id === selectedCard?.id ? null : thisCard)
    }

    if (!thisCard.photo) return

    return (
        <li className={`card card-${thisCard.rarity.toLocaleLowerCase()} ${!selectedCard ? 'deselected' : selectedCard.id == thisCard?.id ? 'selected' : 'deselected'}`}
        >
            {children}
            <button className="card__active-container" onClick={SetStateOfCard}>
                <div className="card__preview-container">
                    <Image height={192} width={192} src={`${BACK_ORIGIN}/${thisCard.photo}`} quality={80} alt={thisCard.photo} className="card__preview"
                        objectFit="cover" />
                </div>
            </button>
        </li>
    )
}


interface IBaseFrameProps {
    name: string,
    rating: string,
    attribute: string,
    rarity: string
}
export const BaseFrame = ({ name, rating, rarity, attribute }: IBaseFrameProps) => {
    return (
        <div className="card-frame">
            <section className="card-frame__top">
                <div className="card-frame__rarity-block">
                    <p className="card-frame__text card-frame__text-rarity">{rarity}</p>
                </div>
            </section>
            <section className="card-frame__bottom">
                <div className="card-frame__group">
                    <div className="card-frame__rating-block">
                        <p className="card-frame__text card-frame__text-rating">{rating}</p>
                    </div>
                    <div className="card-frame__attribute-block">
                        {/* <Image className="card-frame__img" src={attribute} height={30} width={30} alt="attribute" /> */}
                    </div>
                </div>
                <div className="card-frame__name-block">
                    {/* <p className="card-frame__text card-frame__text-name">-{name}-</p> */}
                </div>
            </section>
        </div>
    )
}

export default PreviewSelectionCard
