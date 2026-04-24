'use client'

import StarFarmPoint from '@/components/routes/farm/StarFarmPoint'
import { IPveStarResponse } from '@/components/server/comp/PVEApi'
import { usePVE } from '@/devs/hooks/server/usePve'
import { useEffect, useState } from 'react'

export enum FarmStatutes {
    FREE = 'free',
    OCCUPIED = 'occupied'
}

const StarsList = () => {
    const { getValue } = usePVE()
    const [stars, setStars] = useState<IPveStarResponse[]>([])

    useEffect(() => {
        getValue('stars').then((data) => {
            console.log(data)
            setStars(data as IPveStarResponse[])
        })
    }, [])

    return (
        <ul className="farm-points__star-list">
            {stars.map(v =>
                <StarFarmPoint
                    key={v.star_id}
                    time={v.end_time}
                    rarity={v.rarity.toLowerCase()}
                    id={v.star_id}
                    active={v.status.includes(FarmStatutes.OCCUPIED)} />
            )}
        </ul>
    )
}

export default StarsList
