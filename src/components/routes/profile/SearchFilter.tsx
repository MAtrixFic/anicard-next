'use client'

import { useState } from 'react'
import { createPortal } from 'react-dom'
import PurpleButton from '../../additionals/PurpleButton'
import { FilterIcon } from '../../icons/Cards'
import BaseList from '../../additionals/BaseList'
const SearchFilter = () => {
    const [isOpened, setIsOpened] = useState(false)
    return (
        <div className='search-filter'>
            <button className='search-filter__btn' onClick={() => setIsOpened(prev => !prev)}>
                <FilterIcon />
            </button>
            {isOpened && createPortal(<dialog open={isOpened} className="search-filter__portal">
                <div className="search-filter__filter-container">
                    <div className="search-filter__block search-filter__block-filters">
                        <BaseList title='Редкость' values={{ 'S': 'S', 'A': 'A', 'A+': 'A+' }} />
                        <BaseList title='Атрибут' values={{}} />
                        <BaseList title='Категория' values={{ 'battle': 'Боевые', 'special': 'Специальные', 'collection': 'Коллекционные' }} />
                    </div>
                    <div className="search-filter__block search-filter__block-btns">
                        <PurpleButton title='Закрыть' additionStyle='tiny' func={() => setIsOpened(false)} />
                        <PurpleButton title='Применить' additionStyle='tiny' func={() => setIsOpened(false)} />
                    </div>
                </div>
            </dialog>, document.body)
            }
        </div>
    )
}

export default SearchFilter