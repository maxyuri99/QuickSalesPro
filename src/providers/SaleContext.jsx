import { useContext, useEffect } from "react"
import { useState } from "react"
import { createContext } from "react"
import { apiCEP, apiQsp } from "../services/api"
import { toast } from "react-toastify"

import { UserContext } from "./UserContext"

export const SaleContext = createContext({})

const initialValues = {
    cpf: '',
    cnpj: '',
    cpf_socio: '',
    telefone_1: '',
    telefone_2: '',
    telefone_3: '',
    cep: '',
    vendedor: 0,
    plano: 0,
    formpag: 0,
    banco: 0,
    dia_venc: 0,
    agencia: "",
    conta: "",
}

export const SaleProvider = ({ children }) => {
    const localStorageID = localStorage.getItem("@USERID")
    const userID = parseInt(localStorageID, 10)


    const { userLogout } = useContext(UserContext)

    // ####### Pagina de nova venda ##########################
    const [dataFetched, setDataFetched] = useState(false)

    const [values, setValues] = useState(initialValues)

    const [selectedRadio, setSelectedRadio] = useState("cpf")

    // Item Selecionado
    const [selectedUsuario, setSelectedUsuario] = useState(userID || 0)

    const [selectedProdutos, setSelectedProdutos] = useState(0)
    const [selectedFormPag, setSelectedFormPag] = useState(0)
    const [selectedBanco, setSelectedBanco] = useState(0)
    const [selectedDiaVenc, setSelectedDiaVenc] = useState(0)
    const [selectedDate, setSelectedDate] = useState(null)

    // Itens que vem da API
    const [selectUsuario, setSelectUsuario] = useState()
    const [selectProdutos, setSelectProdutos] = useState()
    const [selectFormPag, setSelectFormPag] = useState()
    const [selectBanco, setSelectBanco] = useState()
    const [selectDiaVenc, setSelectDiaVenc] = useState()

    const [loadingNewSale, setLoadingNewSale] = useState(false)
    const [loadingItensSale, setLoadingItensSale] = useState(false)
    const [loadingCEPSale, setLoadingCEPSales] = useState(false)

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
            setLoadingCEPSales(true)
            const { data } = await apiCEP.get(`/api/cep/v1/${cep}`)

            setCepIten(data)

        } catch (error) {
            console.log(error)
            toast.error("CEP não encontrado")
        } finally {
            setLoadingCEPSales(false)
        }
    }

    const tokenEffect = localStorage.getItem("@TOKENACESS")

    useEffect(() => {

        const fetchData = async () => {
            try {
                setLoadingItensSale(true)
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
                setLoadingItensSale(false)
            }

            try {
                setLoadingItensSale(true)
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
                setLoadingItensSale(false)
            }

            try {
                setLoadingItensSale(true)
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
                setLoadingItensSale(false)
            }

            try {
                setLoadingItensSale(true)
                const { data } = await apiQsp.get("/v1/vendas/bancos", {
                    headers: {
                        Authorization: `Bearer ${tokenEffect}`,
                    },
                })
                setSelectBanco(data)
            } catch (error) {
                console.error("Erro ao buscar Bancos:", error)
                userLogout("Acesso expirado, faça login novamente")
            } finally {
                setLoadingItensSale(false)
            }

            try {
                setLoadingItensSale(true)
                const { data } = await apiQsp.get("/v1/vendas/venc", {
                    headers: {
                        Authorization: `Bearer ${tokenEffect}`,
                    },
                })
                setSelectDiaVenc(data)
            } catch (error) {
                console.error("Erro ao buscar Data Vencimento:", error)
                userLogout("Acesso expirado, faça login novamente")
            } finally {
                setLoadingItensSale(false)
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

            setSelectBanco((prevSelectBanco) =>
                prevSelectBanco.map((item) => ({ id: item.id_banco, ...item }))
            )

            setSelectDiaVenc((prevSelectDiaVenc) =>
                prevSelectDiaVenc.map((item) => ({ id: item.id_venc, nome: item.dia_venc }))
            )

            setDataFetched(true)
        }

        if (!dataFetched) {
            fetchData()
        }
    }, [tokenEffect])

    const selectChange = (name, valueIten) => {
        setValues({
            ...values,
            [name]: valueIten
        })
    }

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        })
    }

    useEffect(() => {
        if (selectedUsuario !== undefined) {
          setSelectedUsuario(userID)
        }
      }, [selectedUsuario]);

    return (
        <SaleContext.Provider value={{
            saleRegister, selectChange,

            selectedUsuario, selectedProdutos, selectedFormPag,
            setSelectedUsuario, setSelectedProdutos, setSelectedFormPag,
            selectedBanco, setSelectedBanco, selectedDiaVenc, setSelectedDiaVenc,

            selectUsuario, selectProdutos, selectFormPag, selectDiaVenc, selectBanco,
            setSelectedRadio, selectedRadio,
            handleChange,
            initialValues, values, setValues,
            loadingNewSale, loadingItensSale, loadingCEPSale,
            getCEP, cepIten, setCepIten,
            selectedDate, setSelectedDate
        }}>
            {children}
        </SaleContext.Provider>
    )
}