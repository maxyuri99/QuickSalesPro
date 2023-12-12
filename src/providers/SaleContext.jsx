import { useContext, useEffect } from "react"
import { useState } from "react"
import { createContext } from "react"
import { apiCEP, apiQsp } from "../services/api"
import { toast } from "react-toastify"

import { UserContext } from "./UserContext"

export const SaleContext = createContext({})


export const SaleProvider = ({ children }) => {
    const { userLogout, navigateUser } = useContext(UserContext)

    // ###### pagina de Controle de Vendas ######
    const [saleList, setSaleList] = useState([])
    const [loadingListSales, setLoadingListSales] = useState(false)

    const token = localStorage.getItem("@TOKENACESS")

    const getSales = async () => {
        try {
            setLoadingListSales(true)
            const { data } = await apiQsp.get('/v1/vendas/all', {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })

            setSaleList(data)

        } catch (error) {
            console.log(error)
        } finally {
            setLoadingListSales(false)
        }
    }

    // ########################################################


    // ####### Pagina de nova venda ##########################
    const [dataFetched, setDataFetched] = useState(false)

    // Item Selecionado
    const [selectedUsuario, setSelectedUsuario] = useState(0)
    const [selectedProdutos, setSelectedProdutos] = useState(0)
    const [selectedFormPag, setSelectedFormPag] = useState(0)
    const [selectedBanco, setSelectedBanco] = useState(0)

    // Itens que vem da API
    const [selectUsuario, setSelectUsuario] = useState()
    const [selectProdutos, setSelectProdutos] = useState()
    const [selectFormPag, setSelectFormPag] = useState()
    const [selectBanco, setSelectBanco] = useState()


    const [loadingNewSale, setLoadingNewSale] = useState(false)
    const [loadingUsuario, setLoadingUsuario] = useState(false)
    const [loadingProdutos, setLoadingProdutos] = useState(false)
    const [loadingFormPag, setLoadingFormPag] = useState(false)

    const [cepIten, setCepIten] = useState()

    const saleRegister = async (formData) => {
        const tokenRegister = localStorage.getItem("@TOKENACESS")

        try {
            setLoadingNewSale(true)

            await apiQsp.post("/v1/vendas/registro", formData, {
                headers: {
                    Authorization: `Bearer ${tokenRegister}`
                }
            })
            toast.success("Cadastro realizado com sucesso!")

        } catch (error) {
            console.log(error)
            if (error.response?.data.erro) {
                console.log(error.response?.data.erro)
                toast.error(error.response?.data.erro)
            }
        } finally {
            setLoadingNewSale(false)
        }
    }

    const getCEP = async (cep) => {
        try {
            setLoadingListSales(true)
            const { data } = await apiCEP.get(`/api/cep/v1/${cep}`)

            setCepIten(data)

        } catch (error) {
            console.log(error)
            toast.error("CEP não encontrado")
            //res.status(500).json({ error: 'Internal Server Error' })
        } finally {
            setLoadingListSales(false)
        }
    }

    const tokenEffect = localStorage.getItem("@TOKENACESS")

    useEffect(() => {

        const fetchData = async () => {
            try {
                setLoadingUsuario(true)
                const { data } = await apiQsp.get("/v1/usuarios/all", {
                    headers: {
                        Authorization: `Bearer ${tokenEffect}`,
                    },
                })
                setSelectUsuario(data)
            } catch (error) {
                console.error("Erro ao buscar usuários:", error)
                userLogout("Acesso expirado, faça login novamente")
            } finally {
                setLoadingUsuario(false)
            }

            try {
                setLoadingProdutos(true)
                const { data } = await apiQsp.get("/v1/produtos/all", {
                    headers: {
                        Authorization: `Bearer ${tokenEffect}`,
                    },
                })
                setSelectProdutos(data)
            } catch (error) {
                console.error("Erro ao buscar produtos:", error)
                userLogout("Acesso expirado, faça login novamente")
            } finally {
                setLoadingProdutos(false)
            }

            try {
                setLoadingFormPag(true)
                const { data } = await apiQsp.get("/v1/FormPag/all", {
                    headers: {
                        Authorization: `Bearer ${tokenEffect}`,
                    },
                })
                setSelectFormPag(data)
            } catch (error) {
                console.error("Erro ao buscar formas de pagamento:", error)
                userLogout("Acesso expirado, faça login novamente")
            } finally {
                setLoadingFormPag(false)
            }

            setSelectUsuario((prevSelectUsuario) =>
                prevSelectUsuario.map((item) => ({ id: item.id_usuario, ...item }))
            )

            setSelectProdutos((prevSelectProdutos) =>
                prevSelectProdutos.map((item) => ({ id: item.id_produto, ...item }))
            )

            setSelectFormPag((prevSelectFormPag) =>
                prevSelectFormPag.map((item) => ({ id: item.id_formpag, ...item }))
            )

            setDataFetched(true)
        }

        if (!dataFetched) {
            fetchData()
        }
    }, [tokenEffect])
    // #############################################################################
    return (
        <SaleContext.Provider value={{
            saleList, getSales, saleRegister,
            selectedUsuario, selectedProdutos, selectedFormPag,
            setSelectedUsuario, setSelectedProdutos, setSelectedFormPag,
            selectUsuario, selectProdutos, selectFormPag,
            loadingNewSale, loadingUsuario, loadingProdutos, loadingFormPag,
            loadingListSales, setLoadingListSales, getCEP, cepIten, setCepIten
        }}>
            {children}
        </SaleContext.Provider>
    )
}