'use client'

import Image from "next/image";
import LightButton from "@/components/additionals/buttons/LightButton";
import { IShortCardInfo } from "@/components/additionals/Windows/CardGlobalChoiseList";

export interface IBannerProps {
    src: string,
    name: string,
    card?: IShortCardInfo & { id: number }
    cost: {
        type: "rubles" | "pay-game-money" | "game-money";
        count: number
    }
    count: number,
    buy?: (count: number, card?: IShortCardInfo & { id: number }) => void
}

interface IBannerSectionProps {
    banners: IBannerProps[],
    title: string;
    buy: (count: number, card?: IShortCardInfo & { id: number }) => void
}


export const Bunner = ({ src, name, cost, card, count, buy }: IBannerProps) => {
    return (
        <div className="banner">
            <div className="banner__view-block">
                <div className="banner__view-container">
                    <Image height={80} width={80} quality={60} preload src={src} alt="banner" className={`banner__view`} />
                </div>
                <div className="banner__name-container">
                    <span className="banner__name">
                        {name}
                    </span>
                </div>
            </div>
            <div className="banner__count-container banner__count-container-normal">
                <span className="banner__count">
                    {cost.count} руб. / {count} шт.
                </span>
                <LightButton title={'Купить'} additionStyle="green-bevel tiny" func={() => buy!(count, card)} />
            </div>
        </div>
    )
}

export const BannerSection = ({ banners, title, buy }: IBannerSectionProps) => {
    return (
        <section className="banner-section">
            <div className="banner-section__title-container">
                <h4 className="banner-section__title">
                    {title}
                </h4>
            </div>
            <div className="banner-section__list">
                {banners.map((v, i) =>
                    <Bunner key={i + v.name} {...v} buy={buy} />
                )}
            </div>

        </section>
    )
}
