import { Search } from '../icons/Cards';

// interface IInputProps{
//     prompt: string,
// }

const Input = () => {
    return (
        <div className='input'>
            <div className="input__container input__container-input">
                <input type="text" className="input__text-inpt" />
            </div>
            <div className="input__containter">
                <button className='input__btn'>
                    <Search />
                </button>
            </div>
        </div>
    )
}

export default Input;