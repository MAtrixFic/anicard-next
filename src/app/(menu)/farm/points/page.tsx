'use client'

import '@/styles/farmPoints.scss'
import { StarPoint } from '@/components/icons/Star'
import Link from 'next/link'
import { useEffect, useState } from 'react'

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
                    <ul className="farm-points__star-list">
                        <StarFarmPoint rarity='s' index={1} active />
                        <StarFarmPoint rarity='a' index={2} />
                        <StarFarmPoint rarity='c' index={3} />
                        <StarFarmPoint rarity='b' index={4} />
                        <StarFarmPoint rarity='c' index={5} active />
                        <StarFarmPoint rarity='s' index={6} />
                        <StarFarmPoint rarity='a' index={7} />
                        <StarFarmPoint rarity='b' index={8} />
                    </ul>
                </div>
            </div>
        </div>
    )
}

export interface IStarFarmPointProps {
    rarity: string,
    time?: number,
    active?: boolean
}

export const StarFarmPoint = ({ active = false, time, rarity, index }: IStarFarmPointProps & { index: number }) => {
    const [pos, setPos] = useState<'left' | 'right'>('right')

    useEffect(() => {
        const current = document.querySelector(`.star-point__${index}`)
        if (current) {
            console.log(index, current.getBoundingClientRect())
            const starRect = current.getBoundingClientRect();
            const windowScreen = window.innerWidth;
            if ((starRect.x + 200) > (windowScreen - 20)) {
                setPos('left')
            }
        }

    }, [])

    return (
        <li className={`star-point star-point__${rarity} star-point__${index} ${active ? 'active' : ''}`}>
            <div className="star-point__container">
                <Link className='star-point__btn' href={`/farm/${rarity}`}>
                    <div className="star-container">
                        <StarPoint />
                    </div>
                </Link>
                {active && <div className={`star-point__logic star-point__logic-${pos}`}>
                    <div className="star-point__time">
                        <span className='star-pint__timer'>{'00:00:00'}</span>
                    </div>
                </div>}
            </div>
        </li>
    )
}

export default Page