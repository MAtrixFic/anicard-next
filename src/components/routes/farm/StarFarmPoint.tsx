'use client'
import { useState, useEffect } from "react"
import useTimer from "@/devs/hooks/useTimer"
import SuperTimer from "@/devs/time/SuperTimer"
import Link from "next/link"
import { StarPoint } from "@/components/icons/Star"

export interface IStarFarmPointProps {
    rarity: string,
    time?: string,
    active?: boolean
}

const StarFarmPoint = ({ active = false, time, rarity, id }: IStarFarmPointProps & { id: number }) => {
    const [pos, setPos] = useState<'left' | 'right'>('right')
    const { timeLeft, Start } = useTimer()

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


        Start(time ? SuperTimer.GetSeonds(time) : 0)
    }, [])

    return (
        <li className={`star-point star-point__${rarity} star-point__${id} ${active ? 'active' : ''}`}>
            <div className="star-point__container">
                <Link className='star-point__btn' href={`/farm/${id}`}>
                    <div className="star-container">
                        <StarPoint />
                    </div>
                </Link>
                {active && (timeLeft > 0) && <div className={`star-point__logic star-point__logic-${pos}`}>
                    <div className="star-point__time">
                        <span className='star-pint__timer'>{SuperTimer.ToCustomTimeString(timeLeft)}</span>
                    </div>
                </div>}
            </div>
        </li>
    )
}

export default StarFarmPoint