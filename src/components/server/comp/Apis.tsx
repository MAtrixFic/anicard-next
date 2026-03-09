'use server'

import { AxiosResponse } from "axios";
import { cookies } from "next/headers";
import UserApi from "./UserApi"
import setCookieParser from 'set-cookie-parser';
import AdminApi from "./AdminApi";
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
export const GetUser = UserApi.GetUser
export const CreateUser = UserApi.CreateUser
export const GetTopUsers = UserApi.GetTopUsers

//admin api
export const GetCards = AdminApi.GetCards
export const AddCard = AdminApi.AddCard
export const DeleteCard = AdminApi.DeleteCard

//twists api
export const AddTwistsCard = TwistApi.AddTwistCard

//inventory api
export const GetInventoryCards = InventoryApi.GetInventoryCards
export const SetInventoryCards = InventoryApi.SetInventoryCards
export const DeleteInventoryCards = InventoryApi.DeleteInventoryCards

//shop api
export const GetShopCards = ShopApi.GetShopCards
export const BuySpecialCards = ShopApi.BuySpecialCards
export const BuyKeys = ShopApi.BuyKeys