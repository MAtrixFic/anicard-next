'use client'
import { BannerSection } from "@/components/routes/shop/Bunner"
import { DynamicBannerPets } from "@/components/routes/shop/DynamicBanner"
import { IPetWithId } from "@/components/routes/shop/Bunner"
import { useShop } from "@/devs/hooks/server/useShop"
import Link from "next/link"

import ExpSelector from "@/components/routes/shop/ExpSelector"
import useOverWindowStatus from "@/devs/hooks/useOverWindowStatus"
import { useState } from "react"

const Page = () => {
    const { TryBuyPet, TryBuyKeys, offer, TryBuyExp } = useShop()

    const [overW, setOverWS, SetWM] = useOverWindowStatus(300)
    const [sIndex, setSIndex] = useState<number>(0)

    function BuyPetByBattleCoins(pet: IPetWithId) {
        TryBuyPet(pet.id, 'battle_coins')
    }

    function BuyPetByRealMoney(pet: IPetWithId) {
        TryBuyPet(pet.id, 'real_money')
    }

    return (
        <div className="shop">
            <div className="shop__body">
                <section className="shop-top">
                    <Link href={'/twists'} className="shop-top__link">Крутки</Link>
                </section>
                <BannerSection buy={TryBuyKeys} title="Ключи" banners={[
                    { name: "Ключ", src: '/keys/crown-key.jpg', cost: { type: 'real_money', count: 100 }, count: 1, material: 1 },
                    { name: "Ключ", src: '/keys/crown-key.jpg', cost: { type: 'real_money', count: 300 }, count: 3, material: 3 },
                    { name: "Ключ", src: '/keys/crown-key.jpg', cost: { type: 'real_money', count: 600 }, count: 6, material: 6 },
                    { name: "Ключ", src: '/keys/crown-key.jpg', cost: { type: 'real_money', count: 1200 }, count: 12, material: 12 }
                ]} />
                <DynamicBannerPets type='real_money' title="Питомцы (за деньги)" offer={offer.data?.real_money} buy={BuyPetByRealMoney} />
                <DynamicBannerPets type='battle_coins' title="Питомцы (за боевые койны)" offer={offer.data?.battle_coins} buy={BuyPetByBattleCoins} />

                <BannerSection buy={(index: number) => { setSIndex(index); SetWM() }} title="Опыт" banners={[
                    { name: "Малый", src: '/keys/crown-key.jpg', cost: { type: 'real_money', count: 200 }, count: 50, material: 1 },
                    { name: "Средний", src: '/keys/crown-key.jpg', cost: { type: 'real_money', count: 1000 }, count: 250, material: 2 },
                ]} />
            </div>
            {['opened', 'to-hide'].includes(overW) &&
                <ExpSelector expIndex={sIndex} onAccept={TryBuyExp} closeWindow={SetWM} openedStatus={overW} />
            }
        </div>
    )
}
export default Page
