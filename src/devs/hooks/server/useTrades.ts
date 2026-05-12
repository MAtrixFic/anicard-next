'use client'
import { GetMyTrades, GetActiveTrades, AcceptOrNoTheOffer, ResponsdToOffer, DeleteTrade, CreateTrade, TTradeStatus, } from "@/components/server/comp/TradesApi"
import useMessageStore from "@/devs/store/MessageStore"
import { useUserStore } from "@/devs/store/UserStore"
import { useQueryClient } from "@tanstack/react-query"

export const useTrades = () => {
    const getValue = useUserStore(state => state.getUserValues)
    const addMessage = useMessageStore(state => state.addMessage)
    const queryClient = useQueryClient()

    async function getMyTrades() {
        const res = await GetMyTrades();
        return res.trades
    }

    async function getActiveTrades() {
        const res = await GetActiveTrades();
        return res.data
    }

    async function createTrade(cardId: number) {
        const res = await CreateTrade(cardId);
        console.log(res)
        if (res) addMessage({ text: 'Трейд успешно создан', type: 'message' })
        else addMessage({ text: 'Ошибка создания трейда', type: 'error' })
    }

    async function acceptOrNoTheOffer(tradeId: number, status: TTradeStatus) {
        const res = await AcceptOrNoTheOffer(tradeId, status);
        console.log(tradeId, status)
        console.log(res)
        if (res) addMessage({ text: 'Операция успешное завершилась', type: 'message' })
        else addMessage({ text: 'Ошибка завершения', type: 'error' })
        queryClient.invalidateQueries({ queryKey: ['my-trades'] })
    }

    async function responsdToOffer(tradeId: number, cardId: number) {
        const res = await ResponsdToOffer(tradeId, cardId);
        if (res.ok) addMessage({ text: res.data, type: 'message' })
        else addMessage({ text: res.data, type: 'error' })
        queryClient.invalidateQueries({ queryKey: ['my-trades'] })
        queryClient.invalidateQueries({ queryKey: ['other-trades'] })
    }


    async function deleteTrade(tradeId: number) {
        const res = await DeleteTrade(tradeId, await getValue('id'))
        console.log(res)
        if (res) addMessage({ text: 'Трейд успешно удален', type: 'message' })
        else addMessage({ text: 'Ошибка удаления трейда', type: 'error' })
        queryClient.invalidateQueries({ queryKey: ['my-trades'] })
    }

    return { getActiveTrades, getMyTrades, createTrade, deleteTrade, responsdToOffer, acceptOrNoTheOffer }
}