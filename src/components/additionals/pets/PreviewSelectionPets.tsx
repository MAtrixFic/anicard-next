import React from 'react'
import Image from 'next/image'
import { IPet } from '@/devs/store/PetsStore'
import { BACK_ORIGIN } from '@/components/server/fetches/env.config'
import { IBaseFrameProps } from '../cards/PreviewSelectionCard'


export interface IPreviewSelectionPetProps {
    setSelection: (card: IPet | null) => void,
    selectedPet: IPet | null,
    thisPet: IPet,
    children?: React.ReactNode
}
const PreviewSelectionPets = ({ setSelection, selectedPet, thisPet, children }: IPreviewSelectionPetProps) => {
    function SetStateOfCard() {
        setSelection(thisPet.id === selectedPet?.id ? null : thisPet)
    }

    if (!thisPet.photo) return

    return (
        <li className={`pet pet-${thisPet.rarity}`}>
            {children}
            <button className="pet__active-container" onClick={SetStateOfCard}>
                <div className="pet__preview-container">
                    <Image height={150} width={150} src={`${BACK_ORIGIN}/${thisPet.photo}`} quality={80} alt={thisPet.photo} className="card__preview"
                        objectFit="cover" />
                </div>
            </button>
        </li>
    )
}


export const PetFrame = ({ name, rarity, rating, attribute }: IBaseFrameProps) => {
    return (
        <div className={`pet-frame pet-frame__${rarity}`}>
            <section className="pet-frame__top">
                <div className="pet-frame__rating">
                    <span className="pet-frame__text pet-frame__text-white">
                        {rating}
                    </span>
                </div>
            </section>
            <section className="pet-frame__bottom">
                <div className="pet-frame__name">
                    <span className="pet-frame__text">
                        {name}
                    </span>
                </div>
                <div className="pet-frame__element">
                    <Image src={attribute} height={24} width={24} alt='el' quality={80}/>
                </div>
            </section>
        </div>
    )
}

export default PreviewSelectionPets
