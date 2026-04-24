'use client'
import '@/styles/farmPoints.scss'
import StarsList from '@/components/routes/farm/StarsList'

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


export default Page