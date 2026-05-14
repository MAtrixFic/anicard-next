import LightButton from "@/components/additionals/buttons/LightButton";
import PreviewCard from "@/components/additionals/cards/PreviewCard";
import PreviewSelectionCard from "@/components/additionals/cards/PreviewSelectionCard";
import Filter from "@/components/additionals/form/Filter";
import OverBlackSpace from "@/components/additionals/OverBlackSpace";
import { ICard } from "@/components/additionals/Windows/CardGlobalChoiseList";
import { ITrade } from "@/components/server/comp/TradesApi";
import { useCards } from "@/devs/hooks/server/useCards";
import { useTrades } from "@/devs/hooks/server/useTrades";
import { useUser } from "@/devs/hooks/server/useUser";
import useOverWindowStatus from "@/devs/hooks/useOverWindowStatus";
import useSelection from "@/devs/hooks/useSelection";
import { useEffect, useState } from "react";
import { BaseFrame } from "@/components/additionals/cards/PreviewSelectionCard";

interface IExchangeWindowProps {
    exchangedTrade: ITrade,
    setExchangedTrade: (card: ITrade | null) => void;
}

const ExchangeWindow = ({ exchangedTrade, setExchangedTrade }: IExchangeWindowProps) => {
    const { data: user } = useUser()
    const { responsdToOffer } = useTrades()
    const { getCards } = useCards()
    const [selectedCard, setSelectedCard] = useSelection<ICard>()

    const [inventoryCards, setInventoryCards] = useState<ICard[]>([]);
    const [previewCards, setPreviewCards] = useState<ICard[]>([])
    const [ws, , setWStimer] = useOverWindowStatus(3000)

    useEffect(() => {
        setWStimer();
    }, [])

    function ExitExchangeWindow() {
        setWStimer();
        setTimeout(() => {
            setExchangedTrade(null);
        }, 300)
    }


    useEffect(() => {
        if (user) {
            getCards('allCards').then(data => {
                const cards = data.length > 0 ? data : []
                setInventoryCards(cards);
                setPreviewCards(cards);
            })
        }
    }, [user?.id || 0])


    async function ResponseToOffer() {
        if (selectedCard) {
            await responsdToOffer(exchangedTrade.id, selectedCard?.id)
            ExitExchangeWindow()
        }

    }

    return (
        <OverBlackSpace additionStyle={ws}>
            <div className="exchange-window">
                <section className="exchange-window__section exchange-window__section-exchanged-card">
                    <div className="exchange-window__card-preivew">
                        <PreviewCard thisCard={exchangedTrade.creatorCard} />
                    </div>
                    <div className="exchange-window__exchange-desc-container">
                        <ul className="exchange-list">
                            {Object.keys(exchangedTrade.creatorCard).filter(fv =>
                                exchangedTrade.creatorCard[fv as keyof typeof exchangedTrade.creatorCard] && !['id', 'updated', 'photo', 'created'].includes(fv)
                            ).map((v) =>
                                <ExchangeElement
                                    key={v}
                                    title={v}
                                    value={(exchangedTrade.creatorCard[v as keyof typeof exchangedTrade.creatorCard])!.toString()} />
                            )}
                        </ul>
                    </div>
                </section>
                <section className="exchange-window__section exchange-window__section-your-choice">
                    <div className="cards-choise__list-container">
                        {/* <section className="cards-choise__filter-container">
                            <Filter style="cards-choise__filter pd-no" submit={(data: any) => console.log(data)} />
                        </section> */}
                        <section className="cards-choise__cards-list">
                            <ul className="cards-choise__list">
                                {inventoryCards.map((v, i) =>
                                    <PreviewSelectionCard
                                        key={v?.id}
                                        setSelection={setSelectedCard}
                                        selectedCard={selectedCard}
                                        thisCard={v}
                                    >
                                        <BaseFrame
                                            name={v.character || 'Unknown'}
                                            rating={v.current_rating?.toString() || '0'}
                                            attribute={v.attribute}
                                            rarity={v.rarity}
                                            university={v.universe} />
                                    </PreviewSelectionCard>
                                )}
                            </ul>
                        </section>
                    </div>
                    <div className="exchange-window__logic-block">
                        {selectedCard && <div className="exchange-window__card-selection">
                            <LightButton title='Обменять' additionStyle="green" func={ResponseToOffer} />
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

export default ExchangeWindow