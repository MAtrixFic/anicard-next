'use server'
import axios from "axios";
import { BACK_ORIGIN } from "./env.config";

class FetchMG {
    public static origin: string = BACK_ORIGIN + '/';
    public static api = axios.create({
        baseURL: FetchMG.origin,
        timeout: 5000,
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true,
    })

    public static async GET(endpoint: string, params?: any, headers?: any) {
        return await FetchMG.api.get(endpoint, { params: params, headers });
    }

    public static async POST(endpoint: string, params?: any) {
        return await FetchMG.api.post(endpoint, params);
    }

    public static async DELETE(endpoint: string, params?: any) {
        return await FetchMG.api.delete(endpoint, params);
    }
}

FetchMG.api.interceptors.request.use((config) => {
    config.headers['X-No-Proxy'] = 'true';
    return config;
});

export default FetchMG