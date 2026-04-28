'use server'

import { ICard } from "@/components/additionals/Windows/CardGlobalChoiseList"
import FetchMG from "../fetches/config"
import { IRespone } from "./AdminApi";
import { IError } from "./Apis";

export type TTradeStatus = 'pending' | 'waiting_approval' | 'accepted' | 'declined';

export interface ITrade {
    id: number,
    creatorId: number,
    creatorCardId: number,
    status: TTradeStatus,
    creatorCard: ICard,
}

export interface IMyTrade extends ITrade {
    targetId: null | number,
    targetCardId: null | number,
    targetCard: null | ICard
}

interface ITradePesponse {
    id: number,
    creator_id: number,
    creator_card_id: number,
    status: TTradeStatus,
    creator_card: ICard,
}

interface IMyTradeRepsonse extends ITradePesponse {
    target_id: null | number,
    target_card_id: null | number,
    target_card: null | ICard
}


export async function GetActiveTrades(userId: number): Promise<IRespone<ITrade[]>> {
    try {
        const res = await FetchMG.GET(`trades/${userId}`)
        const tradesRes = (res.data as { trades: ITradePesponse[] }).trades.map(v => ({
            id: v.id,
            creatorId: v.creator_id,
            creatorCard: v.creator_card,
            creatorCardId: v.creator_card_id,
            status: v.status
        }) as ITrade)
        console.log(JSON.stringify(res.data.trades))
        return { ok: true, data: tradesRes }
    }
    catch (error) {
        console.log(error)
        return { ok: false, data: [] }
    }
}


export async function GetMyTrades(userId: number): Promise<{ ok: boolean, trades: IMyTrade[] }> {
    try {
        const res = await FetchMG.GET(`trades/${userId}/my`)
        const tradesRes = (res.data as { trade: IMyTradeRepsonse[] }).trade.map(v => ({
            id: v.id,
            creatorId: v.creator_id,
            creatorCard: v.creator_card,
            creatorCardId: v.creator_card_id,
            status: v.status,
            targetCard: v.target_card,
            targetCardId: v.target_card_id,
            targetId: v.target_id
        }) as IMyTrade)
        console.log(JSON.stringify(res.data.trades))
        return { ok: true, trades: tradesRes }
    }
    catch (error) {
        console.log(error)
        return { ok: false, trades: [] }
    }
}

export async function CreateTrade(userId: number, cardId: number) {
    try {
        console.log(`trades/${userId}/${cardId}`)
        await FetchMG.POST(`trades/${userId}/${cardId}`)
        return true
    }
    catch (error) {
        return false
    }
}

export async function ResponsdToOffer(userId: number, tradeId: number, cardId: number): Promise<IRespone<string>> {
    try {
        console.log(`trades/${tradeId}/${userId}/${cardId}/offer`)
        await FetchMG.POST(`trades/${tradeId}/${userId}/${cardId}/offer`)
        return { ok: true, data: "Ответ на трейд успешен" }
    }
    catch (error) {
        return { ok: false, data: (error as IError).response.data.detail }
    }
}

export async function AcceptOrNoTheOffer(userId: number, tradeId: number, status: TTradeStatus) {
    try {
        await FetchMG.POST(`trades/${tradeId}/${status}/${userId}/respond`)
        return true
    }
    catch (error) {
        console.log(error)
        return false
    }
}

export async function DeleteTrade(tradeId: number, userId: number) {
    try {
        console.log(`trades/${tradeId}/${userId}`)
        await FetchMG.DELETE(`trades/${tradeId}/${userId}`)
        return true
    }
    catch (error) {
        console.log(error)
        return false
    }
}