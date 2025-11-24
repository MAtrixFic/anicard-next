import { useEffect, useRef, useState } from "react"
import { Cross } from "../icons/Cards";

export interface IBaseListProps {
    title: string,
    values: { [key: string]: string },
    defaultValue?: string
}

const BaseList = ({ title, values, defaultValue }: IBaseListProps) => {
    const [activeValueKey, setActiveValueKey] = useState<string>(defaultValue ? defaultValue : '');
    const [isOpened, setIsOpened] = useState<boolean>(false);
    const listRef = useRef<HTMLElement>(null);

    useEffect(() => {
        function ClearHideList(e: MouseEvent | TouchEvent) {
            if (listRef.current && listRef.current.contains(e.target as Node)) return;
            else setIsOpened(false);
        }

        const bodyElement = document.body;
        bodyElement.addEventListener('click', ClearHideList);

        return () => bodyElement.removeEventListener('click', ClearHideList)
    }, [isOpened])

    return (
        <section ref={listRef} className={`base-list long ${activeValueKey}`}>
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
