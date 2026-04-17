'use client'
import '@/styles/farmPoints.scss'
import { StarPoint } from '@/components/icons/Star'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import StarsList from '@/components/additionals/stars/StarsList'
import SuperTimer from '@/devs/time/SuperTimer'

const Page = () => {

    return (
        <div className="farm-points">
            <div className="farm-points__top">
                <h2 className="farm-points__title">
                    Звездная карта
                </h2>
            </div>
            <div className="farm-points__middle">
                <div className="farm-points__points-space">
                    <StarsList />
                </div>
            </div>
        </div>
    )
}

export interface IStarFarmPointProps {
    rarity: string,
    time?: string,
    active?: boolean
}

export const StarFarmPoint = ({ active = false, time, rarity, id }: IStarFarmPointProps & { id: number }) => {
    const [pos, setPos] = useState<'left' | 'right'>('right')
    const [timeLeft, setTimeLeft] = useState<number>(() => time ? SuperTimer.GetSeonds(time) : 0)

    useEffect(() => {
        const current = document.querySelector(`.star-point__${id}`)
        if (current) {
            console.log(id, current.getBoundingClientRect())
            const starRect = current.getBoundingClientRect();
            const windowScreen = window.innerWidth;
            if ((starRect.x + 200) > (windowScreen - 20)) {
                setPos('left')
            }
        }

    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(prev => prev - 1)
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    return (
        <li className={`star-point star-point__${rarity} star-point__${id} ${active ? 'active' : ''}`}>
            <div className="star-point__container">
                <Link className='star-point__btn' href={`/farm/${id}`}>
                    <div className="star-container">
                        <StarPoint />
                    </div>
                </Link>
                {active && <div className={`star-point__logic star-point__logic-${pos}`}>
                    <div className="star-point__time">
                        <span className='star-pint__timer'>{SuperTimer.ToCustomTimeString(timeLeft)}</span>
                    </div>
                </div>}
            </div>
        </li>
    )
}

export default Page