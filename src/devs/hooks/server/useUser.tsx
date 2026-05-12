'use client'
import { useUserStore } from "@/devs/store/UserStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";


export const useUser = (push: boolean = true) => {
    const getUserValues = useUserStore(state => state.getUserValues);
    const setUserValue = useUserStore(state => state.setUserValue)
    const { data } = useQuery({
        queryKey: ['user'],
        queryFn: () => getUserValues(undefined, push),
        enabled: !!sessionStorage.getItem('userId')
    })
    useEffect(() => {
        console.log('user-store', data)
    }, [data])

    return { data, setUserValue, getUserValues }
}