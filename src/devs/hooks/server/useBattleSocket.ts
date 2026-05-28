'use client'
import { useUserStore } from "@/devs/store/UserStore"
import { useCallback } from "react"
import useBattleSocketStore from "@/devs/store/BattleSocketStore"
import { BACK_ORIGIN, BACK_SOCKET } from "@/components/server/fetches/env.config"
import { CookieGet } from "@/components/server/CookieManager"
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies"

const useBattleSocket = () => {
    const getValue = useUserStore(state => state.getUserValues)
    const ws = useBattleSocketStore(state => state.WS);
    const battleId = useBattleSocketStore(state => state.battleId);
    const players = useBattleSocketStore(state => state.players);
    const environment = useBattleSocketStore(state => state.environment);
    const setWSValue = useBattleSocketStore(state => state.setValue);
    const opponentId = useBattleSocketStore(state => state.opponentId);
    const weather = useBattleSocketStore(state => state.weather);
    const location = useBattleSocketStore(state => state.location);

    const CreateWS = useCallback(async () => {
        if (ws) return
        else {
            const accessToken = await CookieGet('access_token') as RequestCookie;
            const localWS = new WebSocket(`${BACK_SOCKET}/battle/ws?access_token=${accessToken.value}`,)
            setWSValue('WS', localWS)
        }
    }, [ws])

    const CloseWS = useCallback(() => {
        ws?.close()
        setWSValue('WS', undefined)
    }, [ws])

    return { ws, CreateWS, CloseWS, setWSValue, environment, players, battleId, weather, location, opponentId }
}

export default useBattleSocket