import { useCallback, useState, useRef } from 'react';

interface UseSwipeRightOptions {
    onSwipeRight: () => void;
    minDistance?: number;
    preventDefault?: boolean;
}

interface UseSwipeRightReturn {
    handlers: {
        onTouchStart: (e: React.TouchEvent) => void;
        onTouchMove: (e: React.TouchEvent) => void;
        onTouchEnd: () => void;
        onMouseDown: (e: React.MouseEvent) => void;
        onMouseMove: (e: React.MouseEvent) => void;
        onMouseUp: () => void;
    };
    isSwiping: boolean;
    swipeProgress: number;
}

const useSwipeRight = (options: UseSwipeRightOptions): UseSwipeRightReturn => {
    const { onSwipeRight, minDistance = 50, preventDefault = true } = options;

    const [isSwiping, setIsSwiping] = useState(false);
    const [swipeProgress, setSwipeProgress] = useState(0);

    const startX = useRef(0);
    const currentX = useRef(0);

    const handleStart = useCallback((clientX: number) => {
        startX.current = clientX;
        currentX.current = clientX;
        setIsSwiping(true);
        setSwipeProgress(0);
    }, []);

    const handleMove = useCallback((clientX: number) => {
        if (!isSwiping) return;

        currentX.current = clientX;
        const distance = Math.max(0, clientX - startX.current);
        const progress = Math.min(100, (distance / minDistance) * 100);

        setSwipeProgress(progress);
    }, [isSwiping, minDistance]);

    const handleEnd = useCallback(() => {
        if (!isSwiping) return;

        const distance = currentX.current - startX.current;

        if (distance >= minDistance) {
            onSwipeRight();
        }

        setIsSwiping(false);
        setSwipeProgress(0);
    }, [isSwiping, minDistance, onSwipeRight]);

    const onTouchStart = useCallback((e: React.TouchEvent) => {
        if (preventDefault) e.preventDefault();
        handleStart(e.touches[0].clientX);
    }, [handleStart, preventDefault]);

    const onTouchMove = useCallback((e: React.TouchEvent) => {
        if (preventDefault) e.preventDefault();
        handleMove(e.touches[0].clientX);
    }, [handleMove, preventDefault]);

    const onTouchEnd = useCallback(() => {
        handleEnd();
    }, [handleEnd]);

    const onMouseDown = useCallback((e: React.MouseEvent) => {
        if (preventDefault) e.preventDefault();
        handleStart(e.clientX);
    }, [handleStart, preventDefault]);

    const onMouseMove = useCallback((e: React.MouseEvent) => {
        if (!isSwiping) return;
        if (preventDefault) e.preventDefault();
        handleMove(e.clientX);
    }, [handleMove, isSwiping, preventDefault]);

    const onMouseUp = useCallback(() => {
        handleEnd();
    }, [handleEnd]);

    return {
        handlers: {
            onTouchStart,
            onTouchMove,
            onTouchEnd,
            onMouseDown,
            onMouseMove,
            onMouseUp
        },
        isSwiping,
        swipeProgress
    };
};

export default useSwipeRight; 