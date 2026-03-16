import { GetAdminPets } from '@/components/server/comp/Apis';
import { create } from 'zustand';

export interface IPets {
    id: number;
    photo: string;
    rarity: string;
    price: number;
}

interface IPetsStore {
    allPets: IPets[];
    userPets: IPets[];
    SetPets: (key: keyof Omit<IPetsStore, 'SetPets' | 'DeletePets' | 'GetPets'>, pets: IPets[]) => void;
    DeletePets: (key: keyof Omit<IPetsStore, 'SetPets' | 'DeletePets' | 'GetPets'>, petId: number) => void;
    GetPets: (key: keyof Omit<IPetsStore, 'SetPets' | 'DeletePets' | 'GetPets'>) => Promise<IPets[]>;
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