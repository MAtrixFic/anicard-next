import { BannerSection } from "@/components/routes/shop/Bunner"

const Page = () => {
    return (
        <div className="shop">
            <div className="shop__body">
                <BannerSection title="Ключи" banners={[
                    {
                        src: '/keys/silver-key.jpg',
                        name: "Серебрянный ключ",
                        cost: {
                            type: 'game-money',
                            count: 25
                        }
                    },
                    {
                        src: '/keys/crown-key.jpg',
                        name: "Королевский ключ",
                        cost: {
                            type: 'game-money',
                            count: 40
                        }
                    },
                    {
                        src: '/keys/star-key.jpg',
                        name: "Звездный ключ",
                        cost: {
                            type: 'game-money',
                            count: 100
                        }
                    },
                ]} />
            </div>
        </div>
    )
}
export default Page
