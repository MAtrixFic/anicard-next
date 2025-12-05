import LightButton from "@/components/additionals/buttons/LightButton";
import OverBlackSpace from "@/components/additionals/OverBlackSpace";
import { ICard } from "@/components/additionals/Windows/CardGlobalChoiseList";
import useOverWindowStatus from "@/devs/hooks/useOverWindowStatus";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ThrowFormContext } from "@/app/auth/page";
import { useAdmin } from "@/devs/hooks/server/useAdmin";
import FormCardFields from "@/components/additionals/form/FormCardFields";

interface IAdminPanelProps {
    setAdminMode: (mode: 'no' | 'edit' | 'create') => void,
    // adminMode: 'no' | 'edit' | 'create',
    card?: ICard,
}


const AdminPanel = ({ setAdminMode, card }: IAdminPanelProps) => {
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

    async function DoMethod(data: ICard & { price: number }) {
        const filteredResult = Object.fromEntries(
            Object.entries(data).filter(([_, value]) =>
                value ? value.toString().length > 0 && value.toString() !== '0' : false
            )
        );
        console.log(filteredResult)
        // console.log(filteredKeys, loadedCard)
        const res = await AddAdminCard(Object.assign(filteredResult, { photo: loadedCard || undefined }))
        console.log(res)
        CloseAdminPanel()
    }

    return (
        <OverBlackSpace additionStyle={ws}>
            <div className="admin-panel" >
                <ThrowFormContext formDefault=
                    {{
                        character: '',
                        rarity: '',
                        category: 'battle',
                        rating: '',
                        price: '0',
                        universe: '',
                        attribute: ''
                    }}
                    submit={DoMethod}
                    style="admin-panel__form"
                >
                    <AdminInputs
                        setLoadedCardImg={setLoadedCard}
                        closeAdminPanel={CloseAdminPanel}
                        card={card}
                    />
                </ThrowFormContext>
            </div>
        </OverBlackSpace >
    )
}

interface IAdminInputsProps {
    setLoadedCardImg: (img: string | null) => void,
    closeAdminPanel: () => void,
    card?: ICard
}

const AdminInputs = ({ setLoadedCardImg, closeAdminPanel, card }: IAdminInputsProps) => {
    return (
        <>
            <section className="admin-panel__section admin-panel__section-card">
                <div className="admin-panel__card-preview">
                    <ImageUploader preloadImage={card?.photo} loadBase64Image={setLoadedCardImg} />
                </div>
                <div className="admin-panel__card-options">
                    <FormCardFields />
                </div>
            </section>
            <section className="admin-panel__section admin-panel__section-logic">
                <LightButton title="Сохранить" additionStyle="green" submit={true} />
                <LightButton title="Отмена" additionStyle="purple" submit={false} func={closeAdminPanel} />
            </section>
        </>
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