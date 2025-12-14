import { useState, useEffect } from 'react'
import type { IBaseListProps } from './BaseList';
import { Cross } from '../icons/Cards';

const SmallList = ({ naming, values }: IBaseListProps) => {
    const [activeValueKey, setActiveValueKey] = useState<string>('');
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
        <section className={`base-list small`}>
            {/* <select className='base-list__main-list'>
                {Object.keys(values).map((v, i) =>
                    <option key={i + v} value={v}>{values[v]}</option>
                )}
            </select> */}
            <div className="base-list__selection-container">
                <div className="base-list__active-value-container">
                    <button className="base-list__btn" onClick={() => setIsOpened(!isOpened)}>
                        {activeValueKey ? values[activeValueKey as keyof typeof values] : naming.title}
                    </button>
                    <button disabled={!activeValueKey} className='base-list__btn' onClick={() => setActiveValueKey('')}>
                        <Cross />
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

export default SmallList;