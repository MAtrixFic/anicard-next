import { type ICard } from "./CardGlobalChoiseList"

interface IPreviewSelectionCardProps {
    src: string,
    setSelection: (card: ICard | null) => void,
    selectedCard: ICard | null,
    thisCard: ICard
}

const PreviewSelectionCard = ({ src, setSelection, selectedCard, thisCard }: IPreviewSelectionCardProps) => {

    function SetStateOfCard() {
        setSelection(thisCard.id === selectedCard?.id ? null : thisCard)
    }

    return (
        <li className={`card ${!selectedCard ? 'deselected' : selectedCard.id == thisCard?.id ? 'selected' : 'deselected'}`}
        >
            <button className="card__active-container" onClick={SetStateOfCard}>
                <div className="card__preview-container">
                    <img src={src} alt={src} className="card__preview" />
                </div>
            </button>
        </li>
    )
}

export default PreviewSelectionCard
