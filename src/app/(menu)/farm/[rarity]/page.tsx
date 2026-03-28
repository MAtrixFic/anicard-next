'use client'
import '@/styles/farm.scss'
import LightButton from '@/components/additionals/buttons/LightButton'
import Image from 'next/image'
import useOverWindowStatus from '@/devs/hooks/useOverWindowStatus'
import OverBlackSpace from '@/components/additionals/OverBlackSpace'
import { createPortal } from 'react-dom'
import { attributesImages } from '@/components/additionals/form/FormCardFields'
import PreviewSelectionPets, { PetFrame } from '@/components/additionals/pets/PreviewSelectionPets'
import usePets from '@/devs/hooks/server/usePets'
import { useEffect, useState } from 'react'
import { IPet } from '@/devs/store/PetsStore'
import PreviewPet from '@/components/additionals/pets/PreviewPet'

interface IFarmAttributeProps {
    count: number,
    element: keyof typeof attributesImages
}

const FarmAttribute = ({ count, element }: IFarmAttributeProps) => {
    return (
        <li className='cast'>
            <div className="cast__number">
                <span className='cast__text'>{count}</span>
            </div>
            <div className="cast__preview">
                <Image src={attributesImages[element]} alt="Cast" width={24} height={24} quality={60} />
            </div>
        </li>
    )
}

const Page = () => {
    const [overWS, setOverWS, setWMode] = useOverWindowStatus(300);
    const { getPets } = usePets()

    const [pets, setPets] = useState<IPet[]>([])
    const [selectedPets, setSelectedPets] = useState<IPet[]>(new Array(6).fill(null))
    const [actIndex, setActIndex] = useState<number>(0)

    useEffect(() => {
        getPets('allPets').then(data => setPets(data));
    }, [])



    return (
        <div className="farm">
            {['opened', 'to-hide'].includes(overWS) &&
                createPortal(<OverBlackSpace additionStyle={overWS}>
                    <ul className="farm__all-pets-list">
                        {pets.map(v =>
                            <PreviewSelectionPets
                                key={v?.id}
                                setSelection={() => {
                                    let previewPets = selectedPets;
                                    previewPets[actIndex] = v
                                    setSelectedPets(previewPets)
                                    setWMode()
                                }}
                                selectedPet={null}
                                thisPet={v}
                            >
                                <PetFrame attribute={v.attribute} rarity={v.rarity} rating={v.rating.toString()} name={v.character} />
                            </PreviewSelectionPets>
                        )}
                    </ul>
                    <div className="farm__all-pets-logic">
                        <LightButton title="Отмена" func={setWMode} />
                    </div>
                </OverBlackSpace>, document.body)}
            <div className="farm__place-selector">
                <section className="farm__selector">
                    <ul className="farm__casts-list">
                        <FarmAttribute count={5} element='огонь' />
                        <FarmAttribute count={1} element='ветер' />
                    </ul>
                    <ul className="farm__pets-list">
                        {new Array(6).fill(null).map((v, i) =>
                            <PreviewPet
                                key={i}
                                thisPet={selectedPets[i]}
                                func={() => setOverWS('opened')}
                                setSelection={() => setActIndex(i)}
                            />
                        )}
                    </ul>
                    <div className="farm__result">
                        <div className="farm__result-title">
                            <h4 className='farm__rt'>
                                Получаемые очки
                            </h4>
                        </div>
                        <div className="farm__result-counter">
                            <span className='farm__result-text'>1200</span>
                        </div>
                    </div>
                </section>
                <section className="farm__logic">
                    <div className="farm__timer">
                        <span className='farm__t-text'>
                            00:00:00
                        </span>
                    </div>
                    <div className="farm__btns">
                        <LightButton title="Начать" />
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Page