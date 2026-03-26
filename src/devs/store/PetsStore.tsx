import { GetAdminPets } from '@/components/server/comp/Apis';
import { create } from 'zustand';


export interface IElement {
    id: number;
    photo: string;
}

export interface IPet extends IElement {
    rarity: string;
    price: number;
}

interface IPetsStore {
    allPets: IPet[];
    userPets: IPet[];
    SetPets: (key: keyof Omit<IPetsStore, 'SetPets' | 'DeletePets' | 'GetPets'>, pets: IPet[]) => void;
    DeletePets: (key: keyof Omit<IPetsStore, 'SetPets' | 'DeletePets' | 'GetPets'>, petId: number) => void;
    GetPets: (key: keyof Omit<IPetsStore, 'SetPets' | 'DeletePets' | 'GetPets'>) => Promise<IPet[]>;
}

const usePetsStore = create<IPetsStore>((set, get) => ({
    allPets: [],
    userPets: [],
    SetPets: (key, pets) => set((state) => ({
        ...state,
        [key]: pets
    })),
    DeletePets: (key, petId) => set((state) => ({
        ...state,
        [key]: state[key].filter((pet) => pet.id !== petId)
    })),
    GetPets: async (key) => {
        if (get()[key].length <= 0) {
            const data = await GetAdminPets()
            console.log('data:', data)
            if (data.ok) {
                get().SetPets(key, data.pets);
            }
        }
        return get()[key]
    }
}));

export { usePetsStore }