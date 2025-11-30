"use client"
import BlurSpace from "@/components/additionals/BlurSpace"
import FavoriteCardsList from "@/components/routes/profile/FavoriteCardsList"
import UserAchivment from "@/components/routes/profile/UserAchivment"
import { IUser, useUserStore } from "@/devs/store/UserStore"
import { Suspense, useEffect, useState } from "react"

const Page = () => {
    const getValues = useUserStore(state => state.getUserValues)
    const [user, setUser] = useState<IUser>()

    useEffect(() => {
        getValues().then(data => setUser(data))
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
                                <img src="#" alt="user-logo" className="profile__logo" />
                            </div>
                            <div className="profile__user-nick-id">
                                <div className="profile__user-id-container">
                                    <span className="profile__user-id">
                                        {`UId: ${user.id}`}
                                    </span>
                                </div>
                                <div className="profile__user-nick-container">
                                    <h2 className="profile__user-nick">
                                        {user.nickname}
                                    </h2>
                                </div>
                            </div>
                        </section>
                        <section className="profile__user-achivments">
                            <ul className="profile__achivments-list">
                                {[{ score: '21', title: 'Количество карт' },
                                { score: user.rating.toString(), title: 'Рейтин' }
                                ].map((v, i) =>
                                    <UserAchivment key={v.score + v.title + i} score={v.score} title={v.title} />
                                )}
                            </ul>
                        </section>
                        <FavoriteCardsList />
                    </BlurSpace>}
            </Suspense>
        </div >
    )
}

export default Page