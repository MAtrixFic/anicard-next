import Link from "next/link"

interface IPurpleLinkProps {
    title: string,
    to: string,
    additionStyle?: string
}

const PurpleLink = ({ title, to, additionStyle }: IPurpleLinkProps) => {
    return (
        <Link href={to} className={`purple-link ${additionStyle}`}>
            {title}
        </Link>
    )
}

export default PurpleLink