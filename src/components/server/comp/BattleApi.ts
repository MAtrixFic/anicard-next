import { GET } from "../fetches/AuthFetch"

export class BattleApi {
    static async GetOpponentData(opId: number) {
        try {
            console.log(`battle/info/${opId}`)
            const res = await GET(`battle/info/${opId}`)
            console.log(res.data)
            return res.data
        }
        catch (error) {
            console.log(error)
            return { ok: false }
        }
    }
}