"use client"
import BlurSpace from "@/components/additionals/BlurSpace"
import FavoriteCardsList from "@/components/routes/profile/FavoriteCardsList"
import UserAchivment from "@/components/routes/profile/UserAchivment"
import { IUser, useUserStore } from "@/devs/store/UserStore"
import { Suspense, useEffect, useState } from "react"
import Image from "next/image"

const Page = () => {
    const getValues = useUserStore(state => state.getUserValues)
    const [user, setUser] = useState<IUser>()

    useEffect(() => {
        getValues().then(data => getValues('avatar').then(ava => setUser({ ...data, avatar: ava })))
    }, [])

    useEffect(() => {
        console.log(user)
    }, [user])

    return (
        <div className="profile">
            <Suspense fallback={<div className="profile__loading">Загрузка...</div>}>
                {user &&
                    <BlurSpace>
                        < section className="profile__user-label">
                            <div className="profile__logo-container">
                                <Image height={100} width={100} src={user.avatar} alt="default-avatar" className="profile__logo" />
                            </div>
                            <div className="profile__user-nick-id">
                                <div className="profile__user-id-container">
                                    <span className="profile__user-id">
                                        {`UId: ${user?.id}`}
                                    </span>
                                </div>
                                <div className="profile__user-nick-container">
                                    <h2 className="profile__user-nick">
                                        {user?.nickname}
                                    </h2>
                                </div>
                            </div>
                        </section>
                        <section className="profile__user-achivments">
                            <ul className="profile__achivments-list">
                                {[{ score: '21', title: 'Количество карт' },
                                { score: user.rating?.toString() || '100', title: 'Рейтин' }
                                ].map((v, i) =>
                                    <UserAchivment key={v.score + v.title + i} score={v.score} title={v.title} />
                                )}
                            </ul>
                        </section>
                        <FavoriteCardsList user={user} />
                    </BlurSpace>}
            </Suspense>
        </div >
    )
}

export default Page