import { TSelectedBattleCard, TSelectionCardsArr } from "@/app/(battle)/battles/[battle-id]/fight/page";
import LightButton from "@/components/additionals/buttons/LightButton";
import BattleCard from "@/components/additionals/cards/BattleCard";
import FlipCard from "@/components/additionals/cards/FlipCard";
import PreviewBattleCard from "@/components/additionals/cards/PreviewBattleCard";

export interface IBattleSceneProps {
    battleState: string,
    rivalCards: TSelectedBattleCard[],
    selectionBattleCards: TSelectionCardsArr,
    setBattleCard: (index: number) => void;
    selectedCard: TSelectedBattleCard,
    setSelectedCard: (card: TSelectedBattleCard) => void;
}

const BattleScene = ({ battleState, rivalCards, selectionBattleCards, selectedCard, setSelectedCard, setBattleCard }: IBattleSceneProps) => {

    return (
        <div className="battle-scene">
            <div className="battle-scene__container battle-scene__container-battle">
                <div className="battle-scene__fight-container battle-scene__fight-container-rival">
                    <ul className="battle-scene__cards-list">
                        {new Array(3).fill(null).map((v, i) =>
                            <FlipCard
                                state={battleState === 'battle' ? 'no-flip' : 'flip'}
                                key={i}
                                element={
                                    rivalCards[i] === null ?
                                        <>?</> :
                                        <BattleCard
                                            thisCard={rivalCards[i]!}
                                            setSelection={undefined}
                                            selectedCard={null} />
                                }
                            />
                        )}
                    </ul>
                </div>
                <div className="battle-scene__fight-container battle-scene__fight-container-you">
                    <ul className="battle-scene__cards-list">
                        {selectionBattleCards.map((v, i) =>
                            <PreviewBattleCard
                                key={i}
                                thisCard={v || undefined}
                                func={() => setBattleCard(i)}
                                activeElemenet={selectionBattleCards[i] && <BattleCard
                                    thisCard={selectionBattleCards[i]}
                                    selectedCard={selectedCard}
                                    setSelection={setSelectedCard}
                                />}
                            />
                        )}
                    </ul>
                </div>
            </div>
            <div className="battle-scene__container battle-scene__container-manage">
                <LightButton active={battleState === 'waiting-battle'} title="Бой" additionStyle="green" />
            </div>
        </div>
    )
}

export default BattleScene