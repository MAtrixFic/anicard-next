"use client"
import BlurSpace from "@/components/additionals/BlurSpace"
import FavoriteCardsList from "@/components/routes/profile/FavoriteCardsList"
import UserAchivment from "@/components/routes/profile/UserAchivment"
import { Suspense, lazy } from "react"
import { useUser } from "@/devs/hooks/server/useUser"
import Image from "next/image"

// const lazyStats = lazy(()=> import(''))

const Page = () => {
    const { data } = useUser()
    console.log(data)
    return (
        <div className="profile">
            <Suspense fallback={<div className="profile__loading">Загрузка...</div>}>
                {data &&
                    <BlurSpace>
                        < section className="profile__user-label">
                            <div className="profile__logo-container">
                                <Image height={100} width={100} src={sessionStorage.getItem('avatar') || '/avatar/default-avatar.jpg'} alt="default-avatar" className="profile__logo" />
                            </div>
                            <div className="profile__user-nick-id">
                                <div className="profile__user-id-container">
                                    <span className="profile__user-id">
                                        {`UId: ${data?.id}`}
                                    </span>
                                </div>
                                <div className="profile__user-nick-container">
                                    <h2 className="profile__user-nick">
                                        {data?.nickname}
                                    </h2>
                                </div>
                            </div>
                        </section>
                        <section className="profile__user-achivments">
                            <ul className="profile__achivments-list">
                                {[{ score: `${21}`, title: 'Количество карт' },
                                { score: data.rating?.toString() || '100', title: 'Рейтин' }
                                ].map((v, i) =>
                                    <UserAchivment key={v.score + v.title + i} score={v.score} title={v.title} />
                                )}
                            </ul>
                        </section>
                        <FavoriteCardsList user={data} />
                    </BlurSpace>}
            </Suspense>
        </div >
    )
}

export default Page