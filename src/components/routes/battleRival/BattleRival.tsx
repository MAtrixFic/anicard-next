import OverBlackSpace from "@/components/additionals/OverBlackSpace"
import LightButton from "@/components/additionals/buttons/LightButton";
import useOverWindowStatus from "@/devs/hooks/useOverWindowStatus";
import { useRivalStats } from "@/devs/hooks/server/useRivalStats";
import PreviewSelectionCard from "@/components/additionals/cards/PreviewSelectionCard";
import { CardDesctiption, ICard } from "@/components/additionals/Windows/CardGlobalChoiseList";
import useSelectionCard from "@/devs/hooks/useSelection"
import Image from "next/image";
import { useMemo, useState } from "react";
interface IBattleRivalProps {
    children: React.ReactNode;
    userId: number,
}

const BattleRival = ({ children, userId }: IBattleRivalProps) => {
    const [ws, setWS, setWSTimer] = useOverWindowStatus(400)
    const { setRivalValues, getRivalValues } = useRivalStats(userId)
    const [page, setPage] = useState<'cards' | 'battleHistory'>('cards');

    const pages = useMemo(() => ({
        cards: <RivalCards cards={getRivalValues('cards')} />,
        battleHistory: <RivalBattles score={getRivalValues('score')} />
    }), [page])

    return (
        <>
            <div className="empty" onClick={setWSTimer}>
                {children}
            </div>
            <OverBlackSpace additionStyle={ws}>
                <div className="rival-stats">
                    <div className="rival-stats__top">
                        <div className="rival-stats__container rival-stats__container-user">
                            <h2 className="rival-stats__username">
                                MAtrix
                            </h2>
                        </div>
                        <div className="rival-stats__container rival-stats__container-nav">
                            <button className={`rival-stats__nav-btn ${page == 'cards' ? 'active' : ""}`} onClick={() => setPage('cards')}>
                                Карты
                            </button>
                            <button className={`rival-stats__nav-btn ${page == 'battleHistory' ? 'active' : ""}`} onClick={() => setPage('battleHistory')}>
                                Бои
                            </button>
                        </div>
                    </div>
                    <div className="rival-stats__main">
                        {pages[page]}
                    </div>
                    <div className="rival-stats__other">
                        <LightButton additionStyle="purple" title={"Выйти"} func={() => setWS("to-hide")} />
                    </div>
                </div>
            </OverBlackSpace>
        </>
    )
}

const RivalCards = ({ cards }: { cards: ICard[] }) => {
    const [selectedCard, setSelectedCard] = useSelectionCard<ICard>()
    return (
        <div className="rival-inventory">
            {cards.map(v =>

                <PreviewSelectionCard
                    setSelection={setSelectedCard}
                    selectedCard={selectedCard}
                    thisCard={v} />
            )}
            <div className="rival-inventory__desc">
                {selectedCard && <CardDesctiption {...selectedCard} />}
            </div>
        </div>
    )
}


const RivalBattles = ({ score }: { score: number }) => {
    const [selectedCard, setSelectedCard] = useSelectionCard<ICard>()
    return (
        <div className="rival-battles">
            <section className="rival-battles__section rival-battles__section-score">
                <h2 className="rival-battles__score">
                    {/* <span className="tiny">счет</span> */}
                    {score}
                </h2>
            </section>
            <section className="rival-battles__section rival-battles__section-battles">
                <ul className="rival-battles__btl-list">
                    <li className="rival-battle">
                        <div className="rival-battle__user">
                            <Image
                                height={50}
                                width={50}
                                alt='user'
                                src={'/avatar/default-avatar.jpg'} />
                            <span className="rival-battle__name">Игрок 1</span>
                        </div>
                        <span className="rival-battle__vs">VS</span>
                        <div className="rival-battle__user">
                            <Image
                                height={50}
                                width={50}
                                alt='user'
                                src={'/avatar/default-avatar.jpg'} />
                            <span className="rival-battle__name winner">Игрок 2</span>
                        </div>
                    </li>
                </ul>
            </section>
        </div>
    )
}

export default BattleRival