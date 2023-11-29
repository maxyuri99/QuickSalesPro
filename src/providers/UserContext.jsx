import { apiQsp } from "../services/api.js"
import { useState, useEffect, useRef } from "react"
import { createContext } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

export const UserContext = createContext({})

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({cargo:0})
    const [loading, setLoading] = useState(false)

    const { state } = useLocation()
    const pathname = window.location.pathname
    const navigate = useNavigate()

    const renewalTimeoutRef = useRef(null)

    useEffect(() => {
        const token = localStorage.getItem("@TOKENREFRESH")
        const userId = localStorage.getItem("@USERID")

        const getUser = async () => {
            try {
                setLoading(true)
                const { data } = await apiQsp.get(`/v1/usuarios/refresh/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                setUser(data.user)
                localStorage.setItem("@TOKENACESS", data.tokenAccess)
                navigate(pathname)
            } catch (error) {
                const errorMessage = JSON.stringify(error.response?.data.erro)
                const cleanedErrorMessage = errorMessage.replace(/["']/g, "")
                toast.error(`${cleanedErrorMessage}`)

                // Se o token estiver inválido, redirecione para a página de login e limpe o localStorage
                if (error.response?.status === 401) {
                    userLogout("Sessão expirada. Faça login novamente.")
                }
            } finally {
                setLoading(false)
            }
        }

        const renewToken = async () => {
            try {
                setLoading(true)
                const { data } = await apiQsp.post("/v1/usuarios/refresh-token", {
                    refreshToken: token,
                })
                localStorage.setItem("@TOKENACESS", data.tokenAccess)
            } catch (error) {
                // Handle token renewal failure (e.g., logout user)
                console.error("Token renewal failed:", error)
                setUser(null)
                navigate("/")
            } finally {
                setLoading(false)
            }
        }

        const handleUserActivity = () => {
            // Atividade do usuário detectada, reiniciar o temporizador de renovação do token
            if (renewalTimeoutRef.current) {
                clearTimeout(renewalTimeoutRef.current)
            }

            renewalTimeoutRef.current = setTimeout(() => {
                // O usuário está inativo, renovar o token
                renewToken()
            }, 600000) // Renovar o token a cada 10 minutos (ajuste conforme necessário)
        }

        if (token && userId) {
            getUser()

            // Adicione um listener para detectar a atividade do usuário
            window.addEventListener("mousemove", handleUserActivity)
            window.addEventListener("keydown", handleUserActivity)
        }

        // Remover os listeners quando o componente for desmontado
        return () => {
            window.removeEventListener("mousemove", handleUserActivity)
            window.removeEventListener("keydown", handleUserActivity)

            // Limpar o temporizador ao desmontar o componente
            clearTimeout(renewalTimeoutRef.current)
        }
    }, []) // Certifique-se de incluir todas as dependências necessárias para evitar warnings

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

    const userLogout = (toastLabel) => {
        setUser({cargo:0})
        navigate("/")
        toast.success(toastLabel)
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