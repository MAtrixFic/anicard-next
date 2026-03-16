import { ThrowFormContext } from '@/app/auth/page'
import { AdminInputs } from './AdminPanel'
import FormCardFields from '@/components/additionals/form/FormCardFields'
import { useState } from 'react';
import { ICard } from '@/components/additionals/Windows/CardGlobalChoiseList';
import { useAdmin } from '@/devs/hooks/server/useAdmin';

export interface IManagePanelProps {
    closeAdminPanel: () => void,
}

const CardsPanel = ({ closeAdminPanel }: IManagePanelProps) => {
    const [loadedCard, setLoadedCard] = useState<string | null>(null);
    const { AddAdminCard } = useAdmin()

    async function DoMethod(data: ICard & { price: number }) {
        const card = Object.fromEntries(
            Object.entries(data).filter(([_, value]) =>
                value ? value.toString().length > 0 && value.toString() !== '0' : false
            )
        );
        const endCard = Object.assign(card, { photo: loadedCard })
        const res = await AddAdminCard(endCard)
        console.log(res)
    }

    return (
        <ThrowFormContext formDefault=
            {{
                character: '',
                rarity: '',
                category: 'battle',
                rating: '',
                price: '0',
                universe: '',
                attribute: ''
            }}
            submit={DoMethod}
            style="admin-panel__form"
        >
            <AdminInputs
                setLoadedCardImg={setLoadedCard}
                closeAdminPanel={closeAdminPanel}
            >
                <FormCardFields />
            </AdminInputs>
        </ThrowFormContext>
    )
}

export default CardsPanel