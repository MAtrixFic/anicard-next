import OverBlackSpace from "@/components/additionals/OverBlackSpace"
import LightButton from "@/components/additionals/buttons/LightButton";
import useOverWindowStatus from "@/devs/hooks/useOverWindowStatus";
import { useRivalStats } from "@/devs/hooks/server/useRivalStats";
import PreviewSelectionCard, { BaseFrame } from "@/components/additionals/cards/PreviewSelectionCard";
import { CardDesctiption, ICard } from "@/components/additionals/Windows/CardGlobalChoiseList";
import useSelectionCard from "@/devs/hooks/useSelection"
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { IBattleStats } from "@/devs/store/RivalStatsStore";
interface IBattleRivalProps {
    children: React.ReactNode;
    name: string,
    userId: number,
}

const BattleRival = ({ children, userId,name }: IBattleRivalProps) => {
    const [ws, setWS, setWSTimer] = useOverWindowStatus(400)
    const { battleHistory, cards, GetOpData } = useRivalStats()
    const [page, setPage] = useState<'cards' | 'battleHistory'>('cards');

    const pages = useMemo(() => ({
        cards: <RivalCards cards={cards} />,
        battleHistory: <RivalBattles battles={battleHistory} />
    }), [page])

    useEffect(() => {
        if (userId > 0)
            GetOpData(userId)
    }, [userId])

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
                                {name}
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
                    key={v.id}
                    setSelection={setSelectedCard}
                    selectedCard={selectedCard}
                    thisCard={v} >
                    <BaseFrame
                        name={v.character!}
                        rating={v.rating.toString()}
                        attribute={v.attribute} 
                        rarity={v.rarity} 
                        university={v.universe} />
                </PreviewSelectionCard>

            )}
            {/* <div className="rival-inventory__desc">
                {selectedCard && <CardDesctiption {...selectedCard} />}
            </div> */}
        </div>
    )
}


const RivalBattles = ({ battles }: { battles: IBattleStats[] }) => {
    return (
        <div className="rival-battles">
            {/* <section className="rival-battles__section rival-battles__section-score"> */}
            {/* <h2 className="rival-battles__score"> */}
            {/* <span className="tiny">счет</span> */}
            {/* {score}
                </h2> */}
            {/* </section> */}
            <section className="rival-battles__section rival-battles__section-battles">
                <ul className="rival-battles__btl-list">
                    {battles.map((v, i) =>
                        <li key={i + v.user1_id} className="rival-battle">
                            <div className="rival-battle__user">
                                <Image
                                    height={50}
                                    width={50}
                                    alt='user'
                                    src={'/avatar/default-avatar.jpg'} />
                                <span className={`rival-battle__name ${v.winner_id === v.user1_id ? 'winner' : ''}`}>{v.user1_nickname}</span>
                            </div>
                            <span className="rival-battle__vs">VS</span>
                            <div className="rival-battle__user">
                                <Image
                                    height={50}
                                    width={50}
                                    alt='user'
                                    src={'/avatar/default-avatar.jpg'} />
                                <span className={`rival-battle__name ${v.winner_id === v.user2_id ? 'winner' : ''}`}>{v.user2_nickname}</span>
                            </div>
                        </li>
                    )}
                </ul>
            </section>
        </div>
    )
}

export default BattleRival