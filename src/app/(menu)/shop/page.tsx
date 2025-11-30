import { BannerSection } from "@/components/routes/shop/Bunner"

const Page = () => {
    return (
        <div className="shop">
            <div className="shop__body">
                <BannerSection title="Карты" banners={[
                    {
                        card: { character: 'Рем', rarity: 'S' },
                        count: 2,
                        src: '/Rem.jpg',
                        name: "Рем",
                        cost: {
                            type: 'game-money',
                            count: 40
                        }
                    },
                    {
                        card: { character: 'Чисато', rarity: 'S' },
                        count: 4,
                        src: '/Chisato.jpg',
                        name: "Чисато",
                        cost: {
                            type: 'game-money',
                            count: 40
                        }
                    },
                    {
                        card: { character: 'Рей', rarity: 'S' },
                        count: 1,
                        src: '/Rey.jpg',
                        name: "Рей",
                        cost: {
                            type: 'game-money',
                            count: 40
                        }
                    },
                    {
                        card: { character: 'Сенко', rarity: 'D' },
                        count: 1,
                        src: '/Senko.jpg',
                        name: "Сенко",
                        cost: {
                            type: 'game-money',
                            count: 5
                        }
                    },
                ]} />
            </div>
        </div>
    )
}
export default Page
