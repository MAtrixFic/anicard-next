'use client'

import Image from "next/image";
import LightButton from "@/components/additionals/buttons/LightButton";
import { IPet } from "@/devs/store/PetsStore";

export interface IBannerProps<T extends { id: number }> {
    src: string,
    name: string,
    material?: T
    cost: {
        type: "rubles" | "pay-game-money" | "game-money";
        count: number
    }
    count: number,
    buy?: (count: number, material?: T) => void
}

interface IBannerSectionProps<T> {
    banners: IBannerProps<IPet>[],
    title: string;
    buy?: (count: number, material?: T) => void
}


export interface IPetWithId extends IPet {
    id: number
}

export const Bunner = ({ src, name, cost, material, count, buy }: IBannerProps<IPet>) => {
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
                <LightButton title={'Купить'} additionStyle="dark tiny" func={() => buy!(count, material)} />
            </div>
        </div>
    )
}

export const BannerSection = ({ banners, title, buy }: IBannerSectionProps<IPet>) => {
    return (
        <section className="banner-section">
            <div className="banner-section__title-container">
                <h4 className="banner-section__title">
                    {title}
                </h4>
            </div>
            <div className="banner-section__list">
                {banners.map((v, i) =>
                    <Bunner key={i + v.name} material={v.material} {...v} buy={buy} />
                )}
            </div>

        </section>
    )
}
