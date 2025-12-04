'use client'

import useMessageStore from "@/devs/store/MessageStore"
import Message from "./Message";

const MessageController = () => {
    const messages = useMessageStore(state => state.messages)

    return (
        <div className="message-controller">
            <ul className="message-controller__list">
                {messages.map(({ id, text, type }) =>
                    <Message key={id} text={text} type={type} />
                )}
            </ul>
        </div>
    )
}

export default MessageController