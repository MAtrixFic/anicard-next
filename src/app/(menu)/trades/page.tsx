import YourBlock from "@/components/routes/trades/YourBlock"
import OtherBlock from "@/components/routes/trades/OtherBlock"

const Page = () => {

    return (
        <div className="trades">
            <div className="trades__top">
                <div className="trades__container trades__container-vertical">
                    <div className="trades__list-title-container">
                        <span className="trades__list-title">Твой список предложений:</span>
                    </div>
                    <YourBlock />
                </div>
            </div>
            <div className="trades__bottom">
                <OtherBlock />
            </div>
        </div>
    )
}

export default Page