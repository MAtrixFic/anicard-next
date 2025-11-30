'use client'
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { CreateUser } from "@/components/server/comp/UserApi";
import LightButton from "@/components/additionals/buttons/LightButton";
import { useRouter } from "next/navigation";


const AuthPage = () => {
    const router = useRouter();

    async function SendAuth(data: any) {
        const res = await CreateUser(data.nickname)
        if (res) router.replace('/')
        console.log(res)
    }

    return (
        <div className="auth">
            <div className="auth__form-container">
                <ThrowFormContext style="auth__form" submit={SendAuth} formDefault={{ nickname: '' }}>
                    <>
                        <div className="auth__top-block">
                            <PInput />
                        </div>
                        <div className="auth__bottom-block">
                            <LightButton title={'Зарегистрироваться'} additionStyle="green" />
                        </div>
                    </>
                </ ThrowFormContext >
            </div>
        </div >
    )
}

const PInput = () => {
    const { register, formState: { errors } } = useFormContext();

    return (
        <>
            <label className="auth__label" htmlFor="auth-inpt">
                Введите никнейм
            </label>
            <div className="auth__container auth__container-nickname">
                <input {...register('nickname', { required: "Заполните поле" })} type="text" id='auth-inpt' className="auth__input" />
                {errors.nickname && < span className="auth__error">
                    {errors.nickname.message as string}
                </span>}
            </div>
        </>
    )
}

interface IThrowFormContextProps {
    children: React.ReactNode,
    formDefault: any,
    submit: (data: any) => void,
    style: string
}

export const ThrowFormContext = ({ children, formDefault, submit, style }: IThrowFormContextProps) => {
    const form = useForm({ defaultValues: formDefault });

    return (
        <FormProvider {...form}>
            <form className={style} onSubmit={form.handleSubmit(submit)}>
                {children}
            </form>
        </FormProvider>
    )
}

export default AuthPage