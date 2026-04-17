export default class SuperTimer {
    static GetSeonds = (time: string) => {
        const fixed = time.replace(/(\.\d{3})\d+/, '$1');
        const pastDate = new Date(fixed);
        const now = Date.now();
        const diffMs = now - pastDate.getTime();
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