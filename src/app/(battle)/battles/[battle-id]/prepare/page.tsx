'use client'
import Image from "next/image"
import LightButton from "@/components/additionals/buttons/LightButton";
import { useEffect, useMemo, useState } from "react";
import useSelection from "@/devs/hooks/useSelection";
import useOverWindowStatus from "@/devs/hooks/useOverWindowStatus";
import { useRouter } from "next/navigation";
import useBattleSocket from "@/devs/hooks/server/useBattleSocket";

const Prepare = () => {
    const { ws, choise } = useBattleSocket();
    const weather = useMemo(() => ({
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

    useEffect(() => {
        if (ws)
            ws.onopen = () => {
                ws.onmessage = (event) => {
                    console.log(event.data)
                }
            }
    }, [ws])

    const [timerStatus, setTimerStatus] = useState<'running' | 'finished'>('running');

    const [choicePointStatus, _, setStatusInTime] = useOverWindowStatus(800);

    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
            setStatusInTime();
            // setTimeout(() => {
            //     setPoints(prev => prev.map((v, i) =>
            //         i === 1 ? {
            //             key: "weather",
            //             name: "Солнечно",
            //             src: '/battle/weather/sunny.jpg',
            //             id: 101
            //         } : v
            //     ))
            //     setTimeout(() => {
            //         router.replace('/battles/1/fight')
            //     }, 2000)
            // }, 10000)
        }, 8000)
    }, [])

    return (
        <div className="battle-choice">
            <section className="battle-choice__top-block">
                <div className="battle-choice__rivals">
                    <h2 className="battle-choice__title">
                        <span className="battle-choice__t-el battle-choice__t-el-you">ТЫ</span>
                        <span className="battle-choice__t-el battle-choice__t-el-vs">VS</span>
                        <span className="battle-choice__t-el battle-choice__t-el-rival">ДРУГОЙ</span>
                    </h2>
                </div>
                <div className="battle-choice__logs">
                    <p className="battle-choice__log">
                        Идет распределение выбора
                    </p>
                </div>
            </section>
            <section className="battle-choice__middle-block">
                <div className="battle-choice__container battle-choice__container-points">
                    {points.map((v, i) =>
                        <BattlePoint name={v.name} id={i} key={v.key + i} />
                    )}
                </div>
                {['to-hide', 'opened'].includes(choicePointStatus) &&
                    <PointChoice points={[
                        {
                            name: "Пустыня",
                            key: "location",
                            id: 1
                        },
                        {
                            name: "Снежные горы",
                            key: "location",
                            id: 2
                        },
                        {
                            name: "Вулкан",
                            key: "location",
                            id: 3
                        }
                    ]}
                        approveFunc={(choicePoint: TChoicePoint, index: number) => {
                            setPoints(prev => prev.map((v, i) =>
                                i === index ? choicePoint : v
                            ))
                            setStatusInTime();
                        }}

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

interface IBattlePointProps extends TChoicePoint {
    additionalStyle?: string;
    checkSelection?: {
        func: () => void;
        selectedId?: number
    }
}

type TChoicePoint = {
    key: string,
    name: string,
    id: number,
}

const BattlePoint = ({ name, additionalStyle, checkSelection, id, key }: IBattlePointProps) => {
    return (
        <section className={`battle-point ${additionalStyle} ${checkSelection?.selectedId === id ? 'selected' : 'deselected'} ${checkSelection && 'selectable'}`} onClick={checkSelection?.func}>
            <div className="battle-point__container battle-point__container-preview">
                {!name ? <span className="battle-point__preview-question">?</span> :
                    <Image height={120} width={120} quality={60} alt='point-preview' src={`https://obviously-vocal-seagull.cloudpub.ru/images/${key}/${name}.jpg`} className="battle-point__preview" />
                }
            </div>
            <div className="battle-point__container battle-point__container-name">
                <span className="battle-point__name">
                    {name}
                </span>
            </div>
        </section>
    )
}

interface IPointChoiceProps {
    points: TChoicePoint[],
    approveFunc: (...arg: any) => void;
    windowStatus: string,
}

const PointChoice = ({ points, approveFunc, windowStatus }: IPointChoiceProps) => {
    const [selected, setSelected] = useSelection<TChoicePoint>(false)
    return (
        <div className={`battle-choice__choice-point ${windowStatus}`}>
            <div className="battle-choice__choice">
                {points.map((v, i) =>
                    <BattlePoint
                        checkSelection={{
                            selectedId: selected?.id,
                            func: () => setSelected(v)
                        }}
                        id={v.id}
                        name={v.name}
                        key={v.key + i}
                        additionalStyle="selection" />
                )}
            </div>
            <div className="battle-choice__container battle-choice__container-center">
                <LightButton title='Выбрать' additionStyle="green tiny" func={() => approveFunc(selected, 0)} />
            </div>
        </div>
    )
}

export default Prepare