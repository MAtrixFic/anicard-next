import { GetUser } from "@/components/server/comp/UserApi";
import { CookieGet } from "@/components/server/CookieManager";
import { useQuery } from "@tanstack/react-query";
import { TCardType } from "@/components/server/comp/InventoryApi";
import { GetCards } from "@/components/server/comp/InventoryApi";

export const useCards = () => {
    async function CardsGet(cardType?: TCardType) {
        const userId = await CookieGet('userId')
        if (userId) {
            return await GetCards(userId.value, cardType)
        }
        else false
    }

    async function CardAdd() {
        
    }
}