import React from 'react'
import Image from 'next/image'
import { IPet } from '@/devs/store/PetsStore'
import { PetCover } from '@/components/icons/Cards'
import { BACK_ORIGIN } from '@/components/server/fetches/env.config'
import { IBaseFrameProps } from '../cards/PreviewSelectionCard'
import { attributesImages } from '../form/FormCardFields'

export interface IPreviewSelectionPetProps {
    setSelection: (pet: IPet | null) => void,
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
        <li className={`pet pet-${thisPet.rarity} ${!selectedPet ? 'deselected' : selectedPet?.id == thisPet?.id ? 'selected' : 'deselected'}`}>
            {children}
            <button className="pet__active-container" onClick={SetStateOfCard}>
                <div className="pet__preview-container">
                    <Image height={150} width={150} src={`${BACK_ORIGIN}/${thisPet.photo}`} quality={40} alt={thisPet.photo} className="card__preview"
                        objectFit="contain" />
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
                <PetCover />
                <div className="pet-frame__cover">
                    <div className="pet-frame__name">
                        <span className="pet-frame__text">
                            {name}
                        </span>
                    </div>
                    <div className="pet-frame__element">
                        <Image src={attributesImages[attribute as keyof typeof attributesImages]} height={24} width={24} alt='el' quality={80} />
                    </div>
                </div>
            </section>
        </div>
    )
}

export default PreviewSelectionPets
