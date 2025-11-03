interface IUserAchivmentProps<T> {
    score: T,
    title: string
}

const UserAchivment = ({ score, title }: IUserAchivmentProps<string>) => {
    return (
        <li className="profile__achivment">
            <div className="profile__ach-container">
                <span className="profile__ach-score">
                    {score}
                </span>
            </div>
            <div className="profile__ach-container">
                <h3 className="profile__ach-title">
                    {title}
                </h3>
            </div>
        </li>
    )
}

export default UserAchivment