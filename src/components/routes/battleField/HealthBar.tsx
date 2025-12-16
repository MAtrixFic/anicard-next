import Image from "next/image"

interface IHealthBar {
    userName: string,
    health: number,
    additionalStyle?: string,
}


const HealthBar = ({ userName, health, additionalStyle }: IHealthBar) => {
    return (
        <section className={`health-bar ${additionalStyle}`}>
            <div className="health-bar__user-logo-container">
                <Image height={40} width={40} alt="logo" src={'/avatar/default-avatar.jpg'} />
            </div>
            <div className="health-bar__user-health-bar-container" >
                <div className="health-bar__user-name-container">
                    <span className="health-bar__user-name">{userName}</span>
                </div>
                <div className="health-bar__sl-container">
                    <div className="health-bar__slider" style={{ transform: `scaleX(${health}%)` }} />
                </div>
            </div>
        </section>
    )
}

export default HealthBar