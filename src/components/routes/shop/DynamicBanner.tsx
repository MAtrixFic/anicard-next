'use client'
import { useMemo } from "react"
import { BannerSection, IBannerProps } from "./Bunner"
import { BACK_ORIGIN } from "@/components/server/fetches/env.config"
import { IPet } from "@/devs/store/PetsStore"
import { TPayment } from "@/components/server/comp/ShopApi"

interface IDynamicBannerProps {
    buy?: (...materials: any[]) => void
    offer: any;
    title: string,
    type: TPayment
}


export const DynamicBannerPets = ({ buy, offer, title, type }: IDynamicBannerProps) => {
    if (!offer) return

    const cards = useMemo(() => (offer.pets as IPet[]).map(v => ({
        src: `${BACK_ORIGIN}/${v.photo}`,
        name: `${v.character} <${v.rarity}>`,
        cost: { count: v!.price, type: type },
        material: {
            rarity: v.rarity,
            id: v.id
        },
        count: 1
    } as unknown as IBannerProps)), [offer.pets.length || 0])

    return (
        <BannerSection buy={buy} title={title} banners={cards} />
    )
}