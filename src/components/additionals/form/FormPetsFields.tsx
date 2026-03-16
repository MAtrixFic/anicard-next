import BaseList from "../BaseList";
import { AdminInput } from "./FormCardFields";

const FormPetsFields = () => {
    return (
        <>
            <div className="admin-panel__input-container">
                <BaseList naming={{ title: 'Редкость', titleKey: 'rarity' }} values={{ 'S': 'S', 'A': 'A', 'B': 'B', 'C': 'C' }} />
            </div>
            <div className="admin-panel__input-container">
                <AdminInput title="Цена" type="number" titleKey="price" />
            </div>
        </>
    )
}

export default FormPetsFields