import React, { useRef, useEffect, useState } from 'react';

interface IVideoPlayerProps {
    images: string[];
    fps?: number;
    width?: number;
    height?: number;
    isPlaying: boolean;
    onFrameChange?: (frame: number) => void;
}

const VideoPlayer = ({
    images,
    fps = 10,
    width = 800,
    height = 600,
    isPlaying,
    onFrameChange
}: IVideoPlayerProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        if (!isPlaying || !images.length) return;

        const interval = setInterval(() => {
            setCurrentImageIndex(prev => {
                const nextIndex = (prev + 1) % images.length;
                onFrameChange?.(nextIndex);
                return nextIndex;
            });
        }, 1000 / fps);

        return () => clearInterval(interval);
    }, [isPlaying, fps, images.length, onFrameChange]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!ctx || !images.length) return;

        const img = new Image();
        img.onload = () => {
            ctx.clearRect(0, 0, width, height);
            ctx.drawImage(img, 0, 0, width, height);
        };
        img.src = images[currentImageIndex];
    }, [currentImageIndex, width, height, images]);

    return (
        <canvas
            ref={canvasRef}
            width={width}
            height={height}
        />
    );
};

export default VideoPlayer;