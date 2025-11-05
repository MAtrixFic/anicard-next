import LightButton from "@/components/additionals/buttons/LightButton"
import Image from "next/image"
import Link from "next/link"
import SearchFilter from "@/components/routes/profile/SearchFilter"
import Input from "@/components/additionals/Input"
import { ICard } from "@/components/additionals/Windows/CardGlobalChoiseList"

const Page = () => {
    return (
        <div className="trades">
            <div className="trades__top">
                <div className="trades__container trades__container-vertical">
                    <div className="trades__list-title-container">
                        <span className="trades__list-title">Твой список предложений:</span>
                    </div>
                    <ul className="trades__your-offers-list">
                        <YourOffer cardInfo={{ src: '/Rem.jpg', name: 'Рем', id: 14 }} price={50} />
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
                        <OtherOrder cardInfo={{ src: '/Rem.jpg', name: 'Рем', rang: 'S', id: 14 }} price={50} />
                        <OtherOrder cardInfo={{ src: '/02.jpg', name: '02', rang: 'S', id: 16 }} price={45} />
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
                <Image src={cardInfo.src} className="other-order__preview-img" alt="order-img" height={100} width={100} />
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

interface IYourOfferProps {
    cardInfo: Omit<ICard, 'desc' | 'rang'>
    price: number,
}

const YourOffer = ({ cardInfo, price }: IYourOfferProps) => {
    return (
        <div className="your-offer">
            <div className="your-offer__left-block">
                <Image className="your-offer__preview-img" src={cardInfo.src} height={40} width={40} quality={60} preload alt="offer-img" />
            </div>
            <div className="your-offer__right-block">
                <div className="your-offer__info-block">
                    <div className="your-offer__title-container">
                        <h4 className="your-offer__title">
                            {cardInfo.name}
                        </h4>
                    </div>
                </div>
                <div className="your-offer__manipulations-block">
                    <div className="your-offer__price-container">
                        <span className="your-offer__price">
                            {price} Crystals
                        </span>
                    </div>
                    <LightButton title='Удалить' additionStyle="tiny purple" />
                </div>
            </div>
        </div >
    )
}

export default Page