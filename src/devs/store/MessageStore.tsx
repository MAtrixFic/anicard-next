import { create } from "zustand";

export type Tmessage = {
    id: string
    type: 'error' | 'message',
    text: string
}

interface IMessageStore {
    addMessage: (message: Omit<Tmessage, 'id'>) => void,
    removeMessage: (message: Tmessage) => void,
    messages: Tmessage[]
}

const useMessageStore = create<IMessageStore>((set, get) => ({
    messages: [],
    addMessage: (message) => set(state => {
        const UUID = window.crypto.randomUUID();
        setTimeout(() => {
            get().removeMessage({ ...message, id: UUID });
        }, 5000)
        return ({
            ...state,
            messages: [...state.messages, { ...message, id: UUID }]
        })
    }),
    removeMessage: (message) => set(state => {
        return ({
            ...state,
            messages: state.messages.filter(v => v.id !== message.id)
        })
    })
}))

export default useMessageStore