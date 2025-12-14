'use client'
import { useUserStore } from "@/devs/store/UserStore"
import { useCallback } from "react"
import useBattleSocketStore from "@/devs/store/BattleSocketStore"

const useBattleSocket = () => {
    const getValue = useUserStore(state => state.getUserValues)
    const ws = useBattleSocketStore(state => state.WS);
    const battleId = useBattleSocketStore(state => state.battleId);
    const players = useBattleSocketStore(state => state.players);
    const environment = useBattleSocketStore(state => state.environment);
    const setWSValue = useBattleSocketStore(state => state.setValue);
    const weather = useBattleSocketStore(state => state.weather);
    const location = useBattleSocketStore(state => state.location);

    const CreateWS = useCallback(async () => {
        if (ws) return
        else {
            const localWS = new WebSocket(`https://obviously-vocal-seagull.cloudpub.ru/battle/ws/${await getValue('id')}`)
            setWSValue('WS', localWS)
        }
    }, [ws])

    const CloseWS = useCallback(() => {
        ws?.close()
        setWSValue('WS', undefined)
    }, [ws])

    return { ws, CreateWS, CloseWS, setWSValue, environment, players, battleId, weather, location }
}

export default useBattleSocket