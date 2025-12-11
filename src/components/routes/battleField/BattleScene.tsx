import { TBattleState, TSelectedBattleCard, TSelectionCardsArr } from "@/app/(battle)/battles/[battle-id]/fight/page";
import LightButton from "@/components/additionals/buttons/LightButton";
import BattleCard from "@/components/additionals/cards/BattleCard";
import FlipCard from "@/components/additionals/cards/FlipCard";
import PreviewBattleCard from "@/components/additionals/cards/PreviewBattleCard";

export interface IBattleSceneProps {
    selectionBattleCards: TSelectionCardsArr,
    setBattleCard: (index: number) => void;
    selectedCard: TSelectedBattleCard,
    setSelectedCard: (card: TSelectedBattleCard) => void;
    battleState: TBattleState,
    readyFunc: () => void;
    rivalCards: TSelectionCardsArr
}


const BattleScene = ({ battleState, readyFunc, rivalCards, selectionBattleCards, selectedCard, setSelectedCard, setBattleCard }: IBattleSceneProps) => {


    return (
        <div className="battle-scene">
            <div className="battle-scene__container battle-scene__container-battle">
                <div className="battle-scene__fight-container battle-scene__fight-container-rival">
                    <ul className="battle-scene__cards-list">
                        {new Array(3).fill(null).map((v, i) =>
                            <FlipCard
                                state={battleState === 'battle' ? 'no-flip' : 'flip'}
                                key={rivalCards[i] ? rivalCards[i].id : i}
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
                <LightButton
                    active={battleState === 'deployment'}
                    title="Бой"
                    additionStyle="green"
                    func={readyFunc}
                />
            </div>
        </div>
    )
}

export default BattleScene