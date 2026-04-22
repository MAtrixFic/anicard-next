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
import { usePVE } from '@/devs/hooks/server/usePve'
import { useParams } from 'next/navigation'
import useTimer from '@/devs/hooks/useTimer'
import { ICurrentStartAllDataResponse, IPveStarResponse } from '@/components/server/comp/PVEApi'
import { FarmStatutes } from '@/components/additionals/stars/StarsList'
import SuperTimer from '@/devs/time/SuperTimer'

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
    const farmParams = useParams()
    const [overWS, setOverWS, setWMode] = useOverWindowStatus(300);

    const { getPets } = usePets()
    const [pets, setPets] = useState<IPet[]>([])
    const [selectedPets, setSelectedPets] = useState<(IPet | null)[]>(new Array(6).fill(null))
    const [selectedIndexes, setSelectedIndexes] = useState<number[]>([])
    const [actIndex, setActIndex] = useState<number>(0)
    const { StartFarmTheStar, GetCurrentStar } = usePVE()
    const [currentStar, setCurrentStar] = useState<ICurrentStartAllDataResponse>();
    const { timeLeft, Pause, Start } = useTimer();

    useEffect(() => {
        getPets('allPets').then(data => setPets(data));
    }, [])

    function DeletePet(index: number) {
        const curSelectedPets = [...selectedPets]
        curSelectedPets[index] = null
        setSelectedPets(curSelectedPets)
    }

    useEffect(() => {
        setSelectedIndexes(selectedPets.filter(v => v != null).map(v => Number(v.id)))
    }, [selectedPets.filter(v => v !== null).length])

    useEffect(() => {
        GetCurrentStar(Number(farmParams.index)).then(data => {
            if (data) setCurrentStar(data)
            if (data?.star.status.includes(FarmStatutes.OCCUPIED)) {
                Start(SuperTimer.GetSeonds(data.star.end_time))
                setSelectedPets(data.expedition.pets)
            }
        })
    }, [])



    return (
        <div className="farm">
            {['opened', 'to-hide'].includes(overWS) &&
                createPortal(<OverBlackSpace additionStyle={overWS}>
                    <ul className="farm__all-pets-list">
                        {pets.filter(fv => !selectedPets.includes(fv) && currentStar?.star.element.includes(fv.attribute)).map(v =>
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
                        {currentStar?.star.rarity}
                        {' '}
                        {currentStar?.star.element}
                        {' '}
                        {currentStar?.star.star_id}
                        {/* <FarmAttribute count={5} element='огонь' />
                        <FarmAttribute count={1} element='ветер' /> */}
                    </ul>
                    <ul className="farm__pets-list">
                        {new Array(6).fill(null).map((v, i) => {
                            const currentSelPet = selectedPets[i]
                            return (
                                <PreviewPet
                                    key={i}
                                    thisPet={currentSelPet}
                                    func={() => { setOverWS('opened'); setActIndex(i) }}
                                    deleteFunc={() => DeletePet(i)}
                                >
                                    {currentSelPet && <PetFrame
                                        name={currentSelPet.character}
                                        rating={currentSelPet.rating.toString()}
                                        attribute={currentSelPet.attribute}
                                        rarity={currentSelPet.rarity} />}
                                </PreviewPet>
                            )
                        })}
                    </ul>
                    <div className="farm__result">
                        <div className="farm__result-title">
                            <h4 className='farm__rt'>
                                Получаемые очки
                            </h4>
                        </div>
                        <div className="farm__result-counter">
                            <span className='farm__result-text'>{currentStar?.star.reward}</span>
                        </div>
                    </div>
                </section>
                <section className="farm__logic">
                    <div className="farm__timer">
                        <span className='farm__t-text'>
                            {currentStar?.star.status.includes('free') ? `${currentStar?.star.hours}:00:00` : SuperTimer.ToCustomTimeString(timeLeft)}
                        </span>
                    </div>
                    <div className="farm__btns">
                        <LightButton title="Начать" active={selectedIndexes.length > 0} func={async () => await StartFarmTheStar(Number(farmParams.index), selectedIndexes)} />
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Page