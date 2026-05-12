import { create } from "zustand";
import { IUserResponse } from "@/components/server/comp/UserApi";
import { GetUser } from "@/components/server/comp/Apis";

export interface IUser {
    nickname: string,
    id: number,
    isAdmin: boolean
    coin: number,
    battleCoin: number,
    rating: number,
    keys: number,
    avatar: string,
    cardsCount: number
}
export interface IUserStore extends Partial<IUser> {
    setUserData: (arg: Omit<IUserStore, 'setUserData' | 'getUserValues' | 'setUserValue'>) => void,
    getUserValues: (key?: keyof IUser, push?: boolean) => Promise<any>,
    setUserValue: (key: keyof IUser, value: any) => void;
}

const useUserStore = create<IUserStore>((set, get) => ({
    avatar: undefined,
    nickname: undefined,
    id: undefined,
    isAdmin: undefined,
    coin: undefined,
    battleCoin: undefined,
    cardsCount: undefined,
    rating: undefined,
    keys: undefined,
    setUserValue: (key, value) => set(state => ({
        ...state,
        [key]: value
    })),
    setUserData: (arg) => set(state => ({
        ...state,
        nickname: arg.nickname,
        id: arg.id,
        coin: arg.coin,
        isAdmin: arg.isAdmin,
        battleCoin: arg.battleCoin,
        rating: arg.rating,
        keys: arg.keys,
        cardsCount: arg.cardsCount
    })),
    getUserValues: async (key, push = false) => {
        console.log('get user')
        if (key) {
            if (get()[key]) {
                return get()[key]
            }
            else {
                const data = await GetUser();
                if (data) {
                    const resData = data as IUserResponse
                    console.log("key user", data)
                    get().setUserData({
                        id: resData.user.user_id,
                        nickname: resData.user.nickname,
                        coin: resData.user.coin,
                        battleCoin: resData.user.battle_coin,
                        rating: resData.user.rating,
                        isAdmin: resData.isAdmin,
                        keys: resData.user.card_keys?.[0]?.key ?? 0,
                        cardsCount: resData.user.total_cards ?? 0
                    })
                    return get()[key]
                }
            }
        }
        else {
            if (push) {
                const data = await GetUser();
                if (data) {
                    console.log("all user", data)
                    const resData = data as IUserResponse
                    get().setUserData({
                        id: resData.user.user_id,
                        nickname: resData.user.nickname,
                        coin: resData.user.coin,
                        battleCoin: resData.user.battle_coin,
                        rating: resData.user.rating,
                        isAdmin: resData.isAdmin,
                        keys: resData.user.card_keys?.[0]?.key ?? 0,
                        cardsCount: resData.user.total_cards ?? 0
                    })
                }
            }
            else
                if (Object.values(get()).includes(undefined)) {
                    const data = await GetUser();
                    if (data) {
                        const resData = data as IUserResponse
                        get().setUserData({
                            id: resData.user.user_id,
                            nickname: resData.user.nickname,
                            coin: resData.user.coin,
                            battleCoin: resData.user.battle_coin,
                            rating: resData.user.rating,
                            isAdmin: resData.isAdmin,
                            keys: resData.user.card_keys?.[0]?.key ?? 0,
                            cardsCount: resData.user.total_cards ?? 0
                        })
                    }
                }
            return {
                id: get().id,
                nickname: get().nickname,
                coin: get().coin,
                battleCoin: get().battleCoin,
                rating: get().rating,
                isAdmin: get().isAdmin,
                keys: get().keys,
                cardsCount: get().cardsCount
            }
        }
    }
}));

export { useUserStore }