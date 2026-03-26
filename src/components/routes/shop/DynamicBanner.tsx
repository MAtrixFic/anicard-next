'use client'
import { useMemo } from "react"
import { BannerSection, IBannerProps } from "./Bunner"
import { BACK_ORIGIN } from "@/components/server/fetches/env.config"
import { IPet } from "@/devs/store/PetsStore"

interface IDynamicBannerProps {
    buy: (count: number, pet: IPet & { id: number }) => void,
    offer: any;
}



const DynamicBanner = ({ buy, offer }: IDynamicBannerProps) => {
    if (!offer.data) return

    const cards = useMemo(() => (offer.data?.cards as IPet[]).map(v => ({
        src: `${BACK_ORIGIN}/${v.photo}`,
        name: `Пет ${v.rarity}`,
        cost: { count: v!.price, type: 'rubles' },
        card: {
            rarity: v.rarity,
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