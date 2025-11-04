'use client'
import { Back } from "@/components/icons/Base"
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

import useHeaderScroll from "../../devs/hooks/useHeaderScroll"
import { ValueInfo } from "../routes/shop/ValueInfo";

const Header = () => {
    const isVisible = useHeaderScroll();
    const router = useRouter();
    const pathname = usePathname();

    return (
        <header className={`header ${isVisible ? 'showen' : 'hidden'}`}>
            <div className="header__container header__container-blur">
                <div className="header__left-container">
                    <button className="header__btn header__btn-back"
                        disabled={pathname === '/'}
                        onClick={() => router.back()}>
                        <Back />
                    </button>
                </div>
                <div className="header__right-container">
                    <div className="header__money-block">
                        <ValueInfo src="/keys/crown-key.jpg" count={3} name="crown-key" />
                    </div>
                    <div className="header__profile-block">
                        <Link className="header__link header__link-logo" href={'/profile'} />
                    </div>
                </div>
            </div>
            {/* <div className="header__middle">
                <div className="header__middle-container" />
                <div className="header__cards-container" />
            </div> */}
        </header>
    )
}

export default Header