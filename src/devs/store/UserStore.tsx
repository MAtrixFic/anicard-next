import { create } from "zustand";
import { GetUser, IUserResponse } from "@/components/server/comp/UserApi";
import { CookieGet } from "@/components/server/CookieManager";

export interface IUser {
    nickname: string,
    id: number,
    isAdmin: boolean
    coin: number,
    battleCoin: number,
    rating: number,
}
export interface IUserStore extends Partial<IUser> {
    setUserData: (arg: Omit<IUserStore, 'setUserData' | 'getUserValues'>) => void,
    getUserValues: (key?: keyof IUser) => Promise<any>
}

const useUserStore = create<IUserStore>((set, get) => ({
    nickname: undefined,
    id: undefined,
    isAdmin: undefined,
    coin: undefined,
    battleCoin: undefined,
    rating: undefined,
    setUserData: (arg) => set(state => ({
        ...state,
        nickname: arg.nickname,
        id: arg.id,
        coin: arg.coin,
        isAdmin: arg.isAdmin,
        battleCoin: arg.battleCoin,
        rating: arg.rating
    })),
    getUserValues: async (key) => {
        if (key) {
            if (get()[key]) {
                return get()[key]
            }
            else {
                const userId = await CookieGet('userId')
                if (userId) {
                    const data = await GetUser(userId.value);
                    if (data) {
                        const resData = data as IUserResponse
                        get().setUserData({
                            id: resData.user.user_id,
                            nickname: resData.user.nickname,
                            coin: resData.user.coin,
                            battleCoin: resData.user.battle_coin,
                            rating: resData.user.rating,
                            isAdmin: resData.isAdmin
                        })
                        return get()[key]
                    }
                }
            }
        }
        else {
            if (Object.values(get()).includes(undefined)) {
                const userId = await CookieGet('userId')
                if (userId) {
                    const data = await GetUser(userId.value);
                    if (data) {
                        const resData = data as IUserResponse
                        get().setUserData({
                            id: resData.user.user_id,
                            nickname: resData.user.nickname,
                            coin: resData.user.coin,
                            battleCoin: resData.user.battle_coin,
                            rating: resData.user.rating,
                            isAdmin: resData.isAdmin
                        })
                    }
                }
            }
            return {
                id: get().id,
                nickname: get().nickname,
                coin: get().coin,
                battleCoin: get().battleCoin,
                rating: get().rating,
                isAdmin: get().isAdmin
            }
        }
    }
}));

export { useUserStore }