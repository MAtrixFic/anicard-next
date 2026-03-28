'use client'
import { useMemo } from "react"
import { BannerSection, IBannerProps } from "./Bunner"
import { BACK_ORIGIN } from "@/components/server/fetches/env.config"
import { IPet } from "@/devs/store/PetsStore"

interface IDynamicBannerProps<T extends { id: number }> {
    buy?: (count: number, material?: T) => void
    offer: any;
    title: string
}


const DynamicBanner = ({ buy, offer, title }: IDynamicBannerProps<IPet>) => {
    if (!offer.data) return

    const cards = useMemo(() => (offer.data?.pets as IPet[]).map(v => ({
        src: `${BACK_ORIGIN}/${v.photo}`,
        name: `${v.character} <${v.rarity}>`,
        cost: { count: v!.price, type: 'rubles' },
        material: {
            rarity: v.rarity,
            id: v.id
        },
        count: 1
    } as unknown as IBannerProps<IPet>)), [offer.data?.pets.length || 0])

    return (
        <>
            {cards &&
                <BannerSection buy={buy} title={title} banners={cards} />
            }
        </>
    )
}

export default DynamicBanner