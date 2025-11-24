import Image from "next/image";
import LightButton from "@/components/additionals/buttons/LightButton";
import { IShortCardInfo } from "@/components/additionals/Windows/CardGlobalChoiseList";

interface IBannerProps {
    src: string,
    name: string,
    card?: IShortCardInfo
    cost: {
        type: "rubles" | "pay-game-money" | "game-money";
        count: number
    }
    count: number
}

interface IBannerSectionProps {
    banners: IBannerProps[],
    title: string;
}


export const Bunner = ({ src, name, cost, card, count }: IBannerProps) => {
    return (
        <div className="banner">
            <div className="banner__view-block">
                <div className="banner__view-container">
                    <Image height={80} width={80} quality={60} preload src={src} alt="banner" className={`banner__view card-${card?.rang.toLocaleLowerCase()}`} />
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
                <LightButton title={'Купить'} additionStyle="green tiny" />
            </div>
        </div>
    )
}

export const BannerSection = ({ banners, title }: IBannerSectionProps) => {
    return (
        <section className="banner-section">
            <div className="banner-section__title-container">
                <h4 className="banner-section__title">
                    {title}
                </h4>
            </div>
            <div className="banner-section__list">
                {banners.map((v, i) =>
                    <Bunner key={i + v.name} {...v} />
                )}
            </div>

        </section>
    )
}
