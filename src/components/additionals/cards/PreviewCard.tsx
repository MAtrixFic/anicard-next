import { useEffect, useState } from "react"
import { Plus, Delete } from "../../icons/Cards"
import Image from "next/image";
import { IPreviewSelectionCardProps } from "./PreviewSelectionCard";

interface IPreviewCardProps extends Partial<Omit<IPreviewSelectionCardProps, 'selectedCard'>> {
    func?: () => void;
    deleteFunc?: () => void;
}

const PreviewCard = ({ func, deleteFunc, thisCard, setSelection }: IPreviewCardProps) => {
    const [isSetCard, setIsSetCard] = useState<boolean>(false)

    useEffect(() => {
        setIsSetCard(thisCard?.src ? true : false)
    }, [thisCard])

    return (
        <li className={`card card-${thisCard?.rang?.toLocaleLowerCase() || ''}`} onClick={func}>
            <button className="card__active-container">
                {isSetCard ?
                    <div className="card__preview-container">
                        {deleteFunc && <div className="card__delete-container">
                            <button className="card__delete" onClick={deleteFunc}>
                                <Delete />
                            </button>
                        </div>
                        }
                        {thisCard &&
                            <Image
                                priority
                                height={140}
                                width={100}
                                quality={80}
                                src={thisCard.src}
                                alt="card-preivew"
                                className="card__preview"
                            />}
                    </div>
                    :
                    <div className="card__set-container">
                        <Plus />
                    </div>
                }
            </button>
        </li>
    )
}
export default PreviewCard