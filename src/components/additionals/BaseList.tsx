import { useEffect, useState } from "react"
import { Cross } from "../icons/Cards";

export interface IBaseListProps {
    title: string,
    values: { [key: string]: string }
}

const BaseList = ({ title, values }: IBaseListProps) => {
    const [activeValueKey, setActiveValueKey] = useState<string>();
    const [isOpened, setIsOpened] = useState<boolean>(false);

    useEffect(() => {
        function ClearHideList() {
            if (isOpened) setIsOpened(false);
        }

        const bodyElement = document.body;
        bodyElement.addEventListener('click', ClearHideList);

        return () => bodyElement.removeEventListener('click', ClearHideList)
    }, [isOpened])

    return (
        <section className={`base-list long`}>
            <div className="base-list__title-container">
                <h4 className="base-list__title">
                    {title}
                </h4>
            </div>
            <div className="base-list__selection-container">
                <div className="base-list__container">
                    <button disabled={!activeValueKey} className="base-list__btn" onClick={() => setActiveValueKey('')}>
                        <Cross />
                    </button>
                </div>
                <div className="base-list__active-value-container">
                    <button className="base-list__active-value" onClick={() => setIsOpened(!isOpened)}>
                        {values[activeValueKey as keyof typeof values]}
                    </button>
                </div>
                {isOpened &&
                    <ul className="base-list__selection">
                        {Object.keys(values).map((v, i) =>
                            <li className="base-list__value" key={v + i} onClick={() => {
                                setActiveValueKey(v)
                                setIsOpened(false)
                            }}>
                                <span className="base-list__value-title">
                                    {values[v]}
                                </span>
                            </li>
                        )}
                    </ul>
                }
            </div>
        </section>
    )
}

export default BaseList
