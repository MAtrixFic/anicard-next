'use client'
import PreviewSelectionCard from "@/components/additionals/cards/PreviewSelectionCard"
import useSelectionCard from "@/devs/hooks/useSelection"
import { CardDesctiption, ICard } from "@/components/additionals/Windows/CardGlobalChoiseList"
import { useState } from "react"
import { useCards } from "@/devs/hooks/server/useCards"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import useUpgrade from "@/devs/hooks/server/useUpgrade"
import { BaseFrame } from "@/components/additionals/cards/PreviewSelectionCard"
import CardsChoise from "@/components/additionals/cardsList/CardsChoise"
import { IPet } from "@/devs/store/PetsStore"
import { IElementUpgradeInfo } from "@/components/server/comp/UpgradeApi"

const Page = () => {
    const { getCards } = useCards()
    const [selectedCard, setSelectedCard] = useSelectionCard<ICard>()

    const [inventoryCards, setInventoryCards] = useState<ICard[]>([])

    useQuery({
        queryKey: ['allCards'],
        queryFn: async () => {
            const data = await getCards('allCards')
            setInventoryCards(data);
            return data
        }
    })

    return (
        <CardsChoise
            panel={selectedCard && <CardPanel selectedElement={selectedCard} >
                <UpgradePanel type="card" index={selectedCard.id} />
            </CardPanel>}
        >
            {
                inventoryCards.map((v) =>
                    <PreviewSelectionCard
                        key={v?.id}
                        setSelection={setSelectedCard}
                        selectedCard={selectedCard}
                        thisCard={v}

                    >
                        <BaseFrame university={v.universe} rarity={v.rarity} rating={v.rating.toString()} name="Рем" attribute={v.attribute} />
                    </PreviewSelectionCard>)}
        </CardsChoise >
    )
}

interface IUpgradePanelProps {
    type: 'card' | 'pet',
    index: number
}

export const UpgradePanel = ({ type, index }: IUpgradePanelProps) => {
    const { upgradedInfo, upgradeCard, upgradePet } = useUpgrade(type, index)
    const upgradedElement = (upgradedInfo as IElementUpgradeInfo)
    const clint = useQueryClient()


    if (!upgradedInfo) return

    async function Upgrade() {
        type === 'card' ? await upgradeCard(index) : await upgradePet(index)
        clint.invalidateQueries({ queryKey: [type, index] })
        // clint.invalidateQueries({ queryKey: ['allCards'] })
    }

    const ratio = (upgradedElement.current_copies / upgradedElement.copies_needed)
    const inProcess = upgradedElement.current_level < upgradedElement.max_level

    return (
        <div className="upgrade-panel">
            <div className="upgrade-panel__left-block">
                {upgradedElement &&
                    <>
                        {
                            inProcess &&
                            <div className="upgrade-panel__experience">
                                <div className="upgrade-panel__experience-indicator" style={{
                                    position: 'absolute',
                                    left: 0,
                                    top: 0,
                                    backgroundColor: 'rgba(36, 91, 55, 0.8)',
                                    borderRadius: '5px',
                                    borderRight: '1px solid #5BE98B',
                                    height: '100%',
                                    width: `${ratio * 100}%`
                                }} >
                                    {upgradedElement.current_copies}/{upgradedElement.copies_needed}
                                </div>
                            </div>
                        }
                        <div className="upgrade-panel__needed">
                            <div className="upgrade-panel__level">
                                Уровень: {upgradedElement.current_level}
                            </div>
                            {inProcess && <div className="upgrade-panel__cost">
                                Требуемые монеты: {upgradedElement.coin_cost}
                            </div>}
                        </div>
                    </>
                }
            </div>
            <div className="upgrade-panel__right-block">
                {inProcess && < button className="upgrade-panel__btn" onClick={Upgrade} disabled={ratio < 1}>
                    Обновить
                </button>
                }
            </div>
        </div >
    )
}

interface ICardPanelProps {
    selectedElement: ICard | IPet,
    children?: React.ReactNode
}

export const CardPanel = ({ selectedElement, children }: ICardPanelProps) => {
    return (
        < div className="cards-options">
            <div className="cards-options__manage">
                {children}
            </div>
            <div className="desc-panel">
                <CardDesctiption
                    {...selectedElement}
                />
            </div>
        </div>
    )
}

export default Page