'use client'
import Image from "next/image"
import LightButton from "@/components/additionals/buttons/LightButton";
import { useEffect, useMemo, useState } from "react";
import useSelection from "@/devs/hooks/useSelection";
import useOverWindowStatus from "@/devs/hooks/useOverWindowStatus";
import { useRouter } from "next/navigation";
import useBattleSocket from "@/devs/hooks/server/useBattleSocket";
import { EventTypes } from "@/devs/store/BattleSocketStore";
import BattleRival from "@/components/routes/battleRival/BattleRival";
import { BACK_ORIGIN } from "@/components/server/fetches/env.config";

const Prepare = () => {
    const { ws, environment, setWSValue, battleId, players, CloseWS, opponentId } = useBattleSocket();
    const choises = useMemo(() => ({
        weather: [
            "sunny",
            "snowy",
            "rainy"
        ],
        location: [
            "desert",
            "forest",
            "sea",
            "glacier",
            "swamp"
        ]
    }), [])

    const [points, setPoints] = useState<[TChoicePoint | undefined, TChoicePoint | undefined]>([undefined, undefined]);

    useEffect(() => {
        if (ws)
            ws.onmessage = (event) => {
                const jsonEvent = JSON.parse(event.data);
                console.log(jsonEvent);

                if (jsonEvent.type === EventTypes.BATTLE_STATE) {
                    setWSValue('opponentId', jsonEvent.state.opponent_id)
                    if (jsonEvent.state.weather && jsonEvent.state.location) {
                        setPoints([{ environment: 'location', name: jsonEvent.state.location, id: 0 }, { environment: 'weather', name: jsonEvent.state.weather, id: 1 }])
                        console.log(`/static/images/location/${jsonEvent.state.location}`, `/static/images/weather/${jsonEvent.state.weather}`)
                        setWSValue('location', `/static/images/location/${jsonEvent.state.location}`)
                        setWSValue('weather', `/static/images/weather/${jsonEvent.state.weather}`)
                        setTimeout(() => {
                            router.replace(`/battles/${battleId}/fight`)
                        }, 1000)
                    }
                }
                if (jsonEvent.type === EventTypes.BATTLE_ENDED) {
                    alert("Соперник вышел")
                    CloseWS();
                    setTimeout(() => {
                        router.replace('/')
                    }, 3000)
                }
            }
    }, [ws])

    useEffect(() => {
        if (ws)
            ws.send(JSON.stringify({
                type: EventTypes.BATTLE_STATE
            }))
    }, [])

    const [timerStatus, setTimerStatus] = useState<'running' | 'finished'>('running');
    const [choicePointStatus, _, setStatusInTime] = useOverWindowStatus(800);


    const router = useRouter();
    console.log(opponentId, 'opponentId')

    useEffect(() => {
        setTimeout(() => {
            setStatusInTime();
        }, 8000)
    }, [])

    return (
        <div className="battle-choice">
            <section className="battle-choice__top-block">
                <div className="battle-choice__rivals">
                    <h2 className="battle-choice__title">
                        <span className="battle-choice__t-el battle-choice__t-el-you">{players[0]}</span>
                        <span className="battle-choice__t-el battle-choice__t-el-vs">VS</span>
                        <BattleRival userId={opponentId} name={players[1]}>
                            <span className="battle-choice__t-el battle-choice__t-el-rival">{players[1]}</span>
                        </BattleRival>
                    </h2>
                </div>
                <div className="battle-choice__logs">
                    <p className="battle-choice__log">
                        Идет распределение
                    </p>
                </div>
            </section>
            <section className="battle-choice__middle-block">
                <div className="battle-choice__container battle-choice__container-points">
                    {points.map((v, i) =>
                        <BattlePoint name={v?.name} id={v?.id} environment={v?.environment} key={i} />
                    )}
                </div>
                {['to-hide', 'opened'].includes(choicePointStatus) &&
                    <PointChoice
                        points={[...choises[environment as 'location' | 'weather'].map((v, i) => ({
                            id: i,
                            name: v,
                            environment: environment as 'location' | 'weather'
                        }))]}
                        windowStatus={choicePointStatus}
                    />}
            </section>
            <section className="battle-choice__bottom-block">
                <div className="battle-choice__container battle-choice__container-time">
                    <div className={`battle-timer ${timerStatus}`} />
                </div>
            </section>
        </div>
    )
}

interface IBattlePointProps extends Partial<TChoicePoint> {
    additionalStyle?: string;
    checkSelection?: {
        func: () => void;
        selectedId?: number
    }
}

type TChoicePoint = {
    environment: string,
    name: string
    id: number
}

const BattlePoint = ({ name, additionalStyle, checkSelection, environment, id }: IBattlePointProps) => {
    return (
        <section className={`battle-point ${additionalStyle} ${checkSelection?.selectedId === id ? 'selected' : 'deselected'
            } ${checkSelection && 'selectable'}`} onClick={checkSelection?.func}>
            <div className="battle-point__container battle-point__container-preview">
                {!name && !environment ? <span className="battle-point__preview-question">?</span> :
                    <Image height={120} width={120} quality={60} alt='point-preview' src={`${BACK_ORIGIN}/static/images/${environment}/${name}.png`} className="battle-point__preview" />
                }
            </div >
            <div className="battle-point__container battle-point__container-name">
                <span className="battle-point__name">
                    {name}
                </span>
            </div>
        </section >
    )
}

interface IPointChoiceProps {
    points: TChoicePoint[],
    // approveFunc: (...arg: any) => void;
    windowStatus: string,
}

const PointChoice = ({ points, windowStatus }: IPointChoiceProps) => {
    const { ws } = useBattleSocket();
    const [selected, setSelected] = useSelection<TChoicePoint>(false);

    useEffect(() => {
        setSelected(points[0])
    }, [])

    return (
        <div className={`battle-choice__choice-point ${windowStatus}`}>
            <div className="battle-choice__choice">
                {points.map((v, i) =>
                    <BattlePoint
                        checkSelection={{
                            selectedId: selected?.id,
                            func: () => setSelected(v)
                        }}
                        key={v.id}
                        id={i}
                        name={v.name}
                        environment={v.environment}
                        additionalStyle="selection" />
                )}
            </div>
            <div className="battle-choice__container battle-choice__container-center">
                <LightButton title='Выбрать' additionStyle="green tiny" func={() => {
                    console.log(JSON.stringify({
                        type: EventTypes.SUBMIT_SETTINGS,
                        [selected!.environment]: selected!.name
                    }))
                    if (ws) {
                        ws.send(JSON.stringify({
                            type: EventTypes.SUBMIT_SETTINGS,
                            [selected!.environment]: selected!.name
                        }))
                    }
                }} />
            </div>
        </div>
    )
}

export default Prepare