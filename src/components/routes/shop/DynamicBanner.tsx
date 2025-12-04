'use client'
import { useMemo } from "react"
import { BannerSection, IBannerProps } from "./Bunner"
import { useShop } from "@/devs/hooks/server/useShop"

const DynamicBanner = () => {
    const { offer } = useShop()

    const cards = useMemo(() => offer.data?.cards.map(v => ({
        src: `https://obviously-vocal-seagull.cloudpub.ru${v.photo}`,
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
                <BannerSection title="Специальные карты" banners={cards} />
            }
        </>
    )
}

export default DynamicBanner