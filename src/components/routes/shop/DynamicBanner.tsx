'use client'
import { useMemo } from "react"
import { BannerSection, IBannerProps } from "./Bunner"
import { ICard, IShortCardInfo } from "@/components/additionals/Windows/CardGlobalChoiseList"
import { BACK_ORIGIN } from "@/components/server/fetches/env.config"

interface IDynamicBannerProps {
    buy: (count: number, card?: IShortCardInfo & { id: number }) => void,
    offer: any;
}



const DynamicBanner = ({ buy, offer }: IDynamicBannerProps) => {
    if (!offer.data) return

    const cards = useMemo(() => (offer.data?.cards as ICard[]).map(v => ({
        src: `${BACK_ORIGIN}/${v.photo}`,
        name: `Карта ${v.rarity}`,
        cost: { count: v!.price, type: 'rubles' },
        card: {
            universe: v.universe,
            rating: v.rating,
            rarity: v.rarity,
            attribute: v.attribute,
            category: v.category,
            id: v.id
        },
        count: 1
    } as unknown as IBannerProps)), [offer.data?.cards.length || 0])

    return (
        <>
            {cards &&
                <BannerSection buy={buy} title="Специальные карты" banners={cards} />
            }
        </>
    )
}

export default DynamicBanner