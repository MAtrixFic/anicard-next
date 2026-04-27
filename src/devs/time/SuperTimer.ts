export default class SuperTimer {
    static GetSeonds = (time: string) => {
        // Целевое время (убедитесь, что оно тоже в UTC или с указанием +03:00)
        const target = new Date(time).getTime();

        // Получаем текущий UTC timestamp и принудительно добавляем 3 часа
        const nowUtcMs = Date.now();
        const moscowOffsetMs = 3600 * 1000;
        const nowMoscow = nowUtcMs - moscowOffsetMs;

        const diffMs = target - nowMoscow;
        const diffSeconds = Math.floor(diffMs / 1000);

        return diffSeconds > 0 ? diffSeconds : 0;
    }

    static ToCustomTimeString = (seconds: number) => {
        const hours = Math.floor(seconds / 3600).toString().padStart(2, '0');
        const minutes = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
        const secondsPart = (seconds % 60).toString().padStart(2, '0');
        return `${hours}:${minutes}:${secondsPart}`;
    }
}