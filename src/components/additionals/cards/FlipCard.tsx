interface IFlipCardProps {
    state: 'flip' | 'no-flip',
    element: React.ReactNode
}

const FlipCard = ({ state, element }: IFlipCardProps) => {
    return (
        <section className={`flip-card ${state}`}>
            <div className="flip-card__inner">
                <div className="flip-card__front">
                    {element}
                </div>
                <div className="flip-card__back">
                    <span className="flip-card__text">?</span>
                </div>
            </div>
        </section>
    )
}

export default FlipCard