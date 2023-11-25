import { apiQsp } from "../services/api.js"
import { useState } from "react"
import { useEffect } from "react"
import { createContext } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"


export const UserContext = createContext({})

export const UserProvier = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)

    const { state } = useLocation();

    const pathname = window.location.pathname

    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem("@TOKENREFRESH")
        const userId = localStorage.getItem("@USERID")

        const getUser = async () => {
            try {
                setLoading(true)
                const { data } = await apiQsp.get(`/v1/usuarios/refresh/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setUser(data.user)
                localStorage.setItem("@TOKENACESS", data.tokenAccess)
                navigate(pathname)
            } catch (error) {
                const errorMessage = JSON.stringify(error.response?.data.erro)
                const cleanedErrorMessage = errorMessage.replace(/["']/g, "")
                toast.error(`${cleanedErrorMessage}`)
            } finally {
                setLoading(false)
            }
        }

        if (token && userId) {
            getUser()
        }
    }, [])

    const userLogin = async (formData, setLoading, reset) => {
        try {
            setLoading(true)
            const { data } = await apiQsp.post("/v1/usuarios/login", formData)
            setUser(data.user)
            localStorage.setItem("@TOKENACESS", data.tokenAccess)
            localStorage.setItem("@TOKENREFRESH", data.tokenRefresh)
            localStorage.setItem("@USERID", data.user.id_usuario)
            reset()
            toast.success("Login efeturado com sucesso!")
            navigate(state?.lastRoute ? state.lastRoute : pathname)
        } catch (error) {
            const errorMessage = JSON.stringify(error.response?.data.erro)
            const cleanedErrorMessage = errorMessage.replace(/["']/g, "")
            toast.error(`${cleanedErrorMessage}`)
        } finally {
            setLoading(false)
        }
    }

    const userLogout = () => {
        setUser(null)
        navigate("/")
        toast.success("Logout efeturado com sucesso!")
        localStorage.removeItem("@TOKENACESS")
        localStorage.removeItem("@TOKENREFRESH")
        localStorage.removeItem("@USERID")
    }

    return (
        <UserContext.Provider value={{ loading, userLogout, user, userLogin }}>
            {children}
        </UserContext.Provider>
    )
}