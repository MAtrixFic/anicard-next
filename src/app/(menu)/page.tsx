'use client'
import UserSearch from "@/components/routes/battleSearch/UserSearch"
import dynamic from "next/dynamic"
import PurpleLink from "@/components/additionals/PurpleLink"

const InitDynamic = dynamic(() => import('@/components/telegram/Client'), { ssr: false })

const Page = () => {
    return (
        <div className="home">
            <PurpleLink title="Фарм" to="/farm/points"/>
            <UserSearch />
            <InitDynamic />
        </div>
    )
}

export default Page