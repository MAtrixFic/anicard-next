'use client'
import { useQuery } from "@tanstack/react-query"
import { useTrades } from "@/devs/hooks/server/useTrades"
import YourOffer from "./YourOffer"
import YourOfferResponse from "./YourOfferResponse"
import { useState } from "react"
import { TTradeStatus } from "@/components/server/comp/TradesApi"
import { useUser } from "@/devs/hooks/server/useUser"

const YourBlock = () => {
    const { getMyTrades, deleteTrade, acceptOrNoTheOffer } = useTrades()
    const { data: user } = useUser()
    const query = useQuery({
        queryFn: getMyTrades,
        queryKey: ['my-trades']
    })

    const [offerType, setOfferType] = useState<TTradeStatus>('pending')
    const [offerTypesList] = useState<{ [key: string]: string }>({
        'pending': 'Выставлен',
        'waiting_approval': 'Ожидание',
        'accepted': 'Завершен'
    })
    if (query.isLoading) return;


    return (
        <>
            <div className="trades__your-filter-block">
                <ul className="trades__your-filter">
                    {Object.keys(offerTypesList).map(v =>
                        <YourTradeFilterElemenet
                            key={v}
                            filterV={offerType}
                            title={offerTypesList[v]}
                            keyV={v as TTradeStatus}
                            setFilter={setOfferType}
                        />
                    )}
                </ul>
            </div>
            <ul className="trades__your-offers-list">
                {query.data?.filter(fv => offerType?.includes
                    (fv.status)).map(v =>
                        v.targetCard ?
                            <YourOfferResponse
                                userId={user?.id}
                                trade={v}
                                key={v.id}
                                deleteTrade={() => acceptOrNoTheOffer(v.id, 'declined')}
                                acceptTrade={() => acceptOrNoTheOffer(v.id, 'accepted')}
                            /> :
                            <YourOffer
                                trade={v}
                                key={v.id}
                                deleteTrade={() => deleteTrade(v.id)}
                            />
                    )}
            </ul>
        </>
    )

}


interface IYourTradeFilterElemenetProps {
    title: string,
    filterV: TTradeStatus,
    keyV: TTradeStatus,
    setFilter: (key: TTradeStatus) => void;
}
const YourTradeFilterElemenet = ({ title, setFilter, keyV, filterV }: IYourTradeFilterElemenetProps) => {
    return (
        <li className={`trades__your-f-element ${filterV.includes(keyV) ? 'active' : ''}`}>
            <button onClick={() => setFilter(keyV)}>
                {title}
            </button>
        </li>
    )
}

export default YourBlock