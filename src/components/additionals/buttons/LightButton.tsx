import { type IPurpleButtonProps } from "./PurpleButton"
const LightButton = ({ title, additionStyle, func, active = true }: IPurpleButtonProps) => {
    return (
        <button className={`light-button ${additionStyle}`} disabled={!active} onClick={func}>
            {title}
        </button>
    )
}

export default LightButton