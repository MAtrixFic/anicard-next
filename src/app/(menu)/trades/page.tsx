'use client'
import LightButton from "@/components/additionals/buttons/LightButton"
import Image from "next/image"
import { CardDesctiption, ICard } from "@/components/additionals/Windows/CardGlobalChoiseList"
import { useCardsStore } from "@/devs/store/CardsStore"
import useOverWindowStatus from "@/devs/hooks/useOverWindowStatus"
import PreviewSelectionCard from "@/components/additionals/cards/PreviewSelectionCard"
import useSelection from "@/devs/hooks/useSelection"
import OverBlackSpace from "@/components/additionals/OverBlackSpace"
import { useEffect, useState } from "react"
import PreviewCard from "@/components/additionals/cards/PreviewCard"
import { Exchange } from "@/components/icons/Cards"
import Filter from "@/components/additionals/form/Filter"

const Page = () => {
    const cards = useCardsStore(state => state.allCards);
    const [exchangeSelectionCard, setExchangeSelectionCard] = useState<ICard | null>();

    return (
        <div className="trades">
            <div className="trades__top">
                <div className="trades__container trades__container-vertical">
                    <div className="trades__list-title-container">
                        <span className="trades__list-title">Твой список предложений:</span>
                    </div>
                    <ul className="trades__your-offers-list">
                        {/* <YourOffer cardInfo={cards[1]} /> */}
                        {/* <YourOfferResponse cardInfo={cards[0]} cardInfoClient={cards[4]} /> */}
                    </ul>
                </div>
            </div>
            <div className="trades__bottom">
                <div className="trades__orders-filter-container">
                    <Filter style="trades__form" submit={(data: any) => console.log(data)} />
                </div>
                <div className="trades__orders-list-container">
                    <ul className="trades__orders-list">
                        {cards.map(v =>
                            <OtherOrder
                                key={v.id}
                                cardInfo={v}
                                openExchange={setExchangeSelectionCard} />
                        )}
                    </ul>
                </div>
            </div>
            {exchangeSelectionCard && <ExchangeWindow exchangedCard={exchangeSelectionCard} setExchangedCard={setExchangeSelectionCard} />}
        </div>
    )
}



interface IOtherOrderProps {
    cardInfo: ICard,
    openExchange: (exchangeCard: ICard) => void;
}
const OtherOrder = ({ cardInfo, openExchange }: IOtherOrderProps) => {
    return (
        <li className="other-order">
            <div className="other-order__left-block">
                <Image src={cardInfo.photo} className="other-order__preview-img" alt="order-img" height={100} width={100} />
            </div>
            <div className="other-order__right-block">
                <div className="other-order__info-block">
                    <div className="other-order__title-container">
                        <h4 className="other-order__title">
                            {cardInfo.character}
                        </h4>
                    </div>
                </div>
                <div className="other-order__manipulations-block">
                    <LightButton title='Обменять' additionStyle="tiny green" func={() => openExchange(cardInfo)} />
                </div>
            </div>
        </li>
    )
}

interface IYourOfferProps {
    cardInfo: Omit<ICard, 'desc' | 'rang'>
}

const YourOffer = ({ cardInfo }: IYourOfferProps) => {
    return (
        <div className="your-offer">
            <div className="your-offer__left-block">
                <Image className="your-offer__preview-img" src={cardInfo.photo} height={40} width={40} quality={60} preload alt="offer-img" />
            </div>
            <div className="your-offer__right-block">
                <div className="your-offer__info-block">
                    <div className="your-offer__title-container">
                        <h4 className="your-offer__title">
                            {cardInfo.character}
                        </h4>
                    </div>
                </div>
                <div className="your-offer__manipulations-block">
                    <LightButton title='Удалить' additionStyle="tiny purple" />
                </div>
            </div>
        </div >
    )
}

interface IYourOfferResponseProps extends IYourOfferProps {
    cardInfoClient: Omit<ICard, 'desc' | 'rang'>
}


