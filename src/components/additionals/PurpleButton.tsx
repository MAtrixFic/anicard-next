interface IPurpleButtonProps {
    title: React.ReactNode,
    func?: () => void;
    additionStyle?: string,
    active?: boolean
}

const PurpleButton = ({ title, func, additionStyle, active = true }: IPurpleButtonProps) => {
    return (
        <button disabled={!active} onClick={func} className={`purple-button ${additionStyle}`}>
            {title}
        </button>
    )
}

export default PurpleButton