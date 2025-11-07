import { useState, useEffect } from "react"

const useSelection = <T extends { id: number }>(overInputDeselect: boolean = true, targetList: string = '.cards-choise__list'): [T | null, (selectedCard: T | null) => void] => {
    const [selected, setSelected] = useState<T | null>(null)
    useEffect(() => {
        if (!overInputDeselect) {
            function DeselectCard(e: Event) {
                if (selected?.id && e.target === e.currentTarget) setSelected(null);
            }
            const listElement = document.querySelector(targetList);
            listElement?.addEventListener('click', DeselectCard)

            return () => listElement?.removeEventListener('click', DeselectCard)
        }
    }, [selected?.id])

    return [selected, setSelected]
}

export default useSelection