'use client'

import { useState } from 'react'
import { createPortal } from 'react-dom'
import PurpleButton from '../../additionals/buttons/PurpleButton'
import { FilterIcon } from '../../icons/Cards'
import BaseList from '../../additionals/BaseList'

const SearchFilter = () => {
    const [isOpened, setIsOpened] = useState(false)

    return (
        <div className='search-filter'>
            <button className='search-filter__btn' type='button' onClick={() => setIsOpened(prev => !prev)}>
                <FilterIcon />
            </button>
            {isOpened && createPortal(<dialog open={isOpened} className="search-filter__portal">
                <div className="search-filter__filter-container">
                    <div className="search-filter__block search-filter__block-filters">
                        <BaseList naming={{ title: 'Редкость', titleKey: 'rarity' }} values={{ 'S': 'S', 'A': 'A', 'A+': 'A+' }} />
                        <BaseList naming={{ title: 'Атрибут', titleKey: 'attribute' }} values={{ 'water': 'Вода', 'fire': 'Огонь', 'electricity': 'Электричество' }} />
                        <BaseList naming={{ title: 'Категория', titleKey: 'category' }} values={{ 'battle': 'Боевые', 'special': 'Специальные', 'collection': 'Коллекционные' }} />
                    </div>
                    <div className="search-filter__block search-filter__block-btns">
                        <PurpleButton title='Закрыть' additionStyle='tiny' func={() => setIsOpened(false)} />
                    </div>
                </div>
            </dialog>, document.body)
            }
        </div>
    )
}

export default SearchFilter