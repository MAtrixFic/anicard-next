import { useEffect, useRef, useState } from "react"
import { Cross } from "../icons/Cards";
import { useFormContext } from "react-hook-form";

export interface IBaseListProps {
    naming: { title: string, titleKey: string },
    values: { [key: string]: string },
    onChange?: () => void
}

const BaseList = ({ naming, values, onChange }: IBaseListProps) => {
    const formContext = useFormContext();
    const [activeValueKey, setActiveValueKey] = useState<string>(formContext.getValues(naming.titleKey));
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
            <select {...formContext.register(naming.titleKey)} name={naming.titleKey} style={{ display: 'none' }}>
                {Object.keys(values).map((v, i) =>
                    <option key={v + i} value={v}>{values[v]}</option>
                )}
            </select>
            <div className="base-list__title-container">
                <h4 className="base-list__title">
                    {naming.title}
                </h4>
            </div>
            <div className="base-list__selection-container">
                <div className="base-list__container">
                    <button type='button' disabled={!activeValueKey} className="base-list__btn" onClick={() => {
                        formContext.setValue(naming.titleKey, '')
                        setActiveValueKey('')
                    }}>
                        <Cross />
                    </button>
                </div>
                <div className="base-list__active-value-container">
                    <button type='button' className="base-list__active-value" onClick={() => setIsOpened(!isOpened)}>
                        {values[activeValueKey]}
                    </button>
                </div>
                {isOpened &&
                    <ul className="base-list__selection">
                        {Object.keys(values).map((v, i) =>
                            <li className="base-list__value" key={v + i} onClick={() => {
                                formContext.setValue(naming.titleKey, v)
                                setActiveValueKey(v)
                                setIsOpened(false)
                                if (onChange) onChange()
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
