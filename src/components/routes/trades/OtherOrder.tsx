import Image from "next/image";
import LightButton from "@/components/additionals/buttons/LightButton";
import { ITrade } from "@/components/server/comp/TradesApi";
import { BACK_ORIGIN } from "@/components/server/fetches/env.config";

export interface IOtherOrderProps {
    trade: ITrade,
    openExchange: (exchangeTrade: ITrade) => void;
}
const OtherOrder = ({ trade, openExchange }: IOtherOrderProps) => {
    return (
        <li className="other-order">
            <div className="other-order__left-block">
                <Image src={`${BACK_ORIGIN}/${trade.creatorCard.photo}`} className="other-order__preview-img" alt="order-img" height={100} width={100} />
            </div>
            <div className="other-order__right-block">
                <div className="other-order__info-block">
                    <div className="other-order__title-container">
                        <h4 className="other-order__title">
                            {trade.creatorCard.rarity}
                        </h4>
                    </div>
                </div>
                <div className="other-order__manipulations-block">
                    <LightButton title='Обменять' additionStyle="tiny green" func={() => openExchange(trade)} />
                </div>
            </div>
        </li>
    )
}

export default OtherOrder