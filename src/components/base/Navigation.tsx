'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navigation = () => {
    const pathname = usePathname()
    return (
        <footer>
            <div className='navigation'>
                <nav className="navigation__nav">
                    <ul className="navigation__list">
                        <MainNavElemenet name='Магазин' href='/shop' currentPath={pathname} />
                        <MainNavElemenet name='Трейды' href='/trades' currentPath={pathname} />
                        <MainNavElemenet name='Арена' href='/' currentPath={pathname} />
                        <MainNavElemenet name='Инвентарь' href='/inventory' currentPath={pathname} />
                        <MainNavElemenet name='Рейтинг' href='/rating' currentPath={pathname} />
                    </ul>
                </nav>
            </div>
        </footer>
    );
};

const MainNavElemenet = ({ href, name, currentPath }: { href: string, name: string, currentPath: string }) => {
    return (
        <li className={`main-nav ${href === currentPath ? 'active' : 'passive'}`}>
            <Link className='main-nav__link' href={href}>
                {name}
            </Link>
        </li>
    )
}

export default Navigation;