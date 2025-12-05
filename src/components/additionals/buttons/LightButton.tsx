import { type IPurpleButtonProps } from "./PurpleButton"
const LightButton = ({ title, additionStyle, func, active = true, submit = false }: IPurpleButtonProps) => {
    return (
        <button className={`light-button ${additionStyle}`} type={submit ? 'submit' : 'button'} disabled={!active} onClick={func}>
            {title}
        </button>
    )
}

export default LightButton