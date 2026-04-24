'use client'
import { Back } from "@/components/icons/Base"
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";
import useHeaderScroll from "../../devs/hooks/useHeaderScroll"
import { ValueInfo } from "../routes/shop/ValueInfo";
import { useUser } from "@/devs/hooks/server/useUser";
import { GetUserKeys } from "../server/comp/Apis";
import { useEffect } from "react";
const Avatar = dynamic(() => import('@/devs/browserStorages/SessionAvatar'), { ssr: false })

const Header = () => {
    const { data: user } = useUser()
    // const isVisible = useHeaderScroll();
    const router = useRouter();
    const pathname = usePathname();

    async function GetKeys() {
        await GetUserKeys()
    }

    console.log(user)

    useEffect(() => {
        GetKeys()
    }, [])

    return (
        <header className={`header`}>
            <div className="header__container">
                <div className="header__left-container">
                    <button className="header__btn header__btn-back"
                        disabled={pathname === '/'}
                        onClick={() => router.replace('/')}>
                        <Back />
                    </button>
                </div>
                <div className="header__right-container">
                    <div className="header__money-block">
                        <ValueInfo src="/keys/crown-key.jpg" count={user?.coin || 0} name="crown-key" />
                        <ValueInfo src="/keys/crown-key.jpg" count={user?.battle_coin || 0} name="crown-key" />
                    </div>
                    <div className="header__money-block">
                        <ValueInfo src="/keys/crown-key.jpg" count={user?.keys || 0} name="crown-key" />
                    </div>
                    <div className="header__profile-block">
                        <Link className="header__link header__link-logo" href={'/profile'} >
                            <Avatar />
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header