
export interface IOverBlackSpaceProps {
    children?: React.ReactNode,
    additionStyle: string,
}

const OverBlackSpace = ({ children, additionStyle }: IOverBlackSpaceProps) => {
    return (
        <div className={`over-black-space ${additionStyle}`}>
            {children}
        </div>
    )
}

export default OverBlackSpace