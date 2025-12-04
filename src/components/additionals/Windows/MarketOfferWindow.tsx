import OverBlackSpace from "../OverBlackSpace";
import { type IForeignWindowProps } from "@/components/routes/profile/FavoriteCardsSelectionPlace"
import { ICard } from "./CardGlobalChoiseList";
import LightButton from "../buttons/LightButton";
import { CardDesctiption } from "./CardGlobalChoiseList";
import PreviewCard from "../cards/PreviewCard";
import { useTrades } from "@/devs/hooks/server/useTrades";

interface IMarketOfferWindowProps extends IForeignWindowProps {
    card: ICard;
}

const MarketOfferWindow = ({ func, additionStyle, card }: IMarketOfferWindowProps) => {
    const { createTrade } = useTrades()

    return (
        <OverBlackSpace additionStyle={additionStyle}>
            <div className="market-offer">
                <div className="market-offer__body">
                    <div className="market-offer__info-block">
                        <div className="market-offer__preview-container">
                            <PreviewCard thisCard={card} />
                        </div>
                        <div className="market-offer__info-list-container">
                            <CardDesctiption
                                {...card}
                            />
                        </div>
                        {/* <div className="market-offer__container market-offer__container-inp">
                            <input type="number" placeholder="Цена" className="market-offer__input" />
                        </div> */}
                    </div>
                    <div className="market-offer__container market-offer__container-distance">
                        <LightButton title='Выйти' additionStyle="purple" func={func} />
                        <LightButton title='Выставить' additionStyle="green" func={() => createTrade(card.id)} />
                    </div>
                </div>
            </div>
        </OverBlackSpace>
    )
}

export default MarketOfferWindow;
