"use"
import { type ICard } from "../Windows/CardGlobalChoiseList"
import Image from "next/image"
import { BACK_ORIGIN } from "@/components/server/fetches/env.config"
import { attributesImages, cardAttributeWeaknesses } from "../form/FormCardFields"
import { CardCover } from "@/components/icons/Cards"
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

    console.log(thisCard)

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


export interface IBaseFrameProps {
    name: string,
    rating: string,
    attribute: string,
    rarity: string,
}
export const BaseFrame = ({ name, rating, rarity, attribute, university }: IBaseFrameProps & { university: string }) => {
    return (
        <div className="card-frame">
            <section className="card-frame__top">
                <div className="card-frame__rating">
                    <span className="card-frame__text card-frame__text-white card-frame__text-rating">
                        {rating}
                    </span>
                </div>
            </section>
            <section className="card-frame__frames" />
            <section className="card-frame__bottom">
                <div className="card-frame__cover">
                    <CardCover />
                </div>
                <div className="card-frame__group">
                    <div className="card-frame__rating-about-block">
                        <div className="card-frame__name">
                            <span className="card-frame__text card-frame__text-name">
                                {name}
                            </span>
                            <span className="card-frame__text card-frame__text-university">
                                {university}
                            </span>
                        </div>
                        {attribute && <div className="card-frame__element">
                            <Image src={attributesImages[attribute as keyof typeof attributesImages]} width={20} height={20} alt={attribute} />
                        </div>}
                    </div>
                    {attribute && <div className="card-frame__anti-elements-block">
                        <span className="card-frame__text card-frame__text-red">
                            Несовместимые стихии
                        </span>
                        <ul className="card-frame__anti-elements-list">
                            {cardAttributeWeaknesses[attribute].map((wa, i) =>
                                <Image key={wa + i} src={attributesImages[wa as keyof typeof attributesImages]} width={15} height={15} alt={attribute} />
                            )}
                        </ul>
                    </div>}
                </div>
            </section>
        </div>
    )
}

export default PreviewSelectionCard
