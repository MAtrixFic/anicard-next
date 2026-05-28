import { useEffect, useRef, useState } from "react"
import { Cross } from "../icons/Cards";
import { useFormContext } from "react-hook-form";
import { register } from "module";

export interface IBaseInputWithListProps {
    naming: { title: string, titleKey: string },
    values: string[],
    onChange?: () => void
}

const BaseInputWithList = ({ naming, values, onChange }: IBaseInputWithListProps) => {
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
                    <input className="base-list__input" type="text"
                        {...formContext.register(naming.titleKey)}
                        onFocus={() => setIsOpened(!isOpened)} />
                </div>
                {isOpened &&
                    <ul className="base-list__selection">
                        {values.map((v, i) =>
                            <li className="base-list__value" key={v + i} onClick={() => {
                                formContext.setValue(naming.titleKey, v)
                                setActiveValueKey(v)
                                setIsOpened(false)
                                if (onChange) onChange()
                            }}>
                                <span className="base-list__value-title">
                                    {v}
                                </span>
                            </li>
                        )}
                    </ul>
                }
            </div>
        </section>
    )
}

export default BaseInputWithList
