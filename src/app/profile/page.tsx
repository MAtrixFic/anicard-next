import BlurSpace from "@/components/additionals/BlurSpace"
import PurpleButton from "@/components/additionals/PurpleButton"
import FavoriteCardsList from "@/components/routes/profile/FavoriteCardsList"
import UserAchivment from "@/components/routes/profile/UserAchivment"

const Page = () => {
    return (
        <div className="profile">
            <BlurSpace>
                <div className="profile__edit-btn">
                    <PurpleButton title="Редактировать" additionStyle="tiny" />
                </div>
                <section className="profile__user-label">
                    <div className="profile__logo-container">
                        <img src="#" alt="user-logo" className="profile__logo" />
                    </div>
                    <div className="profile__user-nick-id">
                        <div className="profile__user-id-container">
                            <span className="profile__user-id">
                                UId: 42141454532
                            </span>
                        </div>
                        <div className="profile__user-nick-container">
                            <h2 className="profile__user-nick">
                                MAtrix
                            </h2>
                        </div>
                    </div>
                </section>
                <section className="profile__user-achivments">
                    <ul className="profile__achivments-list">
                        {[{ score: '21', title: 'Количество карт' },
                        { score: '34', title: 'Достижения' },
                        { score: '14', title: 'Боевые жетоны' },
                        { score: '10', title: 'Место в рейтинге' }
                        ].map((v, i) =>
                            <UserAchivment key={v.score + v.title + i} score={v.score} title={v.title} />
                        )}
                    </ul>
                </section>
                <FavoriteCardsList />
            </BlurSpace>
        </div>
    )
}

export default Page