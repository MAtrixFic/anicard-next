import useRivalStatsStore from "@/devs/store/RivalStatsStore";
import { GetUser, GetInventoryCards, GetOpponetData } from "@/components/server/comp/Apis";


export const useRivalStats = () => {
    const { score, setValue, battleHistory, cards } = useRivalStatsStore();

    async function GetOpData(opId: number) {
        const data = await GetOpponetData(opId);
        if (data) {
            setValue('battleHistory', data.battle_history)
            // setRivalValues('score', data.score)
            setValue('cards', data.user_cards)
        }
        console.log(data)
    }

    // return { GetOpData, opponentData }

    return { score, battleHistory, GetOpData, cards }
}