import LightButton from "@/components/additionals/buttons/LightButton";
import OverBlackSpace from "@/components/additionals/OverBlackSpace";
import { ICard } from "@/components/additionals/Windows/CardGlobalChoiseList";
import useOverWindowStatus from "@/devs/hooks/useOverWindowStatus";
import NextImage from "next/image";
import { useEffect, useState } from "react";
import { useAdmin } from "@/devs/hooks/server/useAdmin";
import CardsPanel from "./CardsPanel";
import PetsPanel from "./PetsPanel";
interface IAdminPanelProps {
    setAdminMode: (mode: 'no' | 'edit' | 'create') => void,
    card?: ICard,
}

type TAdminManage = 'cards' | 'pets'

const AdminPanel = ({ setAdminMode, card }: IAdminPanelProps) => {
    const [ws, setWS, setWSTimer] = useOverWindowStatus(300);
    const [ctype, setCType] = useState<TAdminManage>('cards')

    useEffect(() => {
        setWSTimer();
    }, [])

    function CloseAdminPanel() {
        setWSTimer();
        setTimeout(() => {
            setAdminMode('no');
        }, 300);
    }

    return (
        <OverBlackSpace additionStyle={ws}>
            <div className="admin-panel" >
                <section className="admin-panel__top">
                    <ul className="admin-panel__mode-list">
                        <li className="admin-panel__mode-element">
                            <button className="admin-panel__btn" onClick={() => setCType('cards')}>
                                Карты
                            </button>
                        </li>
                        <li className="admin-panel__mode-element">
                            <button className="admin-panel__btn" onClick={() => setCType('pets')}>
                                Питомцы
                            </button>
                        </li>
                    </ul>
                </section>
                <>
                    {ctype == 'cards' ? <CardsPanel closeAdminPanel={CloseAdminPanel} /> :
                        <PetsPanel closeAdminPanel={CloseAdminPanel} />
                    }
                </>
            </div>
        </OverBlackSpace >
    )
}

interface IAdminInputsProps {
    setLoadedCardImg: (img: string | null) => void,
    closeAdminPanel: () => void,
    children: React.ReactNode
}

export const AdminInputs = ({ setLoadedCardImg, closeAdminPanel, children }: IAdminInputsProps) => {
    return (
        <>
            <section className="admin-panel__section admin-panel__section-card">
                <div className="admin-panel__card-preview">
                    <ImageUploader LoadImage={setLoadedCardImg} />
                </div>
                <div className="admin-panel__card-options">
                    {children}
                </div>
            </section>
            <section className="admin-panel__section admin-panel__section-logic">
                <LightButton title="Сохранить" submit={true} />
                <LightButton title="Отмена" submit={false} func={closeAdminPanel} />
            </section>
        </>
    )
}

interface IImageUploaderProps {
    LoadImage: (image: string) => void
}

const ImageUploader = ({ LoadImage }: IImageUploaderProps) => {
    const [previewImage, setPreviewImage] = useState<string>('');

    return (
        <div className="image-uploader">
            <label className="image-uploader__label">
                {(previewImage) ? <div className="image-uploader__preview">
                    <NextImage src={previewImage} alt="card-preview" height={160} width={112} />
                </div>
                    :
                    <div className="image-uploader__preview" />
                }
                <input onChange={async (e) => {
                    if (e.target.files && e.target.files[0]) {
                        setPreviewImage(URL.createObjectURL(e.target.files[0]))
                        LoadImage((await fileToBase64Extended(e.target.files[0])).base64)
                    }
                }} type="file" className="image-uploader__input" />
            </label>
        </div>
    )
}

export default AdminPanel
export { ImageUploader }


type Base64Result = {
    base64: string;
    content: string;
    mimeType: string;
    fileName: string;
    size: number;
};

async function fileToBase64Extended(file: File): Promise<Base64Result> {
    return new Promise((resolve, reject) => {
        const maxSize = 10 * 1024 * 1024;
        if (file.size > maxSize) {
            reject(new Error(`File size exceeds ${maxSize / 1024 / 1024}MB limit`));
            return;
        }

        const reader = new FileReader();

        reader.onload = () => {
            if (typeof reader.result === 'string') {
                const base64String = reader.result;
                // Извлекаем только содержимое base64 (без префикса)
                const base64Content = base64String.split(',')[1] || '';

                resolve({
                    base64: base64String,
                    content: base64Content,
                    mimeType: file.type,
                    fileName: file.name,
                    size: file.size
                });
            } else {
                reject(new Error('Failed to convert file to base64'));
            }
        };

        reader.onerror = () => {
            reject(new Error(`Error reading file: ${reader.error?.message || 'Unknown error'}`));
        };

        reader.onabort = () => {
            reject(new Error('File reading was aborted'));
        };

        reader.readAsDataURL(file);
    });
}