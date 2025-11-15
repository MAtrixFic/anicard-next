const Rating = () => {
    return (
        <div className="rating">
            <div className="rating__rb">
                <div className="rating__title-container">
                    <h2 className="rating__title">
                        Рейтинг
                    </h2>
                </div>
                <div className="rating__list-container">
                    <ul className="rating__list">
                        <RatingElement numberId={1} username="MAtrix" score={2000} />
                        <RatingElement numberId={2} username="JEk" score={1900} />
                        <RatingElement numberId={3} username="GERM" score={1920} />
                        <RatingElement numberId={4} username="FLASKE" score={1500} />
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