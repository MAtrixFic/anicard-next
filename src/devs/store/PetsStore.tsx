import { GetAdminPets, GetInventoryPets } from '@/components/server/comp/Apis';
import { create } from 'zustand';


export interface IElement {
    id: number;
    photo: string;
}
export interface IPet extends IElement {
    rarity: string;
    rating: number,
    price: number;
    character: string;
    attribute: string
    current_rating: number
}
interface IPetsStore {
    adminPets: IPet[];
    battle: IPet[];
    allPets: IPet[];
    SetPets: (key: keyof Omit<IPetsStore, 'SetPets' | 'DeletePets' | 'GetPets'>, pets: IPet[]) => void;
    DeletePets: (key: keyof Omit<IPetsStore, 'SetPets' | 'DeletePets' | 'GetPets'>, petId: number) => void;
    GetPets: (key: keyof Omit<IPetsStore, 'SetPets' | 'DeletePets' | 'GetPets'>) => Promise<IPet[]>;
}

const usePetsStore = create<IPetsStore>((set, get) => ({
    allPets: [],
    adminPets: [],
    battle: [],
    SetPets: (key, pets) => set((state) => ({
        ...state,
        [key]: pets
    })),
    DeletePets: (key, petId) => set((state) => ({
        ...state,
        [key]: state[key].filter((pet) => pet.id !== petId)
    })),
    GetPets: async (key) => {
        if (key === 'adminPets') {
            const data = await GetAdminPets()
            if (data.ok) {
                get().SetPets(key, data.pets);
            }

        }
        else {
            const data = await GetInventoryPets(key === 'allPets' ? undefined : key)
            if (data.ok) {
                get().SetPets(key, data.pets);
            }
        }

        return get()[key]
    }
}));

export { usePetsStore }