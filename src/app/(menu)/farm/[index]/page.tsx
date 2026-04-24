'use client'
import '@/styles/farm.scss'
import LightButton from '@/components/additionals/buttons/LightButton'
import OverBlackSpace from '@/components/additionals/OverBlackSpace'
import PreviewSelectionPets, { PetFrame } from '@/components/additionals/pets/PreviewSelectionPets'
import PreviewPet from '@/components/additionals/pets/PreviewPet'
import { FarmStatutes } from '@/components/routes/farm/StarsList'
import useOverWindowStatus from '@/devs/hooks/useOverWindowStatus'

import { createPortal } from 'react-dom'
import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'next/navigation'

import { IPet } from '@/devs/store/PetsStore'
import usePets from '@/devs/hooks/server/usePets'
import { usePVE } from '@/devs/hooks/server/usePve'
import useTimer from '@/devs/hooks/useTimer'
import SuperTimer from '@/devs/time/SuperTimer'
import { type ICurrentStartAllDataResponse } from '@/components/server/comp/PVEApi'


const Page = () => {
    const farmParams = useParams()
    const [overWS, setOverWS, setWMode] = useOverWindowStatus(300);

    const { getPets } = usePets()
    const [pets, setPets] = useState<IPet[]>([])

    const [selectedPets, setSelectedPets] = useState<(IPet | null)[]>(new Array(6).fill(null))
    const [selectedIndexes, setSelectedIndexes] = useState<number[]>([])
    const [actIndex, setActIndex] = useState<number>(0)

    const { StartFarmTheStar, GetCurrentStar, ClaimStarRewards, inProcessStar, starOnStart } = usePVE()
    const { timeLeft, Pause, Start } = useTimer();
    const possiblePets = useMemo(() => inProcessStar?.star.status.includes(FarmStatutes.FREE) ? 6 : inProcessStar?.expedition.pets.length, [])

    useEffect(() => {
        getPets('allPets').then(data => setPets(data));
    }, [])

    function DeletePet(index: number) {
        const curSelectedPets = [...selectedPets]
        curSelectedPets[index] = null
        setSelectedPets(curSelectedPets)
    }

    async function StartStar() {
        await StartFarmTheStar(Number(farmParams.index), selectedIndexes)
    }

    async function ClaimStar() {
        await ClaimStarRewards(inProcessStar?.expedition.expedition_id!)
    }

    useEffect(() => {
        setSelectedIndexes(selectedPets.filter(v => v != null).map(v => Number(v.id)))
    }, [selectedPets.filter(v => v !== null).length])

    useEffect(() => {
        GetCurrentStar(Number(farmParams.index)).then(data => {
            const csData = (data as ICurrentStartAllDataResponse)
            if (csData?.star.status.includes(FarmStatutes.OCCUPIED)) {
                Start(SuperTimer.GetSeonds(csData.star.end_time))
                setSelectedPets(csData.expedition.pets)
            }
        })
    }, [])

    const buttonStatics = useMemo(() => ({
        [FarmStatutes.FREE]:
            <LightButton
                title="Начать"
                active={selectedIndexes.length > 0 && starOnStart != null}
                func={StartStar} />,
        [FarmStatutes.OCCUPIED]:
            <LightButton
                title="Собрать награду"
                active={timeLeft <= 0}
                func={ClaimStar} />
    }), [inProcessStar?.star.status])

    return (
        <div className="farm">
            {['opened', 'to-hide'].includes(overWS) &&
                createPortal(<OverBlackSpace additionStyle={overWS}>
                    <ul className='farm__all-pets-list'>
                        {pets.filter(fv => !selectedPets.includes(fv) && inProcessStar?.star.element.includes(fv.attribute)).map(v =>
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
                        {inProcessStar?.star.rarity}
                        {' '}
                        {inProcessStar?.star.element}
                        {' '}
                        {inProcessStar?.star.star_id}
                    </ul>
                    <ul className={`farm__pets-list ${inProcessStar?.star.status}`}>
                        {new Array(possiblePets).fill(null).map((_, i) => {
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
                                Получаемая награда
                            </h4>
                        </div>
                        <div className="farm__result-counter">
                            <span className='farm__result-text'>{inProcessStar?.star.reward} монет</span>
                            {inProcessStar?.expedition.reward_pet && <PreviewPet
                                thisPet={inProcessStar.expedition.reward_pet}
                            >
                                <PetFrame
                                    name={inProcessStar.expedition.reward_pet.character}
                                    rating={inProcessStar.expedition.reward_pet.rating.toString()}
                                    attribute={inProcessStar.expedition.reward_pet.attribute}
                                    rarity={inProcessStar.expedition.reward_pet.rarity} />
                            </PreviewPet>}
                        </div>
                    </div>
                </section>
                <section className="farm__logic">
                    <div className="farm__timer">
                        <span className='farm__t-text'>
                            {inProcessStar?.star.status.includes('free') ? `${inProcessStar?.star.hours}:00:00` : SuperTimer.ToCustomTimeString(timeLeft)}
                        </span>
                    </div>
                    <div className="farm__btns">
                        {inProcessStar && buttonStatics[inProcessStar?.star.status]}
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Page