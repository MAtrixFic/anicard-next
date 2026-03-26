import '@/styles/farmPoints.scss'
import { StarPoint } from '@/components/icons/Star'
import LightButton from '@/components/additionals/buttons/LightButton'
import Link from 'next/link'

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
                        <StarFarmPoint />
                        <StarFarmPoint />
                        <StarFarmPoint />
                        <StarFarmPoint />
                    </ul>
                </div>
            </div>
        </div>
    )
}

export interface IStarFarmPointProps {
    rarity: string,
    time: number
}

export const StarFarmPoint = () => {
    return (
        <li className='star-point'>
            <Link className='star-point__btn' href={'/farm'}>
                <div className="star-container">
                    <StarPoint />
                </div>
            </Link>
        </li>
    )
}

export default Page