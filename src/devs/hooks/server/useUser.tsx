import { useQuery } from "@tanstack/react-query"
import { GetUser } from "@/components/server/comp/UserApi"
import { CookieGet } from "@/components/server/CookieManager"

export const useUser = () => {
    const { data, isError, isLoading } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const userId = await CookieGet('userId')
            console.log(userId)
            return userId?.value ? await GetUser(userId.value) : undefined;
        }
    })
    return { data, isError, isLoading }
}