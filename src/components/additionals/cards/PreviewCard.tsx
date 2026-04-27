import { useEffect, useState } from "react"
import { Plus, Delete } from "../../icons/Cards"
import Image from "next/image";
import { IPreviewSelectionCardProps } from "./PreviewSelectionCard";
import { BACK_ORIGIN } from "@/components/server/fetches/env.config";

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
        <li className={`card-preview card-${thisCard?.rarity?.toLocaleLowerCase() || ''}`} onClick={func}>
            <div className="card-preview__active-prev-container">
                {isSetCard ?
                    <div className="card-preview__preview-container">
                        {deleteFunc && <div className="card-preview__delete-container">
                            <button className="card-preview__delete" onClick={deleteFunc}>
                                <Delete />
                            </button>
                        </div>
                        }
                        {thisCard &&
                            <Image
                                priority
                                height={192}
                                width={192}
                                quality={80}
                                src={`${BACK_ORIGIN}/${thisCard.photo}`}
                                alt="card-preivew"
                                className="card-preview__preview"
                            />}
                    </div>
                    :
                    <div className="card-preview__set-container">
                        <Plus />
                    </div>
                }
            </div>
        </li>
    )
}
export default PreviewCard