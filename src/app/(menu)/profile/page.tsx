"use client"
import BlurSpace from "@/components/additionals/BlurSpace"
import FavoriteCardsList from "@/components/routes/profile/FavoriteCardsList"
import UserAchivment from "@/components/routes/profile/UserAchivment"
import { TUser } from "@/components/server/comp/UserApi"
import { useUser } from "@/devs/hooks/server/useUser"
import { Suspense, useMemo } from "react"

const Page = () => {
    const { data, isError, isLoading } = useUser();

    const userData = useMemo(() => {
        return data ? (data as TUser).user : null
    }, [data])

    return (
        <div className="profile">
            <Suspense fallback={<div className="profile__loading">Загрузка...</div>}>
                {userData &&
                    <BlurSpace>
                        < section className="profile__user-label">
                            <div className="profile__logo-container">
                                <img src="#" alt="user-logo" className="profile__logo" />
                            </div>
                            <div className="profile__user-nick-id">
                                <div className="profile__user-id-container">
                                    <span className="profile__user-id">
                                        {`UId: ${userData.user_id}`}
                                    </span>
                                </div>
                                <div className="profile__user-nick-container">
                                    <h2 className="profile__user-nick">
                                        {userData.nickname}
                                    </h2>
                                </div>
                            </div>
                        </section>
                        <section className="profile__user-achivments">
                            <ul className="profile__achivments-list">
                                {[{ score: '21', title: 'Количество карт' },
                                { score: userData.rating.toString(), title: 'Рейтин' }
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