import { useEffect, useRef, useState } from "react"

const useTimer = () => {
    const [startTimer, setStartTimer] = useState<boolean>(false)
    const [timeLeft, setTimeLeft] = useState<number>(0)
    const intervalRef = useRef<number>(null)

    useEffect(() => {
        if (startTimer) {
            intervalRef.current = window.setInterval(() => {
                if (timeLeft <= 0) {
                    Pause()
                    return
                }
                setTimeLeft(prev => prev - 1)
            }, 1000)


            return () => Pause()
        }
    }, [startTimer])

    function Pause() {
        clearInterval(intervalRef.current as number)
        setStartTimer(false)
    }

    function Start(seconds: number) {
        setTimeLeft(seconds)
        setStartTimer(true)
    }

    return { timeLeft, Start, Pause }
}

export default useTimer