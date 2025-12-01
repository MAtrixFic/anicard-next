import axios from "axios";

class FetchMG {
    public static origin: string = process.env.BACK_ORIGIN || 'https://obviously-vocal-seagull.cloudpub.ru';
    public static api = axios.create({
        baseURL: FetchMG.origin,
        timeout: 5000,
        headers: {
            'Content-Type': 'application/json',
        }
    });

    public static async GET(endpoint: string, params?: any) {
        return await FetchMG.api.get(endpoint, { params: params });
    }

    public static async POST(endpoint: string, params?: any) {
        return await FetchMG.api.post(endpoint, params);
    }

    public static async DELETE(endpoint: string, params?: any) {
        return await FetchMG.api.delete(endpoint, params);
    }
}

export default FetchMG