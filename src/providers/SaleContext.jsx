import { useEffect } from "react"
import { useState } from "react"
import { createContext } from "react"
import { apiQsp } from "../services/api"
import { toast } from "react-toastify"

export const SaleContext = createContext({})

export const SaleProvider = ({ children }) => {
    const [saleList, setSaleList] = useState([])

    useEffect(() => {
        const token = localStorage.getItem("@TOKENACESS")

        const getSales = async () => {
            try {
                const { data } = await apiQsp.get('/v1/vendas/all', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })

                setSaleList(data)

            } catch (error) {
                console.log(error)
            }
        }

        getSales()

    }, [])

    const saleRegister = async (formData) => {
        try {
            
        } catch (error) {
            
        }
    }

    return (
        <SaleContext.Provider value={{ saleList }}>
            {children}
        </SaleContext.Provider>
    )
}