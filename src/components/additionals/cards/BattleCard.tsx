import { type ICard } from "../Windows/CardGlobalChoiseList"
import Image from "next/image"
import { IPreviewSelectionCardProps } from "./PreviewSelectionCard"
import { IBattleCard } from "@/devs/store/BattleStore"

const BattleCard = ({ setSelection, selectedCard, thisCard }: Omit<IPreviewSelectionCardProps, 'setSelection' | 'thisCard'> & { setSelection?: (card: IBattleCard | null) => void, thisCard: IBattleCard }) => {

    function SetStateOfCard() {
        if (setSelection)
            setSelection(thisCard.id === selectedCard?.id ? null : thisCard)
    }

    return (
        <li
            className={`card card-${thisCard?.rarity.toLocaleLowerCase()} 
        ${!selectedCard ? 'deselected' : selectedCard.id == thisCard?.id ? 'selected' : 'deselected'}
        ${thisCard.hp > 0 ? 'alive' : 'defeated'}
        `}

        >
            <button className="card__active-container" onClick={SetStateOfCard}>
                <div className="card__preview-container">
                    <Image height={140} width={60} quality={80} preload src={thisCard.photo} alt={thisCard.photo} className="card__preview" />
                </div>
                <div className="card__stats-container">
                    {thisCard.options &&
                        <>
                            <div className="card__stat">
                                <span className="card__stat-text">{thisCard.hp}</span>
                            </div>
                            <div className="card__stat" >
                                <span className="card__stat-text">{thisCard.options.rating}</span>
                            </div>
                            <div className="card__stat">
                                <span className="card__stat-text">{thisCard.options.attribute}</span>
                            </div>
                        </>
                    }
                </div>
            </button>
        </li>
    )
}

export default BattleCard
