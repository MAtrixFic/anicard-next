'use client'
import { DeleteCard, DeletePet } from "@/components/server/comp/Apis"
import { useQueryClient } from "@tanstack/react-query"



export const useAdmin = () => {
    const queryClient = useQueryClient()
    async function AddAdminCard(card: any) {
        console.log(card)
        try {
            let res = await fetch(`https://74h98gnp-3000.euw.devtunnels.ms/api/admin/cards`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify(card)
            });
            alert(res.json())
            if (res) queryClient.invalidateQueries({ queryKey: ['adminCards'] })
            return res

        }
        catch (ex) {
            console.log(ex)
            return false
        }

    }

    async function AddAdminPets(pet: any) {
        console.log(pet)
        try {
            let res = await fetch(`https://74h98gnp-3000.euw.devtunnels.ms/api/admin/pets`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify(pet)
            });
            alert(res.json())
            if (res) queryClient.invalidateQueries({ queryKey: ['adminPets'] })
            return res

        }
        catch (ex) {
            console.log(ex)
            return false
        }

    }


    async function RemoveAdminCard(cardId: string) {
        const res = await DeleteCard(cardId);
        if (res) queryClient.invalidateQueries({ queryKey: ['adminCards'] })
        return res
    }

    async function RemoveAdminPet(cardId: string) {
        const res = await DeletePet(cardId);
        if (res) queryClient.invalidateQueries({ queryKey: ['adminPets'] })
    }

    return { AddAdminCard, RemoveAdminCard, AddAdminPets, RemoveAdminPet }
}