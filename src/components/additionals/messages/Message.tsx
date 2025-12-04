import { Tmessage } from "@/devs/store/MessageStore";

interface IMessageProps extends Omit<Tmessage, 'id'> { }

const Message = ({ type, text }: IMessageProps) => {
    return (
        <div className={`message ${type}`}>
            <section className="message__section message__section-text">
                <div className="message__container message__container-texg">
                    <span className="message__text">
                        {text}
                    </span>
                </div>
            </section>
            <section className="message__section message__section-icon">
                <div className="message__container message__container-icon">
                    <span className="message__text">
                        {type === 'error' ? '!' : '@'}
                    </span>
                </div>
            </section>
        </div>
    )
}

export default Message