import { useEffect, useState } from "react"
import { Plus, Delete } from "../../icons/Cards"
import Image from "next/image";
import { IPreviewSelectionCardProps } from "./PreviewSelectionCard";

interface IPreviewCardProps extends Partial<Omit<IPreviewSelectionCardProps, 'selectedCard'>> {
    func?: () => void;
    deleteFunc?: () => void;
}

const PreviewCard = ({ func, deleteFunc, thisCard }: IPreviewCardProps) => {
    const [isSetCard, setIsSetCard] = useState<boolean>(false)

    useEffect(() => {
        setIsSetCard(thisCard?.id ? true : false)
    }, [thisCard])

    return (
        <li className={`card card-${thisCard?.rarity?.toLocaleLowerCase() || ''}`} onClick={func}>
            <div className="card__active-container">
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
                                src={`https://obviously-vocal-seagull.cloudpub.ru${thisCard.photo}`}
                                alt="card-preivew"
                                className="card__preview"
                            />}
                    </div>
                    :
                    <div className="card__set-container">
                        <Plus />
                    </div>
                }
            </div>
        </li>
    )
}
export default PreviewCard