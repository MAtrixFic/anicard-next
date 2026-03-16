'use client'
import { CookieGet } from "@/components/server/CookieManager"
import { DeleteCard } from "@/components/server/comp/Apis"
import { useQueryClient } from "@tanstack/react-query"
import { BACK_ORIGIN } from "@/components/server/fetches/env.config"



export const useAdmin = () => {
    const queryClient = useQueryClient()
    async function AddAdminCard(card: any) {
        try {
            let res = await fetch(`${BACK_ORIGIN}/admin/cards`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(card)
            });
            alert(res)
            if (res) queryClient.invalidateQueries({ queryKey: ['adminCards'] })
            return res

        }
        catch (ex) {
            alert(ex)
            return false
        }

    }

    async function AddAdminPets(card: any) {
        try {
            let res = await fetch(`${BACK_ORIGIN}/admin/pets`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(card)
            });
            alert(res)
            if (res) queryClient.invalidateQueries({ queryKey: ['adminCards'] })
            return res

        }
        catch (ex) {
            alert(ex)
            return false
        }

    }


    async function RemoveAdminCard(cardId: string) {
        const userId = await CookieGet('userId')
        if (userId) {
            const res = await DeleteCard(cardId);
            if (res) queryClient.invalidateQueries({ queryKey: ['adminCards'] })
            return res
        }
        else return false
    }

    return { AddAdminCard, RemoveAdminCard, AddAdminPets }
}