'use client'

import { useRawInitData } from '@telegram-apps/sdk-react';
import { parse } from '@telegram-apps/init-data-node';
import { useEffect } from 'react';
import { AuthUser, IUserResponse } from '../server/comp/UserApi';
import { useUserStore } from '@/devs/store/UserStore';
import { CookieSet } from '../server/CookieManager';
import { useRouter } from 'next/navigation';


export default function TelegramInit() {
    const rawInitData = useRawInitData();
    const setUserValue = useUserStore(state => state.setUserValue);
    const router = useRouter();

    useEffect(() => {
        if (rawInitData) {
            const parseInitData = parse(rawInitData)
            setUserValue("avatar", parseInitData.user?.photo_url)
            CookieSet('userId', parseInitData.user?.id)
            AuthUser(rawInitData).then(data => {

                console.log("init-data:", data)
                if (data) {
                    CookieSet('isAuth', JSON.stringify(true))
                    CookieSet('isAdmin', JSON.stringify((data as IUserResponse).isAdmin))
                }
                else {
                    router.replace('/auth')
                }
            })
        }
    }, [])

    return (
        <></>
    )
}