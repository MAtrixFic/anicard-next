'use client'
import { useUserStore } from "@/devs/store/UserStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";


export const useUser = (push: boolean = true) => {
    const getUserValues = useUserStore(state => state.getUserValues);
    const id = useUserStore(state => state.id)
    const setUserValue = useUserStore(state => state.setUserValue)
    const { data } = useQuery({
        queryKey: ['user', id],
        queryFn: () => getUserValues(undefined, push)
    })
    useEffect(() => {
        console.log('user-store', data)
    }, [])

    return { data, setUserValue, getUserValues }
}