'use client'
import { ICard } from "@/components/additionals/Windows/CardGlobalChoiseList"
import { CookieGet } from "@/components/server/CookieManager"
import { AddCard } from "@/components/server/comp/AdminApi"

export const useAdmin = () => {
    async function AddAdminCard(card: Omit<ICard, 'id'> & { price: number }) {
        const userId = await CookieGet('userId')
        if (userId) {
            return await AddCard(userId.value, card);
        }
        else return false
    }


    async function RemoveAdminCard(cardId: string) {

    }

    return { AddAdminCard, RemoveAdminCard }
}