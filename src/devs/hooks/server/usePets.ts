'use client'
import { DeleteInventoryPets, SetInventoryPets } from "@/components/server/comp/Apis"
import { TCardType } from "@/components/server/comp/InventoryApi"
import { usePetsStore } from "@/devs/store/PetsStore"
import { useQueryClient } from "@tanstack/react-query"
import useMessageStore from "@/devs/store/MessageStore"

const usePets = () => {
    const getPets = usePetsStore(state => state.GetPets)
    const { addMessage } = useMessageStore()
    // const queryClient = useQueryClient()


    async function SetInvPets(petsType: TCardType, petsIds: number[]) {
        const deleteRes = await DeleteInventoryPets(petsType)
        if (deleteRes) {
            const setRes = await SetInventoryPets(petsType, petsIds)
            if (setRes) addMessage({ text: 'Петы обновлены', type: 'message' })
            else addMessage({ text: 'Ошибка обновления', type: 'error' })
        }

        else addMessage({ text: 'Ошибка удаления', type: 'error' })

    }

    return { getPets, SetInvPets }
}

export default usePets

