'use server'

import { cookies } from "next/headers";
import UserApi from "./UserApi"
import AdminApi from "./AdminApi";
import { InventoryApi, TwistApi } from "./InventoryApi";
import ShopApi from "./ShopApi";
import PVEApi from "./PVEApi";
import UpgradeApi from "./UpgradeApi";
import { BattleApi } from "./BattleApi";


export interface IError {
    response: {
        data: {
            detail: string
        }
    }
}

//user api
export const AuthUser = async (initData: any) => {
    'use server'
    const cookiesStorage = await cookies();
    const authData = await UserApi.AuthUser(initData)
    if (authData) {
        cookiesStorage.set('access_token', authData.access_token, {
            expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: true,
        });
        cookiesStorage.set('refresh_token', authData.refresh_token, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: true,
        });
        return true
    }
    return false
}

export const UpdateToken = async (access: string) => {
    'use server'
    const cookiesStorage = await cookies();
    if (access) {
        console.log('updated token', access)
        cookiesStorage.set('access_token', access, {
            expires: new Date(Date.now() + 60 * 60 * 1000),
            httpOnly: true,
            secure: true,
        });
    }
}

export const RefreshUser = async () => {
    try {
        const res = await UserApi.RefreshToken();
        if (res === false) return false
        return { access_token: res.access_token, refresh_token: res.refresh_token }
    }
    catch (error) {
        console.log(error)
        return false
    }
}

export const GetAuthCookie = async () => {
    const cookieStore = await cookies()

    const access = cookieStore.get('access_token')
    const refresh = cookieStore.get('refresh_token')

    return { access, refresh }
}

export const GetUser = UserApi.GetUser
export const CreateUser = UserApi.CreateUser
export const GetTopUsers = UserApi.GetTopUsers
export const GetUserKeys = UserApi.GetUserKeys
//admin api
export const GetCards = AdminApi.GetCards
export const DeleteCard = AdminApi.DeleteCard
export const DeletePet = AdminApi.DeletePet
export const UploadPhotoForCard = async (data: File) => {
    console.log(data)
}
export const GetUniverses = AdminApi.GetUniverses

//twists api
export const AddTwistsCard = TwistApi.AddTwistCard

//inventory api
export const GetInventoryCards = InventoryApi.GetInventoryCards
export const SetInventoryCards = InventoryApi.SetInventoryCards
export const DeleteInventoryCards = InventoryApi.DeleteInventoryCards
export const DeleteInventoryPets = InventoryApi.DeleteInventoryPets
export const SetInventoryPets = InventoryApi.SetInventoryPets
export const GetAdminPets = InventoryApi.GetAdminPets
export const GetInventoryPets = InventoryApi.GetInventoryPets

//shop api
export const GetShopPets = ShopApi.GetShopPets
export const BuyPet = ShopApi.BuyPet
export const BuyKeys = ShopApi.BuyKeys
export const BuyExpForPet = ShopApi.BuyExpForPet

// pve api
export const GetStars = PVEApi.GetStars
export const StartStar = PVEApi.StartStar
export const GetCurrentStar = PVEApi.GetCurrentStar
export const ClaimStar = PVEApi.ClaimStar

// upgrade api
export const GetCardUpgradeInfo = UpgradeApi.GetCardUpgradeInfo
export const UpgradeCard = UpgradeApi.UpgradeCard
export const GetPetUpgradeInfo = UpgradeApi.GetPetUpgradeInfo
export const UpgradePet = UpgradeApi.UpgradePet

// battle api
export const GetOpponetData = BattleApi.GetOpponentData