import { type ICard } from "../Windows/CardGlobalChoiseList"
import Image from "next/image"
import { IPreviewSelectionCardProps } from "./PreviewSelectionCard"

const BattleCard = ({ setSelection, selectedCard, thisCard }: Omit<IPreviewSelectionCardProps, 'setSelection'> & { setSelection?: (card: ICard | null) => void }) => {

    function SetStateOfCard() {
        if (setSelection)
            setSelection(thisCard.id === selectedCard?.id ? null : thisCard)
    }

    return (
        <li
            className={`card card-${thisCard.rang.toLocaleLowerCase()} 
        ${!selectedCard ? 'deselected' : selectedCard.id == thisCard?.id ? 'selected' : 'deselected'}`}

        >
            <button className="card__active-container" onClick={SetStateOfCard}>
                <div className="card__preview-container">
                    <Image height={140} width={60} quality={80} preload src={thisCard.src} alt={thisCard.src} className="card__preview" />
                </div>
                <div className="card__stats-container">
                    {thisCard.options && Object.keys(thisCard.options).map((v, i) =>
                        <div className="card__stat">
                            <span className="card__stat-text">{thisCard.options![v].value}</span>
                        </div>
                    )}
                </div>
            </button>
        </li>
    )
}

export default BattleCard
