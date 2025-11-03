import { useState } from "react"
export type TWindowStatus = 'opened' | 'hidden' | 'to-hide'
const useOverWindowStatus = (timer: number): [TWindowStatus, (args: TWindowStatus) => void, () => void] => {
    const [overWindowStatus, setOverWindowStatus] = useState<TWindowStatus>('hidden')

    function SetWindowMode() {
        if (overWindowStatus == 'opened') {
            setOverWindowStatus('to-hide')
            setTimeout(() => {
                setOverWindowStatus('hidden')
            }, timer)
        }
        else setOverWindowStatus('opened');
    }

    return [overWindowStatus, setOverWindowStatus, SetWindowMode]
}

export default useOverWindowStatus
