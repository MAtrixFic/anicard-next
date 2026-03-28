import { IPet } from '@/devs/store/PetsStore';
import { IPreviewSelectionPetProps } from './PreviewSelectionPets';
import PreviewSelectionPets, { PetFrame } from './PreviewSelectionPets';
import { Delete } from '@/components/icons/Cards';

interface IPreviewPetsProps extends Partial<Omit<IPreviewSelectionPetProps, 'selectedPet' | 'setSelection'>> {
    func?: () => void;
    deleteFunc?: () => void;
    setSelection: () => void
}

const PreviewPet = ({ func, thisPet, deleteFunc, setSelection }: IPreviewPetsProps) => {
    return (
        <li className="pet-preview">
            {!thisPet ?
                <button className='pet-preview__func' onClick={func}>
                    <span className="pet-preview__null">+</span>
                </button>
                :
                <>
                    {thisPet.character}
                    <div className="pet-preview__delete-container">
                        <button className="pet-preview__delete" onClick={deleteFunc}>
                            <Delete />
                        </button>
                    </div>
                </>
            }
        </li >
    )
}

export default PreviewPet
