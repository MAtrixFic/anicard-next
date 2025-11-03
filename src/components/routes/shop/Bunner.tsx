import Image from "next/image";

interface IBannerProps {
    src: string,
    name: string,
    cost: {
        type: "rubles" | "pay-game-money" | "game-money";
        count: number
    }
}

interface IBannerSectionProps {
    banners: IBannerProps[],
    title: string;
}


export const Bunner = ({ src, name, cost }: IBannerProps) => {
    return (
        <div className="banner">
            <div className="banner__view-block">
                <div className="banner__view-container">
                    <Image height={80} width={80} quality={40} src={src} alt="banner" className="banner__view" />
                </div>
                <div className="banner__name-container">
                    <span className="banner__name">
                        {name}
                    </span>
                </div>
            </div>
            <div className="banner__count-container">
                <span className="banner__count">
                    {cost.count}
                </span>
                <button className="banner__btn">Купить</button>
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
                    <Bunner key={i + v.name} name={v.name} src={v.src} cost={v.cost} />
                )}
            </div>

        </section>
    )
}
