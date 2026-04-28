'use client'

import Image from "next/image";
import LightButton from "@/components/additionals/buttons/LightButton";
import { TPayment } from "@/components/server/comp/ShopApi";
import { IPet } from "@/devs/store/PetsStore";

export interface IBannerProps {
    src: string,
    name: string,
    material?: any
    cost: {
        type: TPayment;
        count: number
    }
    count: number,
    buy?: (...materials: any) => void
}

interface IBannerSectionProps {
    banners: IBannerProps[],
    title: string;
    buy?: (...materials: any) => void
}

export interface IPetWithId extends IPet {
    id: number
}

export const PaymentOutput: { [k in TPayment]: string } = {
    real_money: 'руб.',
    keys: 'ключ.',
    battle_coins: 'б. коины'
}

export const Bunner = ({ src, name, cost, material, count, buy }: IBannerProps) => {
    return (
        <div className="banner">
            <div className="banner__view-block">
                <div className="banner__view-container">
                    <Image height={80} width={80} quality={40} preload src={src} alt="banner" className={`banner__view`} />
                </div>
                <div className="banner__name-container">
                    <span className="banner__name">
                        {name}
                    </span>
                </div>
            </div>
            <div className="banner__count-container banner__count-container-normal">
                <span className="banner__count">
                    {cost.count} {PaymentOutput[cost.type]} / {count} шт.
                </span>
                <LightButton title={'Купить'} additionStyle="dark tiny" func={() => buy!(material)} />
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
                    <Bunner key={i + v.name} material={v.material} {...v} buy={buy} />
                )}
            </div>

        </section>
    )
}
