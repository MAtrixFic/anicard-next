import { useEffect, useRef, useState } from "react"

const useTimer = () => {
    const [startTimer, setStartTimer] = useState(false)
    const [timeLeft, setTimeLeft] = useState(0)

    const intervalRef = useRef<number | null>(null)

    useEffect(() => {
        if (startTimer) {
            intervalRef.current = window.setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        Pause()
                        return 0
                    }

                    return prev - 1
                })
            }, 1000)
        }

        return () => Pause()
    }, [startTimer])

    function Pause() {
        if (intervalRef.current !== null) {
            clearInterval(intervalRef.current)
        }

        // setStartTimer(false)
    }

    function Start(seconds: number) {
        setTimeLeft(seconds)
        setStartTimer(true)
    }

    return { timeLeft, Start, Pause }
}

export default useTimer