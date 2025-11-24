import { BannerSection } from "@/components/routes/shop/Bunner"

const Page = () => {
    return (
        <div className="shop">
            <div className="shop__body">
                <BannerSection title="Карты" banners={[
                    {
                        card: { name: 'Рем', rang: 'S' },
                        count: 2,
                        src: '/Rem.jpg',
                        name: "Рем",
                        cost: {
                            type: 'game-money',
                            count: 40
                        }
                    },
                    {
                        card: { name: 'Чисато', rang: 'S' },
                        count: 4,
                        src: '/Chisato.jpg',
                        name: "Чисато",
                        cost: {
                            type: 'game-money',
                            count: 40
                        }
                    },
                    {
                        card: { name: 'Рей', rang: 'S' },
                        count: 1,
                        src: '/Rey.jpg',
                        name: "Рей",
                        cost: {
                            type: 'game-money',
                            count: 40
                        }
                    },
                    {
                        card: { name: 'Сенко', rang: 'D' },
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
