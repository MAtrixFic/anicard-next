import { useEffect, useRef, useState, useCallback } from 'react';

interface Position {
    x: number;
    y: number;
}

interface UseConstellationLineProps {
    sourceRef: React.RefObject<HTMLElement>;
    targetRef: React.RefObject<HTMLElement>;
    offset?: Position; // дополнительное смещение
    autoUpdate?: boolean; // автообновление при ресайзе/скролле
}

interface LineData {
    start: Position;
    end: Position;
    distance: number;
    angle: number;
}

export const useConstellationLine = ({
    sourceRef,
    targetRef,
    offset = { x: 0, y: 0 },
    autoUpdate = true
}: UseConstellationLineProps) => {
    const [lineData, setLineData] = useState<LineData | null>(null);
    const updateFrameRef = useRef<number>(0);
    const resizeObserverRef = useRef<ResizeObserver | null>(null);

    // Функция для получения позиции элемента
    const getElementPosition = useCallback((
        element: HTMLElement | null
    ): Position | null => {
        if (!element) return null;

        const rect = element.getBoundingClientRect();
        return {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2
        };
    }, []);

    // Функция для расчета линии
    const calculateLine = useCallback((): LineData | null => {
        const sourcePos = getElementPosition(sourceRef.current);
        const targetPos = getElementPosition(targetRef.current);

        if (!sourcePos || !targetPos) return null;

        const start = {
            x: sourcePos.x + offset.x,
            y: sourcePos.y + offset.y
        };

        const end = {
            x: targetPos.x + offset.x,
            y: targetPos.y + offset.y
        };

        const dx = end.x - start.x;
        const dy = end.y - start.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);

        return { start, end, distance, angle };
    }, [sourceRef, targetRef, offset, getElementPosition]);

    // Функция обновления с анимацией
    const updateLine = useCallback(() => {
        const newLineData = calculateLine();

        if (newLineData) {
            setLineData(prev => {
                // Оптимизация: обновляем только если изменилось
                if (prev &&
                    prev.start.x === newLineData.start.x &&
                    prev.start.y === newLineData.start.y &&
                    prev.end.x === newLineData.end.x &&
                    prev.end.y === newLineData.end.y) {
                    return prev;
                }
                return newLineData;
            });
        }
    }, [calculateLine]);

    // Анимированное обновление
    const animateUpdate = useCallback(() => {
        if (updateFrameRef.current) {
            cancelAnimationFrame(updateFrameRef.current);
        }

        updateFrameRef.current = requestAnimationFrame(() => {
            updateLine();
            updateFrameRef.current = undefined;
        });
    }, [updateLine]);

    // Настройка наблюдателей
    useEffect(() => {
        if (!sourceRef.current || !targetRef.current) return;
        let scrollParents;
        // Первоначальное обновление
        updateLine();

        if (autoUpdate) {
            // Наблюдаем за изменениями размеров элементов
            resizeObserverRef.current = new ResizeObserver(() => {
                animateUpdate();
            });

            if (sourceRef.current) {
                resizeObserverRef.current.observe(sourceRef.current);
            }
            if (targetRef.current) {
                resizeObserverRef.current.observe(targetRef.current);
            }

            // Отслеживаем скролл и ресайз окна
            window.addEventListener('scroll', animateUpdate, true);
            window.addEventListener('resize', animateUpdate);

            // Для iframe и вложенных скроллов
            const scrollParents = [sourceRef.current, targetRef.current].map(el => {
                let parent = el?.parentElement;
                const scrollableParents = [];
                while (parent) {
                    const overflow = window.getComputedStyle(parent).overflow;
                    if (overflow === 'auto' || overflow === 'scroll') {
                        scrollableParents.push(parent);
                    }
                    parent = parent.parentElement;
                }
                return scrollableParents;
            }).flat();

            scrollParents.forEach(parent => {
                parent.addEventListener('scroll', animateUpdate);
            });
        }

        return () => {
            if (updateFrameRef.current) {
                cancelAnimationFrame(updateFrameRef.current);
            }

            if (resizeObserverRef.current) {
                resizeObserverRef.current.disconnect();
            }

            window.removeEventListener('scroll', animateUpdate, true);
            window.removeEventListener('resize', animateUpdate);

            scrollParents.forEach(parent => {
                parent.removeEventListener('scroll', animateUpdate);
            });
        };
    }, [sourceRef, targetRef, autoUpdate, updateLine, animateUpdate]);

    return {
        lineData,
        updateLine: animateUpdate,
        isConnected: lineData !== null
    };
};