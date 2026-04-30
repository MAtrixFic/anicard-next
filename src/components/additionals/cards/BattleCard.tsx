import Image from "next/image"
import { IPreviewSelectionCardProps } from "./PreviewSelectionCard"
import { IBattleCard } from "@/app/(battle)/battles/[battle-id]/fight/page"
import { BACK_ORIGIN } from "@/components/server/fetches/env.config"

const BattleCard = ({ setSelection, selectedCard, thisCard }: Omit<IPreviewSelectionCardProps, 'setSelection' | 'thisCard' | 'selectedCard'> & { setSelection?: (card: IBattleCard | null) => void, thisCard: IBattleCard, selectedCard: IBattleCard | null }) => {

    function SetStateOfCard() {
        if (setSelection)
            setSelection(thisCard.id === selectedCard?.id ? null : thisCard)
    }

    return (
        <li
            className={`battle-card card-${thisCard?.rarity.toLocaleLowerCase()} 
        ${!selectedCard ? 'deselected' : selectedCard.id == thisCard?.id ? 'selected' : 'deselected'}
        ${thisCard.health > 0 ? 'alive' : 'defeated'}
        `}
        >
            <button className="battle-card__active-container" onClick={SetStateOfCard}>
                <div className="battle-card__preview-container">
                    <Image height={140} width={60} quality={80} preload src={`${BACK_ORIGIN}/${thisCard.photo}`} alt={thisCard.photo} className="card__preview" />
                </div>
                <div className="battle-card__stats-container">
                    {thisCard &&
                        <>
                            <div className="battle-card__attack-block">
                                <div className="battle-card__stat">
                                    <span className="battle-card__stat-text">{thisCard.health}</span>
                                </div>
                                <div className="battle-card__stat" >
                                    <span className="battle-card__stat-text">{thisCard.damage}</span>
                                </div>
                            </div>
                            <div className="battle-card__stat">
                                <span className="battle-card__stat-text">{thisCard.attribute}</span>
                            </div>
                        </>
                    }
                </div>
            </button>
        </li>
    )
}

export default BattleCard
