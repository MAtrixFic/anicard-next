"use client"

import { useState } from "react"
import { createPortal } from "react-dom"
import useSwipeRight from "@/devs/hooks/useSwipe"
import useOverWindowStatus, { type TWindowStatus } from "@/devs/hooks/useOverWindowStatus"
import { Arrow } from "@/components/icons/Cards"
import Image from "next/image"
import { IValueInfoProps, ValueInfo } from "@/components/routes/shop/ValueInfo"

const Twists = () => {
    return (
        <div className="twists">
            <div className="twists__body">
                <TwistBanner />
            </div>
        </div>
    )
}

interface IKeysListProps {
    keys: IValueInfoProps[]
}
export const KeysList = ({ keys }: IKeysListProps) => {
    return (
        <div className="keys__list-container">
            <div className="keys__list">
                {keys.map((v, i) => <ValueInfo {...v} key={i + v.name} />)}
            </div>
        </div>
    )
}


export const TwistBanner = () => {
    const [openTwist, setOpenTwist, SetTimerOpenMode] = useOverWindowStatus(400);


    return (
        <section className="twist-banner">
            <div className="twist-banner__purchase-block">
                <div className="twist-banner__free-container">
                    <button className="twist-banner__btn twist-banner__btn-open-case" onClick={SetTimerOpenMode}>
                        Открыть
                    </button>
                    <div className="twist-banner__info-container">
                        <span className="twist-banner__info">
                            Следующий через 3 часа
                        </span>
                    </div>
                </div>
                <div className="twist-banner__money-container">
                    <button className="twist-banner__btn">
                        Купить
                    </button>
                    <div className="twist-banner__info-container">
                        <span className="twist-banner__info">
                            1 ключ
                        </span>
                    </div>
                </div>
            </div>
            <div className="twist-banner__twist-container">
                <Image height={600} width={800} src="/cards/cards-package.png" alt="" className={`twist-banner__twist ${openTwist == 'opened' ? 'stop' : 'play'}`} />
            </div>
            {['opened', 'to-hide'].includes(openTwist) && createPortal(<TwistWindow windowMode={openTwist} setOpenWindow={SetTimerOpenMode} />, document.body)}
        </section>
    )
}

interface ITwistWindowProps {
    setOpenWindow: () => void;
    windowMode: TWindowStatus
}

const TwistWindow = ({ setOpenWindow, windowMode }: ITwistWindowProps) => {
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
                        <Image height={720} width={800} preload quality={60} src={'/cards/cards-package-preview.png'} alt="" className={`twist__package-img ${openCardMode === 'locked' ? 'open' : 'lock'}`} />
                        <Image height={720} quality={60} preload width={800} src={'/animation/card-open.gif'} alt="" className={`twist__package-img ${openCardMode === 'opened' ? 'open' : 'lock'}`} />
                        {openCardMode === 'locked' && <div className="cat-line">
                            <div className="cat-line__arrows-block">
                                <Arrow />
                                <Arrow />
                                <Arrow />
                            </div>
                        </div>}
                        <div className={`twist__card-container ${openCardMode}`}>
                            <div className="twist__dropped-card">
                                <Image height={300} preload width={180} src={'/Senko.jpg'} alt="dropped-card" className="twist__card-img" />
                            </div>
                            <div className="twist__card-name-container">
                                <h4 className="twist__card-name">
                                    Senko
                                </h4>
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