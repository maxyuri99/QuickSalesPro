import { apiQsp } from "../services/api.js"
import { useState, useEffect } from "react"
import { createContext } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

export const UserContext = createContext({})

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({ cargo: 0 })
    const [loading, setLoading] = useState(false)

    const { state } = useLocation()
    const pathname = window.location.pathname
    const navigateUser = useNavigate()

    const token = localStorage.getItem("@TOKENACESS")
    const userId = localStorage.getItem("@USERID")

    // Item que verifica o Header se está expandido ou não
    const [isHeaderExpanded, setHeaderExpanded] = useState(true);

    //############ Verificação de token e autenticação #############
    const verifyToken = async () => {
        try {
            setLoading(true)
            const { data } = await apiQsp.get(`/v1/usuarios/refresh/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            setUser(data.user)
            localStorage.setItem("@TOKENACESS", data.tokenAccess)
            navigateUser(pathname)
        } catch (error) {
            setUser({ cargo: 0 })
            console.log(error)
            userLogout("Sessão expirada1. Faça login novamente.")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            // Verificar o token a cada 5 horas
            verifyToken()
        }, 5 * 60 * 60 * 1000)

        // Limpa o intervalo quando o componente é desmontado
        return () => clearInterval(intervalId)
    }, [token, userId, pathname, navigateUser])
    //#########################################################

    // ############## Login e Logout do usuario ##############
    const userLogin = async (formData, setLoading, reset) => {
        try {
            setLoading(true)
            const { data } = await apiQsp.post("/v1/usuarios/login", formData)
            setUser(data.user)
            localStorage.setItem("@TOKENACESS", data.tokenAccess)
            localStorage.setItem("@USERID", data.user.id_usuario)
            reset()
            toast.success("Login efeturado com sucesso!")
            navigateUser(state?.lastRoute ? state.lastRoute : pathname)
        } catch (error) {
            const errorMessage = JSON.stringify(error.response?.data.erro)
            const cleanedErrorMessage = errorMessage.replace(/["']/g, "")
            toast.error(`${cleanedErrorMessage}`)
        } finally {
            setLoading(false)
        }
    }

    const userLogout = (toastLabel) => {
        localStorage.removeItem("@TOKENACESS")
        localStorage.removeItem("@USERID")
        setUser({ cargo: 0 })
        navigateUser("/quicksalespro/")
        toast.info(toastLabel)
    }
    // #########################################################

    // ############## Atualiza o cargo do usuario ##############
    const userGetCheck = async (idUser) => {
        try {
            const { data } = await apiQsp.get(`/v1/usuarios/id/${idUser}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            setUser(data)
        } catch (error) {
            const errorMessage = JSON.stringify(error.response?.data.erro)
            console.log(errorMessage)
        } finally {

        }
    }

    useEffect(() => {
        if (user.cargo === 0 && userId !== null) {
            userGetCheck(userId)
        }
    }, [user])
    // ############################################################

    return (
        <UserContext.Provider value={{ loading, userLogout, user, userLogin, verifyToken, navigateUser, isHeaderExpanded, setHeaderExpanded, }}>
            {children}
        </UserContext.Provider>
    )
}