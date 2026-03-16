import { ThrowFormContext } from '@/app/auth/page';
import { useState } from 'react'
import { AdminInputs } from './AdminPanel';
import FormPetsFields from '@/components/additionals/form/FormPetsFields';
import type { IManagePanelProps } from './CardsPanel';
import { useAdmin } from '@/devs/hooks/server/useAdmin';
import { ICard } from '@/components/additionals/Windows/CardGlobalChoiseList';

const PetsPanel = ({ closeAdminPanel }: IManagePanelProps) => {
    const [loadedCard, setLoadedCard] = useState<string | null>(null);
    const { AddAdminPets } = useAdmin()


    async function DoMethod(data: ICard & { price: number }) {
        const card = Object.fromEntries(
            Object.entries(data).filter(([_, value]) =>
                value ? value.toString().length > 0 && value.toString() !== '0' : false
            )
        );
        const endCard = Object.assign(card, { photo: loadedCard })
        const res = await AddAdminPets(endCard)
        console.log(res)
    }

    return (
        <ThrowFormContext formDefault=
            {{
                rarity: '',
                price: '0',
            }}
            submit={DoMethod}
            style="admin-panel__form"
        >
            <AdminInputs
                setLoadedCardImg={setLoadedCard}
                closeAdminPanel={closeAdminPanel}
            >
                <FormPetsFields />
            </AdminInputs>
        </ThrowFormContext>
    )
}

export default PetsPanel
