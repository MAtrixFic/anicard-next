import Image from "next/image"
import LightButton from "@/components/additionals/buttons/LightButton"
import { IMyTrade } from "@/components/server/comp/TradesApi"
import { BACK_ORIGIN } from "@/components/server/fetches/env.config";

export interface IYourOfferProps {
    trade: IMyTrade,
    deleteTrade: () => any;
}
const YourOffer = ({ trade, deleteTrade }: IYourOfferProps) => {
    console.log(`${BACK_ORIGIN}/${trade.creatorCard.photo}`)
    return (
        <div className="your-offer">
            <div className="your-offer__left-block">
                <Image className="your-offer__preview-img" src={`${BACK_ORIGIN}/${trade.creatorCard.photo}`} height={40} width={40} quality={75} preload alt="offer-img" />
            </div>
            <div className="your-offer__right-block">
                <div className="your-offer__info-block">
                    <div className="your-offer__title-container">
                        <h4 className="your-offer__title">
                            {trade.creatorCard.rarity}
                        </h4>
                    </div>
                </div>
                <div className="your-offer__manipulations-block">
                    <LightButton title='Удалить' additionStyle="tiny purple" func={deleteTrade} />
                </div>
            </div>
        </div >
    )
}

export default YourOffer