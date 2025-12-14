'use client'

import { useState } from 'react'
import { createPortal } from 'react-dom'
import PurpleButton from '../../additionals/buttons/PurpleButton'
import { FilterIcon } from '../../icons/Cards'
import FormCardFields from '@/components/additionals/form/FormCardFields'

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
                        <FormCardFields />
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