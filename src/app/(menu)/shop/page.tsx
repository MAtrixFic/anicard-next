import { BannerSection } from "@/components/routes/shop/Bunner"
import DynamicBanner from "@/components/routes/shop/DynamicBanner"

const Page = () => {
    return (
        <div className="shop">
            <div className="shop__body">
                <BannerSection title="Ключи" banners={[
                    { name: "Ключ", src: '/keys/crown-key.jpg', cost: { type: 'rubles', count: 100 }, count: 1 },
                    { name: "Ключ", src: '/keys/crown-key.jpg', cost: { type: 'rubles', count: 300 }, count: 3 },
                    { name: "Ключ", src: '/keys/crown-key.jpg', cost: { type: 'rubles', count: 600 }, count: 6 },
                    { name: "Ключ", src: '/keys/crown-key.jpg', cost: { type: 'rubles', count: 1200 }, count: 12 }
                ]} />
                <DynamicBanner />
            </div>
        </div>
    )
}
export default Page
