import BaseList from "@/components/additionals/BaseList";
import LightButton from "@/components/additionals/buttons/LightButton";
import OverBlackSpace from "@/components/additionals/OverBlackSpace";
import { ICard } from "@/components/additionals/Windows/CardGlobalChoiseList";
import useOverWindowStatus from "@/devs/hooks/useOverWindowStatus";
import Image from "next/image";
import { useEffect, useState } from "react";

interface IAdminPanelProps {
    setAdminMode: (mode: 'no' | 'edit' | 'create') => void,
    adminMode: 'no' | 'edit' | 'create',
    card?: ICard,
    method?: <T>(args?: T) => void;
}

const AdminPanel = ({ setAdminMode, adminMode, card, method }: IAdminPanelProps) => {
    const [ws, setWS, setWSTimer] = useOverWindowStatus(300);
    const [loadedCard, setLoadedCard] = useState<string | null>(null);

    useEffect(() => {
        setWSTimer();
    }, [])

    function CloseAdminPanel() {
        setWSTimer();
        setTimeout(() => {
            setAdminMode('no');
        }, 300);
    }

    function DoMethod() {
        // method();
        setWSTimer();
        setTimeout(() => {
            setAdminMode('no');
        }, 300);
    }

    return (
        <OverBlackSpace additionStyle={ws}>
            <div className="admin-panel" >
                <div className="admin-panel__form">
                    <section className="admin-panel__section admin-panel__section-card">
                        <div className="admin-panel__card-preview">
                            <ImageUploader preloadImage={card?.src} />
                        </div>
                        <div className="admin-panel__card-options">
                            <div className="admin-panel__input-container">
                                <label className="admin-panel__input-label">
                                    Название
                                    <input defaultValue={card?.name} type="text" className="admin-panel__input-inpt" />
                                </label>
                            </div>
                            <div className="admin-panel__input-container">
                                <label className="admin-panel__input-label">
                                    Рейтинг
                                    <input defaultValue={card?.options.rating} type="number" className="admin-panel__input-inpt" />
                                </label>
                            </div>
                            <BaseList naming={{ title: 'Редкость', titleKey: 'rarity' }} values={{ 'S': 'S', 'A': 'A', 'A+': 'A+' }} />
                            <BaseList naming={{ title: 'Категория', titleKey: 'category' }} values={{ 'battle': 'Боевые', 'special': 'Специальные', 'collection': 'Коллекционные' }} />
                        </div>
                    </section>
                    <section className="admin-panel__section admin-panel__section-logic">
                        <LightButton title="Сохранить" additionStyle="green" func={DoMethod} />
                        <LightButton title="Отмена" additionStyle="purple" func={CloseAdminPanel} />
                    </section>
                </div>
            </div>
        </OverBlackSpace >
    )
}

interface IImageUploaderProps {
    preloadImage?: string
}

const ImageUploader = ({ preloadImage }: IImageUploaderProps) => {
    const [image, setImage] = useState<string | null>(null);

    const fileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = () => {
                resolve(reader.result as string);
            };

            reader.onerror = (error) => {
                reject(error);
            };

            reader.readAsDataURL(file);
        });
    };

    async function GetImage(file: File) {
        const image = await fileToBase64(file);
        setImage(image);
    }

    useEffect(() => {

    }, [])
    return (
        <div className="image-uploader">
            <label className="image-uploader__label">
                {(image || preloadImage) ? <div className="image-uploader__preview">
                    <Image src={image ? image : preloadImage ? preloadImage : ''} alt="card-preview" height={160} width={112} />
                </div>
                    :
                    <div className="image-uploader__preview" />
                }
                <input onChange={async (e) => {
                    if (e.target.files && e.target.files[0]) {
                        await GetImage(e.target.files[0]);
                    }
                }} type="file" className="image-uploader__input" />
            </label>
        </div>
    )
}

export default AdminPanel
export { ImageUploader }