export default class SuperTimer {
    static GetSeonds = (time: string) => {
        const target = new Date(time).getTime();
        const now = Date.now();

        const diffMs = target - now;
        const diffSeconds = Math.floor(diffMs / 1000);
        return diffSeconds
    }

    static ToCustomTimeString = (seconds: number) => {
        const hours = Math.floor(seconds / 3600).toString().padStart(2, '0');
        const minutes = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
        const secondsPart = (seconds % 60).toString().padStart(2, '0');
        return `${hours}:${minutes}:${secondsPart}`;
    }
}