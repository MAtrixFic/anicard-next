'use client'
import UserSearch from "@/components/routes/battleSearch/UserSearch"
import dynamic from "next/dynamic"

const InitDynamic = dynamic(() => import('@/components/telegram/Client'), { ssr: false })

const Page = () => {
    return (
        <div className="home">
            <UserSearch />
            <InitDynamic />
        </div>
    )
}

export default Page