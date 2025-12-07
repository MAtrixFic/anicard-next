import { type ICard } from "../Windows/CardGlobalChoiseList"
import Image from "next/image"
import { IPreviewSelectionCardProps } from "./PreviewSelectionCard"
import { IBattleCard } from "@/devs/store/BattleStore"

const BattleCard = ({ setSelection, selectedCard, thisCard }: Omit<IPreviewSelectionCardProps, 'setSelection' | 'thisCard' | 'selectedCard'> & { setSelection?: (card: IBattleCard | null) => void, thisCard: IBattleCard, selectedCard: IBattleCard | null }) => {

    function SetStateOfCard() {
        if (setSelection)
            setSelection(thisCard.id === selectedCard?.id ? null : thisCard)
    }

    return (
        <li
            className={`card card-${thisCard?.rarity.toLocaleLowerCase()} 
        ${!selectedCard ? 'deselected' : selectedCard.id == thisCard?.id ? 'selected' : 'deselected'}
        ${thisCard.health > 0 ? 'alive' : 'defeated'}
        `}

        >
            <button className="card__active-container" onClick={SetStateOfCard}>
                <div className="card__preview-container">
                    <Image height={140} width={60} quality={80} preload src={`https://obviously-vocal-seagull.cloudpub.ru${thisCard.photo}`} alt={thisCard.photo} className="card__preview" />
                </div>
                <div className="card__stats-container">
                    {thisCard &&
                        <>
                            <div className="card__stat">
                                <span className="card__stat-text">{thisCard.health}</span>
                            </div>
                            <div className="card__stat" >
                                <span className="card__stat-text">{thisCard.damage}</span>
                            </div>
                            <div className="card__stat">
                                <span className="card__stat-text">{thisCard.attribute}</span>
                            </div>
                        </>
                    }
                </div>
            </button>
        </li>
    )
}

export default BattleCard
