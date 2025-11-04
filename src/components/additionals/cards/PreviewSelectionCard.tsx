import { type ICard } from "./CardGlobalChoiseList"
import Image from "next/image"

interface IPreviewSelectionCardProps {
    setSelection: (card: ICard | null) => void,
    selectedCard: ICard | null,
    thisCard: ICard
}

const PreviewSelectionCard = ({ setSelection, selectedCard, thisCard }: IPreviewSelectionCardProps) => {

    function SetStateOfCard() {
        setSelection(thisCard.id === selectedCard?.id ? null : thisCard)
    }

    return (
        <li className={`card card-${thisCard.rang.toLocaleLowerCase()} ${!selectedCard ? 'deselected' : selectedCard.id == thisCard?.id ? 'selected' : 'deselected'}`}
        >
            <button className="card__active-container" onClick={SetStateOfCard}>
                <div className="card__preview-container">
                    <Image height={140} width={60} preload src={`/${thisCard.src}`} alt={thisCard.src} className="card__preview" />
                </div>
            </button>
        </li>
    )
}

export default PreviewSelectionCard
