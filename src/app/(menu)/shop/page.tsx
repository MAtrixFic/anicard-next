'use client'
import { BannerSection } from "@/components/routes/shop/Bunner"
import DynamicBanner from "@/components/routes/shop/DynamicBanner"
import { useShop } from "@/devs/hooks/server/useShop"
import Link from "next/link"
import { IPetWithId } from "@/components/routes/shop/Bunner"

const Page = () => {
    const { TryBuyPet, TryBuyKeys, offer } = useShop()

    function BuyFunc(count: number, pet?: IPetWithId) {
        if (pet) TryBuyPet(pet.id)
        else TryBuyKeys(count)
    }
    return (
        <div className="shop">
            <div className="shop__body">
                <section className="shop-top">
                    <Link href={'/twists'} className="shop-top__link">Крутки</Link>
                </section>
                <BannerSection buy={BuyFunc} title="Ключи" banners={[
                    { name: "Ключ", src: '/keys/crown-key.jpg', cost: { type: 'rubles', count: 100 }, count: 1 },
                    { name: "Ключ", src: '/keys/crown-key.jpg', cost: { type: 'rubles', count: 300 }, count: 3 },
                    { name: "Ключ", src: '/keys/crown-key.jpg', cost: { type: 'rubles', count: 600 }, count: 6 },
                    { name: "Ключ", src: '/keys/crown-key.jpg', cost: { type: 'rubles', count: 1200 }, count: 12 }
                ]} />
                <DynamicBanner title="Питомцы" offer={offer} buy={BuyFunc} />
            </div>
        </div>
    )
}
export default Page
