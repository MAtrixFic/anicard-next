import { IPreviewSelectionPetProps } from './PreviewSelectionPets';
import Image from 'next/image';
import { Delete } from '@/components/icons/Cards';
import { BACK_ORIGIN } from '@/components/server/fetches/env.config';
import { IPet } from '@/devs/store/PetsStore';
interface IPreviewPetsProps extends Partial<Omit<IPreviewSelectionPetProps, 'selectedPet' | 'setSelection' | 'thisPet'>> {
    func?: () => void;
    deleteFunc?: () => void;
    children?: React.ReactNode
    thisPet: IPet | null;
}

const PreviewPet = ({ func, thisPet, deleteFunc, children }: IPreviewPetsProps) => {
    return (
        <li className="pet-preview">
            {!thisPet ?
                <button className='pet-preview__func' onClick={func}>
                    <span className="pet-preview__null">+</span>
                </button>
                :
                <>
                    <div className="pet-preview__active-container">
                        <Image alt='pet' width={150} height={150} src={`${BACK_ORIGIN}/${thisPet.photo}`} />
                        {children}
                        <div className="pet-preview__delete-container">
                            <button className="pet-preview__delete" onClick={deleteFunc}>
                                <Delete />
                            </button>
                        </div>
                    </div>
                </>
            }
        </li >
    )
}

export default PreviewPet
