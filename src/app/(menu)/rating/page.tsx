'use client'

import { IRatingResponse } from "@/components/server/comp/UserApi"
import { useQuery } from "@tanstack/react-query"
import { GetTopUsers } from "@/components/server/comp/Apis"

const Rating = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['rating'],
        queryFn: () => GetTopUsers()
    })

    return (
        <div className="rating">
            <div className="rating__rb">
                {/* <div className="rating__title-container">
                    <h2 className="rating__title">
                        Рейтинг
                    </h2>
                </div> */}
                <div className="rating__list-container">
                    <ul className="rating__list">
                        {data && (data as IRatingResponse).top_users.map((v, i) =>
                            <RatingElement numberId={i + 1} key={v.user_id} username={v.nickname} score={v.rating} />
                        )}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Rating

interface IRatingElementProps {
    numberId: number,
    username: string,
    score: number
}

const RatingElement = ({ numberId, username, score }: IRatingElementProps) => {
    return (
        <li className="rating-element">
            <div className="rating-element__left">
                <div className="rating-element__number-container">
                    <span className={`rating-element__text rating-element__text-number ${[1, 2, 3].includes(numberId) ? 'prize' : ''}`}>
                        {numberId}
                    </span>
                </div>
                <div className="rating-element__username-container">
                    <span className="rating-element__text rating-element__text-username">
                        {username}
                    </span>
                </div>
            </div>
            <div className="rating-element__right">
                <div className="rating-element__score-container">
                    <span className={`rating-element__text rating-element__text-score rating-${numberId}`}>
                        {score}
                    </span>
                </div>
            </div>
        </li>
    )
}