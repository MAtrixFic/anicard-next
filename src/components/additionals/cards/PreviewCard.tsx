import { useEffect, useState } from "react"
import { Plus, Delete } from "../../icons/Cards"

interface IPreviewCardProps {
    func?: () => void;
    deleteFunc?: () => void;
    src?: string
}

const PreviewCard = ({ func, deleteFunc, src }: IPreviewCardProps) => {
    const [isSetCard, setIsSetCard] = useState<boolean>(false)

    useEffect(() => {
        setIsSetCard(src ? true : false)
    }, [src])

    return (
        <li className="card" onClick={func}>
            <button className="card__active-container">
                {isSetCard ?
                    <div className="card__preview-container">
                        {deleteFunc && <div className="card__delete-container">
                            <button className="card__delete" onClick={deleteFunc}>
                                <Delete />
                            </button>
                        </div>
                        }
                        <img src={src} alt="card-preivew" className="card__preview" />
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