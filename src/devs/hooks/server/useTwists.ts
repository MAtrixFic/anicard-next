import { useQueryClient } from "@tanstack/react-query"
import useMessageStore from "@/devs/store/MessageStore";
import { useUser } from "./useUser";
import { AddTwistCard } from "@/components/server/comp/InventoryApi";
import { useState } from "react";
import { ICard } from "@/components/additionals/Windows/CardGlobalChoiseList";

const useTwists = () => {
    const queryClient = useQueryClient();
    const addMessage = useMessageStore(state => state.addMessage)
    const [droppedCard, setDroppedCard] = useState<ICard | null>(null)
    const { data: user } = useUser()
    console.log(user, 'user in twists hook')


    async function CreateBattleTwist(onGetTwist: () => void) {
        if (user) {
            const res = await AddTwistCard(user.id.toString(), 'battle')
            if (res.ok) {
                await queryClient.invalidateQueries({ queryKey: ['user'] })
                setDroppedCard(res.data)
                onGetTwist()
            }
            else addMessage({ text: res.data, type: 'error' })
        }
    }

    async function CreateCollectibleTwist(onGetTwist: () => void) {
        if (user) {
            const res = await AddTwistCard(user.id.toString(), 'collectible')
            if (res.ok) {
                setDroppedCard(res.data)
                onGetTwist()
            }
            else addMessage({ text: res.data, type: 'error' })
        }
    }

    return { CreateBattleTwist, CreateCollectibleTwist, user, droppedCard }
}

export default useTwists