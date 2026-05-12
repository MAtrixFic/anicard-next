'use client'
import { Back } from "@/components/icons/Base"
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ValueInfo } from "../routes/shop/ValueInfo";
import { useUser } from "@/devs/hooks/server/useUser";
const Avatar = dynamic(() => import('@/devs/browserStorages/SessionAvatar'), { ssr: false })

const Header = () => {
    const { data: user } = useUser(true)
    // const isVisible = useHeaderScroll();
    const router = useRouter();
    const pathname = usePathname();

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
                        <ValueInfo src="/coins/coins-new.png" count={user?.coin || 0} name="crown-key" />
                        <ValueInfo src="/coins/battle_coins-new.png" count={user?.battleCoin || 0} name="crown-key" />
                    </div>
                    <div className="header__money-block">
                        <ValueInfo src="/keys/golden_key-new.png" count={user?.keys || 0} name="crown-key" />
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