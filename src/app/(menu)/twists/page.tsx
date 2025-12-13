"use client"

import { useState } from "react"
import { createPortal } from "react-dom"
import useSwipeRight from "@/devs/hooks/useSwipe"
import useOverWindowStatus, { type TWindowStatus } from "@/devs/hooks/useOverWindowStatus"
import { Arrow } from "@/components/icons/Cards"
import Image from "next/image"
import { AddTwistCard } from "@/components/server/comp/InventoryApi"
import LightButton from "@/components/additionals/buttons/LightButton"
import { ICard } from "@/components/additionals/Windows/CardGlobalChoiseList"
import { useUser } from "@/devs/hooks/server/useUser"
import { useQueryClient } from "@tanstack/react-query"

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
    const [droppedCard, setDroppedCard] = useState<ICard | null>(null)
    const { data: user } = useUser(true)
    const client = useQueryClient()

    async function CreateTwist() {
        if (user) {
            await AddTwistCard(user.id.toString(), 'battle').then(data => data ? setDroppedCard(data) : undefined)
            await client.invalidateQueries({ queryKey: ['user'] })
        }
        SetTimerOpenMode()
    }

    return (
        <section className="twist-banner">
            <div className="twist-banner__purchase-block">
                <div className="twist-banner__free-container">
                    <LightButton title='Открыть' additionStyle="green" func={CreateTwist} />
                    <div className="twist-banner__info-container">
                        <span className="twist-banner__info">
                            Испытай удачу
                        </span>
                    </div>
                </div>
                {/* <div className="twist-banner__money-container">
                    <LightButton title='Купить' additionStyle="purple" />
                    <div className="twist-banner__info-container">
                        <span className="twist-banner__info">
                            1 ключ
                        </span>
                    </div>
                </div> */}
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