const YourOfferResponse = ({ cardInfo, cardInfoClient }: IYourOfferResponseProps) => {
    return (
        <div className="your-offer your-offer__response">
            <div className="your-offer__left-block">
                <div className="your-offer__cards">
                    <div className="your-offer__card">
                        <Image className="your-offer__preview-img" src={cardInfo.photo} height={40} width={40} quality={60} preload alt="offer-img" />
                        <h4 className="your-offer__title">
                            {cardInfo.character}
                        </h4>
                    </div>
                    <div className="your-offer__card">
                        <Image className="your-offer__preview-img" src={cardInfoClient.photo} height={40} width={40} quality={60} preload alt="offer-img" />
                        <h4 className="your-offer__title">
                            {cardInfoClient.character}
                        </h4>
                    </div>
                </div>
                <div className="your-offer__exchange">
                    <Exchange />
                </div>
            </div>
            <div className="your-offer__right-block">
                <div className="your-offer__manipulations-block">
                    <LightButton title='Отменить' additionStyle="tiny purple" />
                    <LightButton title='Принять' additionStyle="tiny green" />
                </div>
            </div>
        </div >
    )
}

interface IExchangeWindowProps {
    exchangedCard: ICard,
    setExchangedCard: (card: ICard | null) => void;
}

const ExchangeWindow = ({ exchangedCard, setExchangedCard }: IExchangeWindowProps) => {
    const cards = useCardsStore(state => state.allCards)
    const [selectedCard, setSelectedCard] = useSelection<ICard>()
    const [marketWindowStatus, setMarketWindowStatus, setMarketWindowVisibility] = useOverWindowStatus(300);
    const [ws, setWS, setWStimer] = useOverWindowStatus(3000)

    useEffect(() => {
        setWStimer();
    }, [])

    function ExitExchangeWindow() {
        setWStimer();
        setTimeout(() => {
            setExchangedCard(null);
        }, 300)
    }

    const optionKeys = {
        attribute: 'Атрибут',
        rating: 'Рейтинг'
    }

    return (
        <OverBlackSpace additionStyle={ws}>
            <div className="exchange-window">
                <section className="exchange-window__section exchange-window__section-exchanged-card">
                    <div className="exchange-window__card-preivew">
                        <PreviewCard thisCard={exchangedCard} />
                    </div>
                    <div className="exchange-window__exchange-desc-container">
                        <ul className="exchange-list">
                            <ExchangeElement value={exchangedCard.character} />
                            {Object.keys(exchangedCard).map((v) =>
                                <ExchangeElement
                                    key={v}
                                    title={optionKeys[v as keyof typeof optionKeys]}
                                    value={(exchangedCard[v as keyof typeof exchangedCard]).toString()} />
                            )}
                        </ul>
                    </div>
                </section>
                <section className="exchange-window__section exchange-window__section-your-choice">
                    <div className="cards-choise__list-container">
                        <section className="cards-choise__filter-container">
                            <Filter style="cards-choise__filter pd-no" submit={(data: any) => console.log(data)} />
                        </section>
                        <section className="cards-choise__cards-list">
                            <ul className="cards-choise__list">
                                {cards.map((v, i) =>
                                    <PreviewSelectionCard
                                        key={v?.id + i}
                                        setSelection={setSelectedCard}
                                        selectedCard={selectedCard}
                                        thisCard={v}
                                    />
                                )}
                            </ul>
                        </section>
                    </div>
                    <div className="exchange-window__logic-block">
                        {selectedCard && <div className="exchange-window__card-selection">
                            {/* <CardDesctiption
                                opts={selectedCard ? [{ key: 'Ранг', value: selectedCard.rarity }] : []}
                                name={selectedCard?.character}
                            /> */}
                            <LightButton title='Обменять' additionStyle="green" func={setMarketWindowVisibility} />
                        </div>}
                        <LightButton title='Выйти' additionStyle="purple" func={ExitExchangeWindow} />
                    </div>
                </section>
            </div>
        </OverBlackSpace>
    )
}

interface IExchangeElementProps {
    title?: string,
    value: string
}

const ExchangeElement = ({ title, value }: IExchangeElementProps) => {
    return (
        <li className="exchange-list__element">
            {title && <div className="exchange-list__container">
                <span>{title}:</span>
            </div>}
            <div className="exchange-list__container">
                <span>{value}</span>
            </div>
        </li>
    )
}

export default Page