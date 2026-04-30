import { IPet } from "@/devs/store/PetsStore"
import { BACK_ORIGIN } from "@/components/server/fetches/env.config"
import Image from "next/image"

interface IHealthBar {
    userName: string,
    health: number,
    additionalStyle?: string,
    pet: IPet | null,
    maxHp: number
}


const HealthBar = ({ userName, health, additionalStyle, pet, maxHp }: IHealthBar) => {
    return (
        <section className={`health-bar ${additionalStyle}`}>
            <div className={`health-bar__pet-container ${pet ? 'is-pet' : 'no-pet'} pet-${pet?.rarity.toLocaleLowerCase()}`}>
                {pet && <Image height={40} width={40} alt="logo" src={`${BACK_ORIGIN}/${pet?.photo}`} />}
            </div>
            <div className="health-bar__user-logo-container">
                <Image height={40} width={40} alt="logo" src={'/avatar/default-avatar.jpg'} />
            </div>
            <div className="health-bar__user-health-bar-container" >
                <div className="health-bar__user-name-container">
                    <span className="health-bar__user-name">{userName}</span>
                </div>
                <div className="health-bar__sl-container">
                    <div className="health-bar__slider" style={{ transform: `scaleX(${health / maxHp * 100}%)` }} />
                </div>
            </div>
        </section>
    )
}

export default HealthBar