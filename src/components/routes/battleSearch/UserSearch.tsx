'use client'
import LightButton from "@/components/additionals/buttons/LightButton"
import PurpleButton from "@/components/additionals/buttons/PurpleButton"
import useOverWindowStatus from "@/devs/hooks/useOverWindowStatus"
import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { useRouter } from "next/navigation"
import useBattleSocket from "@/devs/hooks/server/useBattleSocket"
import { EventTypes } from "@/devs/store/BattleSocketStore"

const UserSearch = () => {
    const [windowStatus, setWindowsStatus, UpdateWindowStatusInTime] = useOverWindowStatus(400);
    const [fightIsFound, setFightIsFound] = useState<boolean>(false)
    const { ws, CreateWS, CloseWS, setWSValue } = useBattleSocket()
    const router = useRouter()

    useEffect(() => {
        if (windowStatus === 'opened') {
            CreateWS()
        }
        else {
            setFightIsFound(false)
        }

    }, [windowStatus])

    useEffect(() => {
        if (ws)
            ws.onopen = () => {
                ws.onmessage = (event) => {
                    const jsonEvent = JSON.parse(event.data)
                    console.log(jsonEvent)
                    if (jsonEvent.type === EventTypes.BATTLE_STARTED) {
                        if (jsonEvent.phase === 'setup') {
                            setWSValue('environment', jsonEvent.environment);
                        }
                        setWSValue('battleId', jsonEvent.battle_id);
                        setWSValue('players', [jsonEvent.player_nickname, jsonEvent.opponent_nickname]);
                        setFightIsFound(true)
                        setTimeout(() => {
                            router.push(`/battles/${jsonEvent.battle_id}/prepare`)
                        }, 2000)
                    }
                }
            }
        else return
    }, [ws])

    function CloseSearch() {
        CloseWS()
        UpdateWindowStatusInTime()
    }

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
                            <LightButton title="Отмена" func={CloseSearch} additionStyle="purple" />
                        </div>
                    </div>
                </div>, document.body)
            }
        </>
    )
}

export default UserSearch