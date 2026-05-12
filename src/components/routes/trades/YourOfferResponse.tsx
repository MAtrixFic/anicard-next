import { IYourOfferProps } from "./YourOffer"
import LightButton from "@/components/additionals/buttons/LightButton"
import Image from "next/image"
import { Exchange } from "@/components/icons/Cards"
import { BACK_ORIGIN } from "@/components/server/fetches/env.config"

interface IYourOfferResponseProps extends IYourOfferProps {
    acceptTrade: () => any,
    userId?: number
}


const YourOfferResponse = ({ trade, userId, deleteTrade, acceptTrade }: IYourOfferResponseProps) => {
    const activeBtns = trade.creatorId === userId && trade.status === 'waiting_approval'
    return (
        <div className={`your-offer your-offer__response ${trade.creatorId === userId ? 'creator' : 'offer'} ${trade.status}`}>
            <div className="your-offer__left-block">
                <div className="your-offer__cards">
                    <div className="your-offer__card">
                        <Image className="your-offer__preview-img" src={`${BACK_ORIGIN}/${trade.creatorCard.photo}`} height={40} width={40} quality={75} preload alt="offer-img" />
                        <h4 className="your-offer__title">
                            {trade.creatorCard.rarity}
                        </h4>
                    </div>
                    <div className="your-offer__card">
                        <Image className="your-offer__preview-img" src={`${BACK_ORIGIN}/${trade.targetCard!.photo}`} height={40} width={40} quality={75} preload alt="offer-img" />
                        <h4 className="your-offer__title">
                            {trade.targetCard!.rarity}
                        </h4>
                    </div>
                </div>
                <div className="your-offer__exchange">
                    <Exchange />
                </div>
            </div>
            <div className="your-offer__right-block">
                <div className="your-offer__manipulations-block">
                    {activeBtns && <LightButton title='Отменить' additionStyle="tiny purple" func={deleteTrade} />}
                    {activeBtns && <LightButton title='Принять' additionStyle="tiny green" func={acceptTrade} />}
                </div>
            </div>
        </div >
    )
}

export default YourOfferResponse