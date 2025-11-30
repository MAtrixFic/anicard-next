import { IUser, useUserStore } from "@/devs/store/UserStore";
import { useEffect, useState } from "react";


export const useUser = () => {
    const getUserValues = useUserStore(state => state.getUserValues);
    const [user, setUser] = useState<IUser>()
    useEffect(() => {
        getUserValues().then(data => setUser(data))
    }, [])
    return { user, setUser }
}