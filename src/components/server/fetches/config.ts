import axios from "axios";
import { BACK_ORIGIN } from "./env.config";
import { RefreshUser, UpdateToken } from "../comp/Apis";

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

    public static async POST(endpoint: string, params?: any, headers?: any) {
        return await FetchMG.api.post(endpoint, params, { headers });
    }

    public static async DELETE(endpoint: string, params?: any, headers?: any) {
        return await FetchMG.api.delete(endpoint, { params: params, headers });
    }
}

// FetchMG.api.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//         if (error.response?.status === 401) {
//             if (error.response.data.detail.includes('Access')) {
//                 const data = await RefreshUser()
//                 if (data) {
//                     console.log(data)
//                     await UpdateToken(data[0])
//                 }
//             }
//         }
//         console.error(`[Global Interceptor] 401 Unauthorized on ${error.config?.url}`, {
//             method: error.config?.method,
//             message: error.response.data.detail
//         });
//         return { ok: false }
//     }
// );

export default FetchMG