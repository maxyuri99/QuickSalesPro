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
        const trimmedLogin = formData.login.trim()
        userLogin({ ...formData, login: trimmedLogin }, setLoading, reset)
    }

    return (
        <form onSubmit={handleSubmit(submit)} >
            <div className={styles.flexbox}>
                <Input label="Login:" type="text" {...register("login")} error={errors.login} disabled={loading} />
                <InputPassword label="Senha:" {...register("senha")} error={errors.senha} disabled={loading} />
                <div className="flexgap2">
                    <button type="submit" className="btn solid primary hover full">Entrar</button>
                    <div className="paragraph center">
                        {loading ? "acessando..." : ""}
                    </div>
                </div>
            </div>
        </form>
    )
}