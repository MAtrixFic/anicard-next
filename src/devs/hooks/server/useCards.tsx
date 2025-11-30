import { useCardsStore } from "@/devs/store/CardsStore"

export const useCards = () => {
    const setCards = useCardsStore(state => state.SetCards)
    const getCards = useCardsStore(state => state.GetCards)

    return { setCards, getCards }
}