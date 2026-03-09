'use clinet'
import Image from "next/image"

export default function SessionAvatar() {
    return <Image src={sessionStorage.getItem('avatar') || '/avatar/default-avatar.jpg'} quality={50} width={36} height={36} alt="default-avatar" />
}