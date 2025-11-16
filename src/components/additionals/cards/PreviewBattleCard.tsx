import { useEffect, useState } from "react"
import { Plus } from "../../icons/Cards"
import { IPreviewSelectionCardProps } from "./PreviewSelectionCard";

interface IPreviewCardProps extends Partial<Omit<IPreviewSelectionCardProps, 'selectedCard'>> {
    func?: () => void;
    deleteFunc?: () => void;
    activeElemenet?: React.ReactNode
}

const PreviewBattleCard = ({ func, deleteFunc, thisCard, setSelection, activeElemenet }: IPreviewCardProps) => {
    const [isSetCard, setIsSetCard] = useState<boolean>(false)

    useEffect(() => {
        setIsSetCard(thisCard?.src ? true : false)
    }, [thisCard])

    return (
        <section className={`preview-battle-card`}>
            {!isSetCard ?
                <button className="preview-battle-card__set-btn" onClick={func}>
                    <div className="card__set-container">
                        <Plus />
                    </div>
                </button>
                :
                activeElemenet
            }
        </section>
    )
}
export default PreviewBattleCard