import { Input } from "../Input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginFormSchema } from "./loginFormSchema"
import { InputPassword } from "../InputPassword"
import { useState } from "react"
import styles from "./style.module.scss"
import { useContext } from "react"
import { UserContext } from "../../../providers/UserContext"

export const LoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: zodResolver(loginFormSchema)
    })

    const [loading, setLoading] = useState(false)

    const { userLogin } = useContext(UserContext)

    const submit = (formData) => {
        userLogin(formData, setLoading, reset)
    }

    return (
        <form onSubmit={handleSubmit(submit)} className={styles.flexbox}>
            <Input label="Seu Login" type="text" placeholder="joao.carlor" {...register("login")} error={errors.login} disabled={loading} />
            <InputPassword label="Sua Senha" {...register("senha")} error={errors.senha} disabled={loading} />
            <div>
                <button type="submit">Entrar</button>
                {loading ? "acessando..." : "acessar"}
            </div>
        </form>
    )
}