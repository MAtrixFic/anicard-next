import { useFormContext } from "react-hook-form"
import BaseList from "../BaseList"
import BaseInputWithList from "../BaseInputWithList";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { GetUniverses } from "@/components/server/comp/Apis";

export const attributes: Record<string, string> = {
    'огонь': 'Огонь',
    'ветер': 'Ветер',
    'лава': 'Лава',
    'вода': 'Вода',
    'молния': 'Молния',
    'земля': 'Земля',
    'взрыв': 'Взрыв',
    'жара': 'Жара',
    'лёд': 'Лёд',
    'шторм': 'Шторм',
    'дерево': 'Дерево',
    'кипение': 'Кипение',
    'кристалл': 'Кристалл',
    'магнетизм': 'Магнетизм',
    'песок': 'Песок',
    'скорость': 'Скорость',
    'сталь': 'Сталь',
    'тьма': 'Тьма',
    'космос': 'Космос'
};

export const attributesImages: Record<string, string> = {
    'огонь': '/elements/fire.png',
    'ветер': '/elements/wind.png',
    'лава': '/elements/fire.png',
    'вода': '/elements/water.png',
    'молния': '/elements/lightning.png',
    'земля': '/elements/earth.png',
    'взрыв': '/elements/explosion.png',
    'жара': '/elements/heat.png',
    'лёд': '/elements/ice.png',
    'шторм': '/elements/storm.png',
    'дерево': '/elements/wood.png',
    'кипение': '/elements/water.png',
    'кристалл': '/elements/crystal.png',
    'магнетизм': '/elements/magnetism.png',
    'песок': '/elements/sand.png',
    'скорость': '/elements/speed.png',
    'сталь': '/elements/steel.png',
    'тьма': '/elements/darkness.png',
    'космос': '/elements/space.png'
};

export const cardAttributeWeaknesses: Record<string, string[]> = {
    огонь: ["вода", "песок"],
    ветер: ["огонь", "жара"],
    молния: ["ветер", "шторм"],
    земля: ["молния", "кристалл"],
    вода: ["земля", "дерево"],
    взрыв: ["молния", "кипение"],
    жара: [],
    лава: ["вода", "песок"],
    лёд: ["огонь", "жара"],
    шторм: ["земля", "магнетизм"],
    дерево: ["огонь", "лава"],
    кипение: ["ветер", "лёд"],
    кристалл: ["вода", "взрыв"],
    магнетизм: ["земля", "дерево"],
    песок: ["ветер", "шторм"],
    скорость: ["сталь", "космос"],
    сталь: ["тьма", "космос"],
    тьма: ["скорость", "космос"],
    космос: []
};

const FormCardFields = () => {
    const formContext = useFormContext()
    const [category, setCategory] = useState<string>(formContext.getValues('category'));
    const { data } = useQuery({
        queryKey: ['universes'],
        queryFn: GetUniverses
    })

    return (
        <>
            <BaseList naming={{ title: 'Категория', titleKey: 'category' }} values={{ 'battle': 'battle', 'collectible': 'collectible' }} onChange={() => setCategory(formContext.getValues('category'))} />
            {['battle'].includes(category) && <BaseInputWithList naming={{ title: 'Вселенная', titleKey: 'universe' }} values={data ? data as string[] : []} />}
            <BaseList naming={{ title: 'Редкость', titleKey: 'rarity' }} values={{ 'S': 'S', 'A': 'A', 'B': 'B', 'C': 'C' }} />
            {['battle'].includes(category) && <BaseList naming={{ title: 'Атрибут', titleKey: 'attribute' }} values={attributes} />}
            <div className="admin-panel__input-container">
                <AdminInput title="Название" titleKey="character" />
            </div>
            {/* {['special'].includes(category) && <div className="admin-panel__input-container">
                <AdminInput title="Цена" type="number" titleKey="price" />
            </div>} */}
            {['battle'].includes(category) && <div className="admin-panel__input-container">
                <AdminInput title="Рейтинг" type="number" titleKey="rating" />
            </div>}
        </>
    )
}

interface IAdminInputProps {
    titleKey: string,
    title: string,
    type?: 'number' | 'text'
}

export const AdminInput = ({ title, titleKey, type = 'text' }: IAdminInputProps) => {
    const formContext = useFormContext();
    return (
        <label className="admin-panel__input-label">
            {title}
            <input {...formContext.register(titleKey)} type={type} className="admin-panel__input-inpt" />
        </label>
    )
}

export default FormCardFields
