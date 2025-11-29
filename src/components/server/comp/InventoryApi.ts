'use server'
import FetchMG from "../fetches/config"

export type TCardType = 'favorite' | 'battle'
export async function GetCards(userId: string, cardType?: TCardType) {
    try {
        const res = await FetchMG.GET(`inventory/${userId}${cardType ? `/${cardType}` : ''}`)
        console.log(res.data)
        return res.data
    }
    catch (error) {
        const errorData = (error as { respose: { data: any } }).respose.data
        console.log(errorData)
        return (errorData)
    }
}