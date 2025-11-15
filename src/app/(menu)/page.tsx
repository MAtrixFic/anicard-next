import BlurSpace from "@/components/additionals/BlurSpace"
import PurpleLink from "@/components/additionals/PurpleLink"
import UserSearch from "@/components/routes/battleSearch/UserSearch"

const Page = () => {
    return (
        <div className="home">
            <BlurSpace additionStyle="main">
                <section className="table__top">
                    <div className="table__title-container">
                        <h1 className="table__title">
                            ANICARD
                        </h1>
                    </div>
                </section>
                <section className="table__bottom">
                    <nav className="table__start-menu">
                        <PurpleLink additionStyle="huge" title="Инвентарь" to={'inventory'} />
                        <PurpleLink additionStyle="huge" title="Крутки" to={'twists'} />
                        <PurpleLink additionStyle="huge" title="Маркет" to={'trades'} />
                        <UserSearch />
                        <PurpleLink additionStyle="huge" title="Магазин" to={'shop'} />
                        <PurpleLink additionStyle="huge" title="Рейтинг" to={'rating'} />
                    </nav>
                </section>
            </BlurSpace>
        </div>
    )
}

export default Page