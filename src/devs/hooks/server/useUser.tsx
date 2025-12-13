import { useUserStore } from "@/devs/store/UserStore";
import { useQuery } from "@tanstack/react-query";


export const useUser = (push?: boolean) => {
    const getUserValues = useUserStore(state => state.getUserValues);

    const { data } = useQuery({
        queryKey: ['user'],
        queryFn: () => getUserValues(undefined, push)
    })
    return { data }
}