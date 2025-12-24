"use client"

import { useMemo, useState } from "react"
import { createPortal } from "react-dom"
import useSwipeRight from "@/devs/hooks/useSwipe"
import useOverWindowStatus, { type TWindowStatus } from "@/devs/hooks/useOverWindowStatus"
import { Arrow } from "@/components/icons/Cards"
import Image from "next/image"
import LightButton from "@/components/additionals/buttons/LightButton"
import { ICard } from "@/components/additionals/Windows/CardGlobalChoiseList"
import useTwists from "@/devs/hooks/server/useTwists"

const Twists = () => {
    return (
        <div className="twists">
            <div className="twists__body">
                <TwistBanner />
            </div>
        </div>
    )
}


export const TwistBanner = () => {
    const [openTwist, setOpenTwist, SetTimerOpenMode] = useOverWindowStatus(400);
    const { droppedCard, CreateBattleTwist, CreateCollectibleTwist, user } = useTwists();

    const twists = useMemo(() => ({
        'Боевые': CreateBattleTwist,
        'Коллекционные': CreateCollectibleTwist
    }), [])
    const [openTwistChpice, setOpenTwistChoice] = useState<boolean>(false)
    const [activeTwist, setActiveTwist] = useState<keyof typeof twists>('Боевые')

    return (
        <section className="twist-banner">
            <div className="twist-banner__purchase-block">
                <div className="twist-banner__container">
                    <LightButton title='Открыть' additionStyle="green" func={() => { twists[activeTwist](SetTimerOpenMode) }} />
                    <div className="twist-banner__info-container">
                        <span className="twist-banner__info" onClick={() => setOpenTwistChoice(!openTwistChpice)}>
                            {activeTwist}
                        </span>
                        {openTwistChpice && <div className="twist-banner__choice">
                            {Object.keys(twists).map(v =>
                                <span className="twist-banner__choice-el" key={v} onClick={() => {
                                    setActiveTwist(v as keyof typeof twists)
                                    setOpenTwistChoice(false)
                                }}>
                                    {v}
                                </span>)}
                        </div>}
                    </div>
                </div>
            </div>
            <div className="twist-banner__twist-container">
                <Image height={600} priority width={800} src="/cards/cards-package.png" alt="" className={`twist-banner__twist ${openTwist == 'opened' ? 'stop' : 'play'}`} />
            </div>
            {['opened', 'to-hide'].includes(openTwist) && droppedCard && createPortal(<TwistWindow card={droppedCard} windowMode={openTwist} setOpenWindow={SetTimerOpenMode} />, document.body)}
        </section>
    )
}

interface ITwistWindowProps {
    setOpenWindow: () => void;
    windowMode: TWindowStatus,
    card: ICard
}

const TwistWindow = ({ setOpenWindow, windowMode, card }: ITwistWindowProps) => {
    const [openCardMode, setOpenCardMode] = useState<'locked' | 'opened' | 'hidden'>('locked');
    const { handlers } = useSwipeRight({ onSwipeRight: () => OpenCardPackage(), minDistance: 200 });

    function OpenCardPackage() {
        if (openCardMode === 'locked') {
            setOpenCardMode('opened')
            setTimeout(() => {
                setOpenCardMode('hidden')
            }, 4600)
        }
    }

    return (
        <div className={`twist ${windowMode}`}>
            <div className="twist__container">
                <div className="twist__body">
                    <div className="twist__package-container" {...handlers}>
                        <Image height={720} width={800} quality={60} priority src={'/cards/cards-package-preview.png'} alt="" className={`twist__package-img ${openCardMode === 'locked' ? 'open' : 'lock'}`} />
                        <Image height={720} unoptimized width={800} priority src={'/animation/card-open.gif'} alt="" className={`twist__package-img ${openCardMode === 'opened' ? 'open' : 'lock'}`} />
                        {openCardMode === 'locked' && <div className="cat-line">
                            <div className="cat-line__arrows-block">
                                <Arrow />
                                <Arrow />
                                <Arrow />
                            </div>
                        </div>}
                        <div className={`twist__card-container ${openCardMode}`}>
                            <div className={`twist__dropped-card twist__dropped-card-${card.rarity.toLocaleLowerCase()}`}>
                                <Image height={300} width={180} src={`https://obviously-vocal-seagull.cloudpub.ru${card.photo}`} alt="dropped-card" className="twist__card-img" />
                            </div>
                        </div>
                    </div>
                </div>
                {openCardMode === 'hidden' && <div className="twist__panel">
                    <button className="twist__btn" onClick={setOpenWindow}>
                        Забрать
                    </button>
                </div>}
            </div>
        </div>

    )
}

export default Twists