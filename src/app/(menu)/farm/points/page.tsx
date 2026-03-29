'use client'
import '@/styles/farmPoints.scss'
import { StarPoint } from '@/components/icons/Star'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import StarsList from '@/components/additionals/stars/StarsList'

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
    const [timeLeft, setTimeLeft] = useState<number>(() => time ? GetSeonds(time) : 0)

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


    const GetSeonds = (time: string) => {
        const fixed = time.replace(/(\.\d{3})\d+/, '$1');
        const pastDate = new Date(fixed);
        const now = Date.now();
        const diffMs = now - pastDate.getTime();
        const diffSeconds = Math.floor(diffMs / 1000);
        return diffSeconds
    }

    const toCustomTimeString = (seconds: number) => {
        const hours = Math.floor(seconds / 3600).toString().padStart(2, '0');
        const minutes = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
        const secondsPart = (seconds % 60).toString().padStart(2, '0');
        return `${hours}:${minutes}:${secondsPart}`;
    };

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
                        <span className='star-pint__timer'>{toCustomTimeString(timeLeft)}</span>
                    </div>
                </div>}
            </div>
        </li>
    )
}

export default Page