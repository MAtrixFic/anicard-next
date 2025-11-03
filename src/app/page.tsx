import BlurSpace from "@/components/additionals/BlurSpace"
import PurpleLink from "@/components/additionals/PurpleLink"

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
                        <PurpleLink additionStyle="huge" title="Боевые карты" to={'battle-cards'} />
                        <PurpleLink additionStyle="huge" title="Крутки" to={'twists'} />
                        <PurpleLink additionStyle="huge" title="Меню/трейды" to={'#'} />
                        <PurpleLink additionStyle="huge" title="Арена" to={'#'} />
                        <PurpleLink additionStyle="huge" title="Магазин" to={'shop'} />
                        <PurpleLink additionStyle="huge" title="Дорожная карта" to={'#'} />
                    </nav>
                </section>
            </BlurSpace>
        </div>
    )
}

export default Page