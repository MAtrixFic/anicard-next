'use client'
import Filter from "@/components/additionals/form/Filter"
import OtherOrder from "./OtherOrder"
import { createPortal } from "react-dom"
import { useState } from "react";
import ExchangeWindow from "./ExchangeWindow";
import { useTrades } from "@/devs/hooks/server/useTrades";
import { useQuery } from "@tanstack/react-query";
import { ITrade } from "@/components/server/comp/TradesApi";
import Loader from "@/components/additionals/loading/Loader";

const OtherBlock = () => {
    const [exchangeSelectionTrade, setExchangeSelectionTrade] = useState<ITrade | null>();
    const { getActiveTrades } = useTrades()
    const query = useQuery({
        queryFn: getActiveTrades,
        queryKey: ['other-trades']
    })

    return (
        <>
            <div className="trades__orders-filter-container">
                <Filter style="trades__form" submit={(data: any) => console.log(data)} />
            </div>
            <div className="trades__orders-list-container">
                <ul className="trades__orders-list">
                    <Loader
                        data={query.data}
                        isLoading={query.isLoading}
                        error={query.error?.message}
                        onLoad={(data) => (
                            data.map(v =>
                                <OtherOrder
                                    key={v.id}
                                    trade={v}
                                    openExchange={setExchangeSelectionTrade}
                                />)
                        )}
                    />
                </ul>
            </div>

            {exchangeSelectionTrade && createPortal(<ExchangeWindow exchangedTrade={exchangeSelectionTrade} setExchangedTrade={setExchangeSelectionTrade} />, document.body)}
        </>
    )
}

export default OtherBlock