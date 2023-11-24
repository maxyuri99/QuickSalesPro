import { apiQsp } from "../services/api.js";
import { useState } from "react";
import { createContext } from "react"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export const UserContext = createContext({})

export const UserProvier = ({ children }) => {

    const [user, setUser] = useState(null);

    const navigate = useNavigate()

    const userLogout = () => {
        setUser(null);
        navigate("/");
        toast.success("Logout efeturado com sucesso!")
        localStorage.removeItem("@TOKEN");
    }

    const userLogin = async (formData , setLoading, reset) => {
        try {
            setLoading(true)
            const { data } = await apiQsp.post("/v1/usuarios/login", formData)
            console.log(formData)
            setUser(data.nome)
            localStorage.setItem("@TOKEN", data.token)
            reset()
            toast.success("Login efeturado com sucesso!")
            navigate("/dashboard")
        } catch (error) {
            const errorMessage = JSON.stringify(error.response?.data.erro);
            const cleanedErrorMessage = errorMessage.replace(/["']/g, "");
            toast.error(`${cleanedErrorMessage}`);
        } finally {
            setLoading(false)
        }
    }

    return (
        <UserContext.Provider value={{ userLogout, user, userLogin }}>
            {children}
        </UserContext.Provider>
    )
}