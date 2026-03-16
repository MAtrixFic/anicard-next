'use client'
import { usePetsStore } from "@/devs/store/PetsStore"

const usePets = () => {
    const getPets = usePetsStore(state => state.GetPets)

    return { getPets }
}

export default usePets
