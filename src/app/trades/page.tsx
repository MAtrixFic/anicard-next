import LightButton from "@/components/additionals/buttons/LightButton"
import Image from "next/image"
import Link from "next/link"
import SearchFilter from "@/components/routes/profile/SearchFilter"
import Input from "@/components/additionals/Input"
import { ICard } from "@/components/additionals/cards/CardGlobalChoiseList"

const Page = () => {
    return (
        <div className="trades">
            <div className="trades__top">
                <div className="trades__container trades__container-inventory">
                    <div className="trades__inventory-container">
                        <Link href='/trades/inventory' className="trades__link">
                            Инвентарь
                        </Link>
                    </div>
                </div>
                <div className="trades__container">
                    <ul className="trades__your-offers-list">
                        <li className="your-offer">
                            <div className="your-offer__preivew-container">

                            </div>
                            <div className="your-block__info-block">

                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="trades__bottom">
                <div className="trades__orders-filter-container">
                    <Input />
                    <SearchFilter />
                </div>
                <div className="trades__orders-list-container">
                    <ul className="trades__orders-list">
                        <OtherOrder cardInfo={{ src: 'Rem.jpg', name: 'Рем', rang: 'S', id: 14 }} price={50} />
                        <OtherOrder cardInfo={{ src: '02.jpg', name: '02', rang: 'S', id: 16 }} price={45} />
                    </ul>
                </div>
            </div>
        </div>
    )
}



interface IOtherOrderProps {
    cardInfo: ICard,
    price: number
}
const OtherOrder = ({ cardInfo, price }: IOtherOrderProps) => {
    return (
        <li className="other-order">
            <div className="other-order__left-block">
                <Image src={`/${cardInfo.src}`} className="other-order__preview-img" alt="order-img" height={100} width={100} />
            </div>
            <div className="other-order__right-block">
                <div className="other-order__info-block">
                    <div className="other-order__title-container">
                        <h4 className="other-order__title">
                            {cardInfo.name}
                        </h4>
                    </div>
                    <div className="other-order__price-container">
                        <span className="other-order__price">
                            {price} Crystals
                        </span>
                    </div>
                </div>
                <div className="other-order__manipulations-block">
                    <LightButton title='Подробнее' additionStyle="tiny purple" />
                    <LightButton title='Купить' additionStyle="tiny green" />
                </div>
            </div>
        </li>
    )
}

export default Page