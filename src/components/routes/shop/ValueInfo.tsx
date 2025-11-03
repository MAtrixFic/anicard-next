import Image from "next/image"

export interface IValueInfoProps {
    count: number,
    type?: string,
    name: string,
    src: string
}

export const ValueInfo = ({ count, type, src }: IValueInfoProps) => {
    return (
        <div className="value-info">
            <div className="value-info__count-container">
                <span className="value-info__count">{`${count} ${type ? type : ''}`}</span>
            </div>
            <div className="value-info__view-container">
                <Image height={34} width={34} quality={40} src={src} alt="value" className="value-info__view" />
            </div>
        </div>
    )
}
