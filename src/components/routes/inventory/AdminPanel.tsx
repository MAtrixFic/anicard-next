import BaseList from "@/components/additionals/BaseList";
import LightButton from "@/components/additionals/buttons/LightButton";
import OverBlackSpace from "@/components/additionals/OverBlackSpace";
import { ICard } from "@/components/additionals/Windows/CardGlobalChoiseList";
import useOverWindowStatus from "@/devs/hooks/useOverWindowStatus";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { ThrowFormContext } from "@/app/auth/page";
import { useAdmin } from "@/devs/hooks/server/useAdmin";

interface IAdminPanelProps {
    setAdminMode: (mode: 'no' | 'edit' | 'create') => void,
    adminMode: 'no' | 'edit' | 'create',
    card?: ICard,
    method?: <T>(args?: T) => void;
}


const AdminPanel = ({ setAdminMode, adminMode, card, method }: IAdminPanelProps) => {
    const { AddAdminCard, RemoveAdminCard } = useAdmin()
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

    async function DoMethod(data: Omit<ICard, 'photo' | 'id'> & { price: number }) {
        console.log(JSON.stringify({
            photo: loadedCard || '',
            price: data.price,
            character: data.character,
            attribute: data.attribute,
            category: data.category,
            rarity: data.rarity,
            rating: data.rating,
            universe: data.universe
        }))
        const res = await AddAdminCard({
            photo: loadedCard || '',
            price: data.price,
            character: data.character,
            attribute: data.attribute,
            category: data.category,
            rarity: data.rarity,
            rating: data.rating,
            universe: data.universe
        })
        console.log(res)
        CloseAdminPanel()
    }

    return (
        <OverBlackSpace additionStyle={ws}>
            <div className="admin-panel" >
                <ThrowFormContext formDefault={{ name: '', rarity: '', category: '', rating: '' }} submit={DoMethod} style="admin-panel__form">
                    <section className="admin-panel__section admin-panel__section-card">
                        <div className="admin-panel__card-preview">
                            <ImageUploader preloadImage={card?.photo} loadBase64Image={setLoadedCard} />
                        </div>
                        <div className="admin-panel__card-options">
                            <div className="admin-panel__input-container">
                                <AdminInput title="Название" titleKey="ср" />
                            </div>
                            <div className="admin-panel__input-container">
                                <AdminInput title="Цена" type="number" titleKey="price" />
                            </div>
                            <div className="admin-panel__input-container">
                            </div>
                            <div className="admin-panel__input-container">
                                <AdminInput title="Рейтинг" type="number" titleKey="rating" />
                            </div>
                            <BaseList naming={{ title: 'Вселенная', titleKey: 'universe' }} values={{ 'base': 'Нормисная' }} />
                            <BaseList naming={{ title: 'Редкость', titleKey: 'rarity' }} values={{ 'S': 'S', 'A': 'A', 'A+': 'A+' }} />
                            <BaseList naming={{ title: 'Категория', titleKey: 'category' }} values={{ 'battle': 'battle', 'favorite': 'favorite' }} />
                            <BaseList naming={{ title: 'Атрибут', titleKey: 'attribute' }} values={{ 'Сила': 'Сила', 'Ловкость': 'Ловкость', 'Интеллекс': 'Интеллекс' }} />
                        </div>
                    </section>
                    <section className="admin-panel__section admin-panel__section-logic">
                        <LightButton title="Сохранить" additionStyle="green" submit={true} />
                        <LightButton title="Отмена" additionStyle="purple" func={CloseAdminPanel} />
                    </section>
                </ThrowFormContext>
            </div>
        </OverBlackSpace >
    )
}

interface IAdminInputProps {
    titleKey: string,
    title: string,
    type?: 'number' | 'text'
}

const AdminInput = ({ title, titleKey, type = 'text' }: IAdminInputProps) => {
    const formContext = useFormContext();
    return (
        <label className="admin-panel__input-label">
            {title}
            <input {...formContext.register(titleKey)} type={type} className="admin-panel__input-inpt" />
        </label>
    )
}

interface IImageUploaderProps {
    preloadImage?: string,
    loadBase64Image: (image: string) => void
}

const ImageUploader = ({ preloadImage, loadBase64Image }: IImageUploaderProps) => {
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
        if (image)
            loadBase64Image(image)
    }, [image])
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