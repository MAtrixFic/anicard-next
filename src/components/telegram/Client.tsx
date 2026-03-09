'use client'

import { useRawInitData } from '@telegram-apps/sdk-react';
import { parse } from '@telegram-apps/init-data-node';
import { useEffect } from 'react';
import { IUserResponse } from '../server/comp/UserApi';
import { AuthUser } from '../server/comp/Apis';
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
            if (parseInitData.user?.photo_url) {
                sessionStorage.setItem('avatar', parseInitData.user?.photo_url)
                setUserValue("avatar", parseInitData.user?.photo_url)
            }
            console.log(sessionStorage.getItem('userId'))
            if (sessionStorage.getItem('userId') == null) {
                sessionStorage.setItem('userId', parseInitData.user?.id.toString() || JSON.stringify(null))
                CookieSet('userId', parseInitData.user?.id)
                AuthUser(rawInitData).then(data => {
                    console.log("user auth:", data);
                    if (data) {
                        CookieSet('isAuth', JSON.stringify(true))
                        CookieSet('isAdmin', JSON.stringify((data as IUserResponse).isAdmin))
                    }
                    else {
                        router.replace('/auth')
                    }
                })
            }
        }
    }, [])

    return (
        <></>
    )
}