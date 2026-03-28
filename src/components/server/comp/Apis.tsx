'use server'

import { AxiosResponse } from "axios";
import { cookies } from "next/headers";
import UserApi from "./UserApi"
import setCookieParser from 'set-cookie-parser';
import AdminApi, { TCardWithPhoto } from "./AdminApi";
import { InventoryApi, TwistApi } from "./InventoryApi";
import ShopApi from "./ShopApi";

//user api
export const AuthUser = async (initData: any) => {
    try {
        const res = (await UserApi.AuthUser(initData) as AxiosResponse);
        const setCookieHeader = res.headers['set-cookie'];
        const cookiesStorage = await cookies();
        if (setCookieHeader) {
            const parsedCookies = setCookieParser.parse(setCookieHeader);

            parsedCookies.forEach((c) => {
                cookiesStorage.set(c.name, c.value, {
                    httpOnly: true,
                    secure: c.secure,
                    path: c.path,
                    expires: c.expires,
                });
                console.log("cookie added")
            });
        }
        return res.data
    }
    catch {
        return false
    }

}

export const RefreshUser = async () => {
    try {
        const res = (await UserApi.RefreshToken() as AxiosResponse);
        const setCookieHeader = res.headers['set-cookie'];
        const cookiesStorage = await cookies();
        if (setCookieHeader) {
            const parsedCookies = setCookieParser.parse(setCookieHeader);

            parsedCookies.forEach((c) => {
                cookiesStorage.set(c.name, c.value, {
                    httpOnly: true,
                    secure: c.secure,
                    path: c.path,
                    expires: c.expires,
                });
                console.log("cookie added")
            });
        }
        return res.data
    }
    catch {
        return false
    }
}
export const GetUser = UserApi.GetUser
export const CreateUser = UserApi.CreateUser
export const GetTopUsers = UserApi.GetTopUsers
export const GetUserKeys = UserApi.GetUserKeys

//admin api
export const GetCards = AdminApi.GetCards
export const DeleteCard = AdminApi.DeleteCard
export const UploadPhotoForCard = async (data: File) => {
    console.log(data)
}

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