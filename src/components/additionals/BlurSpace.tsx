interface IBlurSpaceProps {
    children: React.ReactNode,
    additionStyle?: string
}

const BlurSpace = ({ children, additionStyle }: IBlurSpaceProps) => {
    return (
        <div className={`blur-space`}>
            <div className={`blur-space__container ${additionStyle}`}>
                {children}
            </div>
        </div >
    )
}

export default BlurSpace