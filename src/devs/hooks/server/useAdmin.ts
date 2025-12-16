'use client'
import { ICard } from "@/components/additionals/Windows/CardGlobalChoiseList"
import { CookieGet } from "@/components/server/CookieManager"
import { AddCard, DeleteCard } from "@/components/server/comp/AdminApi"
import { useQueryClient } from "@tanstack/react-query"

export const useAdmin = () => {
    const queryClient = useQueryClient()

    async function AddAdminCard(card: Partial<Omit<ICard, 'id'>>) {
        const userId = await CookieGet('userId')
        if (userId) {
            const res = await AddCard(userId.value, card);
            if (res) queryClient.invalidateQueries({ queryKey: ['adminCards'] })
            return res
        }
        else return false
    }


    async function RemoveAdminCard(cardId: string) {
        const userId = await CookieGet('userId')
        if (userId) {
            const res = await DeleteCard(userId.value, cardId);
            if (res) queryClient.invalidateQueries({ queryKey: ['adminCards'] })
            return res
        }
        else return false
    }

    return { AddAdminCard, RemoveAdminCard }
}