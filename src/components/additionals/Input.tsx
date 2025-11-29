import { Search } from '../icons/Cards';
import { useFormContext } from 'react-hook-form';

interface ISearchInputProps {
    titleKey: string
}

const Input = ({ titleKey }: ISearchInputProps) => {
    const { register } = useFormContext();

    return (
        <div className='input'>
            <div className="input__container input__container-input">
                <input {...register(titleKey)} type="text" className="input__text-inpt" />
            </div>
            <div className="input__containter">
                <button className='input__btn' type='submit'>
                    <Search />
                </button>
            </div>
        </div>
    )
}

export default Input;