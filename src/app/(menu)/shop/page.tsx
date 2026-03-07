'use client'
import { IShortCardInfo } from "@/components/additionals/Windows/CardGlobalChoiseList"
import { BannerSection } from "@/components/routes/shop/Bunner"
import DynamicBanner from "@/components/routes/shop/DynamicBanner"
import { useShop } from "@/devs/hooks/server/useShop"
import Link from "next/link"

const Page = () => {
    const { TryBuyCards, TryBuyKeys, offer } = useShop()

    function BuyFunc(count: number, card?: IShortCardInfo & { id: number }) {
        if (card) TryBuyCards(card.id)
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
                <DynamicBanner buy={BuyFunc} offer={offer} />
            </div>
        </div>
    )
}
export default Page
