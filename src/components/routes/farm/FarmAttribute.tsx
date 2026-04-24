import { attributesImages } from '@/components/additionals/form/FormCardFields'
import Image from 'next/image'

interface IFarmAttributeProps {
    count: number,
    element: keyof typeof attributesImages
}

const FarmAttribute = ({ count, element }: IFarmAttributeProps) => {
    return (
        <li className='cast'>
            <div className="cast__number">
                <span className='cast__text'>{count}</span>
            </div>
            <div className="cast__preview">
                <Image src={attributesImages[element]} alt="Cast" width={24} height={24} quality={60} />
            </div>
        </li>
    )
}