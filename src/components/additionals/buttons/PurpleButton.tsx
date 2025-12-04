export interface IPurpleButtonProps {
    title: React.ReactNode,
    func?: () => void | Promise<void> | any;
    additionStyle?: string,
    active?: boolean,
    submit?: boolean
}

const PurpleButton = ({ title, func, additionStyle, active = true, submit = false }: IPurpleButtonProps) => {
    return (
        <button type={submit ? 'submit' : 'button'} disabled={!active} onClick={func} className={`purple-button ${additionStyle}`}>
            {title}
        </button>
    )
}

export default PurpleButton