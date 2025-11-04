import { useState, useEffect } from "react"
import { ICard } from '@/components/additionals/cards/CardGlobalChoiseList'

const useSelectionCard = (): [ICard | null, (selectedCard: ICard | null) => void] => {
    const [selectedCard, setSelectedCard] = useState<ICard | null>(null)
    useEffect(() => {
        function DeselectCard(e: Event) {
            if (selectedCard?.id && e.target === e.currentTarget) setSelectedCard(null);
        }
        const listElement = document.querySelector('.cards-choise__list');
        listElement?.addEventListener('click', DeselectCard)

        return () => listElement?.removeEventListener('click', DeselectCard)
    }, [selectedCard?.id])

    return [selectedCard, setSelectedCard]
}

export default useSelectionCard