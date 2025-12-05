import { useFormContext } from "react-hook-form"
import BaseList from "../BaseList"
import { useState } from "react";

const FormCardFields = () => {
    const formContext = useFormContext()
    const [category, setCategory] = useState<string>(formContext.getValues('category'));
    return (
        <>
            <BaseList naming={{ title: 'Категория', titleKey: 'category' }} values={{ 'battle': 'battle', 'special': 'special', 'collectible': 'collectible' }} onChange={() => setCategory(formContext.getValues('category'))} />
            {['battle'].includes(category) && <BaseList naming={{ title: 'Вселенная', titleKey: 'universe' }} values={{ 'base': 'Нормисная' }} />}
            <BaseList naming={{ title: 'Редкость', titleKey: 'rarity' }} values={{ 'S': 'S', 'A': 'A', 'A+': 'A+' }} />
            {['battle', 'special'].includes(category) && <BaseList naming={{ title: 'Атрибут', titleKey: 'attribute' }} values={{ 'Сила': 'Сила', 'Ловкость': 'Ловкость', 'Интеллекс': 'Интеллекс' }} />}
            {['collectible'].includes(category) && <div className="admin-panel__input-container">
                <AdminInput title="Название" titleKey="character" />
            </div>}
            {['special'].includes(category) && <div className="admin-panel__input-container">
                <AdminInput title="Цена" type="number" titleKey="price" />
            </div>}
            {['battle', 'special'].includes(category) && <div className="admin-panel__input-container">
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

const AdminInput = ({ title, titleKey, type = 'text' }: IAdminInputProps) => {
    const formContext = useFormContext();
    return (
        <label className="admin-panel__input-label">
            {title}
            <input {...formContext.register(titleKey)} type={type} className="admin-panel__input-inpt" />
        </label>
    )
}

export default FormCardFields
