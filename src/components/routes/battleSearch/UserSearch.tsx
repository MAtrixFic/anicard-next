'use client'
import LightButton from "@/components/additionals/buttons/LightButton"
import PurpleButton from "@/components/additionals/buttons/PurpleButton"
import useOverWindowStatus from "@/devs/hooks/useOverWindowStatus"
import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { useRouter } from "next/navigation"

const UserSearch = () => {
    const [windowStatus, setWindowsStatus, UpdateWindowStatusInTime] = useOverWindowStatus(400);
    const [fightIsFound, setFightIsFound] = useState<boolean>(false)
    const router = useRouter()

    useEffect(() => {
        if (windowStatus === 'opened') {
            const threadAnim = setTimeout(() => {
                setFightIsFound(true);
                setTimeout(()=> {
                    router.push('/battle/choice/1')
                }, 2000)
            }, 4000)

            return () => clearTimeout(threadAnim);
        }
        else{
            setFightIsFound(false)
        }

    }, [windowStatus])

    return (
        <>
            <PurpleButton additionStyle="huge" title="Арена" func={UpdateWindowStatusInTime} />
            {['opened', 'to-hide'].includes(windowStatus) &&
                createPortal(<div className={`user-search ${windowStatus}`}>
                    <div className="user-search__container user-search__container-rel">
                        <div className="user-search__search-block">
                            <div className={`user-search__search-text-container ${fightIsFound ? 'found' : 'search'}`}>
                                <span className="user-search__search-text">
                                    {fightIsFound ? 'Бой найден' : 'Поиск...'}
                                </span>
                            </div>
                        </div>
                        <div className="user-search__container user-search__container-cancel">
                            <LightButton title="Отмена" func={UpdateWindowStatusInTime} additionStyle="purple" />
                        </div>
                    </div>
                </div>, document.body)
            }
        </>
    )
}

export default UserSearch