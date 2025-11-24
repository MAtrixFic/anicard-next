interface IHealthBar {
    userName: string,
    health: number,
    additionalStyle?: string,
}


const HealthBar = ({ userName, health, additionalStyle }: IHealthBar) => {
    return (
        <section className={`health-bar ${additionalStyle}`}>
            <div className="health-bar__user-logo-container">
                <div className="health-bar__user-name-container">
                    <span className="health-bar__user-name">{userName}</span>
                </div>
            </div>
            <div className="health-bar__user-health-bar-container" >
                <div className="health-bar__slider" style={{ transform: `scaleX(${health}%)` }} />
            </div>
        </section>
    )
}

export default HealthBar