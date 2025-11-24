'use client'
import Input from "@/components/additionals/Input"
import SearchFilter from "@/components/routes/profile/SearchFilter"
import PreviewSelectionCard from "@/components/additionals/cards/PreviewSelectionCard"
import { useCardsStore } from "@/devs/store/CardsStore"
import useSelectionCard from "@/devs/hooks/useSelection"
import { CardDesctiption, ICard } from "@/components/additionals/Windows/CardGlobalChoiseList"
import LightButton from "@/components/additionals/buttons/LightButton"
import useOverWindowStatus from "@/devs/hooks/useOverWindowStatus"
import MarketOfferWindow from "@/components/additionals/Windows/MarketOfferWindow"
import { createPortal } from "react-dom"
import { useUserStore } from "@/devs/store/UserStore"
import OverBlackSpace from "@/components/additionals/OverBlackSpace"
import { useEffect, useState } from "react"
import BaseList from "@/components/additionals/BaseList"
import Image from "next/image"


const Page = () => {
    const cards = useCardsStore(state => state.allCards)
    const [selectedCard, setSelectedCard] = useSelectionCard<ICard>()
    const [marketWindowStatus, setMarketWindowStatus, setMarketWindowVisibility] = useOverWindowStatus(400);
    const isAdmin = useUserStore(state => state.isAdmin);

    const [adminMode, setAdminMode] = useState<'no' | 'edit' | 'create'>('no')

    return (
        <div className="cards-choise">
            <div className="cards-choise__list-container">
                <section className="cards-choise__filter pd">
                    <Input />
                    <SearchFilter />
                </section>
                <section className="cards-choise__cards-list">
                    <ul className="cards-choise__list">
                        {cards.map((v, i) =>
                            <PreviewSelectionCard
                                key={v?.id + i}
                                setSelection={setSelectedCard}
                                selectedCard={selectedCard}
                                thisCard={v}
                            />
                        )}
                    </ul>
                </section>
            </div>
            {selectedCard && <div className="desc-panel">
                <div className="desc-panel__admin-logic">
                    <LightButton title='Редактировать' additionStyle="green" func={() => setAdminMode('edit')} />
                    <LightButton title='Удалить' additionStyle="purple" func={() => { }} />
                </div>
                <LightButton title='Выставить на обмен' additionStyle="green" func={setMarketWindowVisibility} />
                {['opened', 'to-hide'].includes(marketWindowStatus) && selectedCard &&
                    createPortal(<MarketOfferWindow card={selectedCard} func={setMarketWindowVisibility} additionStyle={marketWindowStatus} />, document.body)
                }
                <CardDesctiption
                    opts={selectedCard ? [{ key: 'Ранг', value: selectedCard.rang }] : []}
                    name={selectedCard?.name}
                />
            </div>}
            {['edit', 'create'].includes(adminMode) && <AdminPanel setAdminMode={setAdminMode} adminMode={adminMode} card={selectedCard as ICard} />}
        </div>
    )
}

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
                            <BaseList defaultValue={card?.rang} title='Редкость' values={{ 'S': 'S', 'A': 'A', 'A+': 'A+' }} />
                            <BaseList title='Категория' values={{ 'battle': 'Боевые', 'special': 'Специальные', 'collection': 'Коллекционные' }} />
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
                {(image || preloadImage) && <div className="image-uploader__preview">
                    <Image src={image ? image : preloadImage ? preloadImage : ''} alt="card-preview" height={160} width={112} />
                </div>}
                <input onChange={async (e) => {
                    if (e.target.files && e.target.files[0]) {
                        await GetImage(e.target.files[0]);
                    }
                }} type="file" className="image-uploader__input" />
            </label>
        </div>
    )
}
export default Page