'use client'
import { ThrowFormContext } from "@/app/auth/page"
import SearchFilter from "@/components/routes/profile/SearchFilter"
import Input from "../Input"

interface IFilterProps {
    submit: (data: any) => void;
    style: string,
}

const Filter = ({ style, submit }: IFilterProps) => {
    return (
        <ThrowFormContext style={style} formDefault={{ search: '', attribute: '', rarity: '', category: '' }} submit={submit}>
            <Input titleKey="search" />
            <SearchFilter />
        </ThrowFormContext>
    )
}

export default Filter