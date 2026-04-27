import usePets from "@/devs/hooks/server/usePets"
import { useEffect, useState } from "react"
import { IPetWithId } from "./Bunner"
import PreviewSelectionPets, { PetFrame } from "@/components/additionals/pets/PreviewSelectionPets"
import useSelection from "@/devs/hooks/useSelection"
import LightButton from "@/components/additionals/buttons/LightButton"
import OverBlackSpace from "@/components/additionals/OverBlackSpace"

interface IExpSelector {
    closeWindow: () => void,
    openedStatus: string,
    expIndex: number,
    onAccept: (...args: any) => void
}

const ExpSelector = ({ closeWindow, openedStatus, expIndex, onAccept }: IExpSelector) => {
    const [allPets, setAllPets] = useState<IPetWithId[]>([])
    const [selection, setSelection] = useSelection<IPetWithId>(true, '.exp-selector__list')
    const { getPets } = usePets()
    useEffect(() => {
        getPets('allPets').then(p => {
            setAllPets(p)
        })
    }, [])
    return (
        <OverBlackSpace additionStyle={openedStatus}>
            <div className="exp-selector">
                <div className="exp-selector__main">
                    <ul className="exp-selector__list">
                        {allPets.map(pet =>
                            <PreviewSelectionPets
                                key={pet.id}
                                setSelection={setSelection}
                                selectedPet={selection}
                                thisPet={pet}
                            >
                                <PetFrame
                                    rarity={pet.rarity}
                                    name={pet.character}
                                    rating={pet.rating.toString()}
                                    attribute={pet.attribute}
                                />
                            </PreviewSelectionPets>
                        )}
                    </ul>
                </div>
                <div className="exp-selector__logic">
                    <LightButton func={closeWindow} title="Отмена" />
                    <LightButton func={() => onAccept(selection?.id, expIndex)} title="Принять" active={selection != null} />
                </div>
            </div>
        </OverBlackSpace>
    )
}

export default ExpSelector