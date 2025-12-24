import useRivalStatsStore from "@/devs/store/RivalStatsStore";
import { GetUser, IUserResponse } from "@/components/server/comp/UserApi";
import { GetInventoryCards } from "@/components/server/comp/InventoryApi";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { IAdminCardsResponse } from "@/components/server/comp/AdminApi";


export const useRivalStats = (rivalId: number) => {
    const getRivalValues = useRivalStatsStore(state => state.getValue);
    const setRivalValues = useRivalStatsStore(state => state.setValue);

    useEffect(() => {
        GetScore()
        GetCards()


    }, [])

    async function GetScore() {
        const data = await GetUser(rivalId.toString())
        if (data) {
            setRivalValues('score', (data as IUserResponse).user.rating)
        }
    }

    async function GetCards() {
        const data = await GetInventoryCards(rivalId.toString())
        if (data) {
            setRivalValues('cards', (data as IAdminCardsResponse).cards)
        }
    }

    return { getRivalValues, setRivalValues }
}