import { useEffect, useState } from "react"
import { Plus } from "../../icons/Cards"
import { IPreviewSelectionCardProps } from "./PreviewSelectionCard";
import { IBattleCard } from "@/devs/store/BattleStore";

interface IPreviewCardProps extends Partial<Omit<IPreviewSelectionCardProps, 'selectedCard' | 'setSelection'>> {
    func?: () => void;
    deleteFunc?: () => void;
    activeElemenet?: React.ReactNode,
    setSelection?: (card: IBattleCard | null) => void,
}

const PreviewBattleCard = ({ func, thisCard, activeElemenet }: IPreviewCardProps) => {
    const [isSetCard, setIsSetCard] = useState<boolean>(false)

    useEffect(() => {
        setIsSetCard(thisCard?.photo ? true : false)
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