import { useContext, useEffect } from "react"
import { useState } from "react"
import { createContext } from "react"
import { apiQsp } from "../services/api"
import { UserContext } from "./UserContext"
import { toast } from "react-toastify"

export const ControlSaleContext = createContext({})

const initialValues = {
    cpf: '',
    etapa: 0
}

export const ControlSaleProvider = ({ children }) => {
    const { userLogout } = useContext(UserContext)
    const [values, setValues] = useState(initialValues)

    const [saleList, setSaleList] = useState([])
    const [saleListFilter, setSaleListFilter] = useState([])
    const [loadingListSales, setLoadingListSales] = useState(false)

    const [dataFetched, setDataFetched] = useState(false)
    const [selectedEtapas, setSelectedEtapas] = useState(0)
    const [selectEtapas, setSelectEtapas] = useState(0)

    const [selectedEtapasFilter, setSelectedEtapasFilter] = useState(0)

    // Item Selecionado
    const [selectedUsuario, setSelectedUsuario] = useState(0)
    const [selectedProdutos, setSelectedProdutos] = useState(0)
    const [selectedFormPag, setSelectedFormPag] = useState(0)
    const [selectedBanco, setSelectedBanco] = useState(0)
    const [selectedDiaVenc, setSelectedDiaVenc] = useState(0)

    // Itens que vem da API
    const [selectUsuario, setSelectUsuario] = useState()
    const [selectProdutos, setSelectProdutos] = useState()
    const [selectFormPag, setSelectFormPag] = useState()
    const [selectBanco, setSelectBanco] = useState()
    const [selectDiaVenc, setSelectDiaVenc] = useState()

    const [itensPatch, setItensPatch] = useState(null)

    //Modal
    const [currentSale, setCurrentSale] = useState(null)

    const token = localStorage.getItem("@TOKENACESS")

    const [errorVerify, setErrorVerify] = useState({
        hasError: false,
        errorField: null,
        message: ''
    })

    const [nome, setNome] = useState("")
    const [cpf_cnpj, setCpf_cpnj] = useState("")
    const [dataInicial, setDataInicial] = useState("")
    const [dataFinal, setDataFinal] = useState("")

    const handleFilterClick = () => {

        const filtro = {
            nome,
            cpf_cnpj,
            dataInicial,
            dataFinal,
            etapa:
                selectedEtapasFilter !== 0
                    ? selectEtapas.find((objeto) => objeto.id_etapa === selectedEtapasFilter)?.nome
                    : "Todos",
        }

        const filteredList = saleList.filter((sale) => {

            const nomeValido =
                !filtro.nome ||
                (sale.nome_cliente &&
                    sale.nome_cliente.toLowerCase().includes(filtro.nome.toLowerCase()))

            const dataValida =
                (!filtro.dataInicial || new Date(sale.dt_ger) >= new Date(filtro.dataInicial)) &&
                (!filtro.dataFinal || new Date(sale.dt_ger) <= new Date(filtro.dataFinal))

            const cpfSemCaEspeciais = sale.cpf ? sale.cpf.replace(/[^\d]/g, '') : ''
            const cnpjSemCaEspeciais = sale.cnpj ? sale.cnpj.replace(/[^\d]/g, '') : ''

            const cpfCnpjValido =
                (!filtro.cpf_cnpj && true) ||
                (cpfSemCaEspeciais.includes(filtro.cpf_cnpj) ||
                    cnpjSemCaEspeciais.includes(filtro.cpf_cnpj))

            const etapaValido =
                filtro.etapa === "Todos" ||
                (sale.nome_etapa && sale.nome_etapa.toLowerCase() === filtro.etapa.toLowerCase())



            return nomeValido && dataValida && cpfCnpjValido && etapaValido
        })

        // Ordenar a lista filtrada pelo número da venda (id_venda) de forma decrescente
        const sortedFilteredList = filteredList.sort((a, b) => b.id_venda - a.id_venda)

        // Atualize a saleListFilter com os resultados da filtragem e ordenação
        setSaleListFilter(sortedFilteredList)

    }

    useEffect(() => {
        const dataAtual = new Date()

        const primeiroDiaMesAtual = new Date(dataAtual.getFullYear(), dataAtual.getMonth(), 1)
        const formattedPrimeiroDia = primeiroDiaMesAtual.toISOString().split("T")[0]
        setDataInicial(formattedPrimeiroDia)

        const ultimoDiaMesAtual = new Date(dataAtual.getFullYear(), dataAtual.getMonth() + 1, 0)
        const formattedUltimoDia = ultimoDiaMesAtual.toISOString().split("T")[0]
        setDataFinal(formattedUltimoDia)
    }, [])

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

    const patchSale = async (id_venda, updatedData) => {
        try {

            const response = await apiQsp.patch(`/v1/vendas/edit/${id_venda}`, updatedData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            console.log('Venda atualizada com sucesso:', response.data)
            toast.success("Dados atualizados com sucesso!")
            handleUpdateList()

        } catch (error) {
            console.error('Erro ao atualizar a venda:', error)
        } finally {

        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoadingListSales(true)

                if (saleList.length === 0) {
                    // Chama getSales apenas se saleList estiver vazia
                    await getSales()
                }

                // Chama handleFilterClick se a obtenção de vendas for bem-sucedida
                handleFilterClick()
            } catch (error) {
                console.error(error)
            } finally {
                setLoadingListSales(false)
            }
        }

        fetchData()
    }, [saleList])

    useEffect(() => {

        const fetchData = async () => {

            try {

                const { data } = await apiQsp.get("/v1/etapas/all", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                setSelectEtapas(data)
            } catch (error) {
                console.error("Erro ao buscar etapas:", error)
                return userLogout("Acesso expirado, faça login novamente")
            } finally {

            }

            try {

                const { data } = await apiQsp.get("/v1/usuarios/all", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                setSelectUsuario(data)
            } catch (error) {
                console.error("Erro ao buscar usuários:", error)
                return userLogout("Acesso expirado, faça login novamente")
            } finally {

            }

            try {

                const { data } = await apiQsp.get("/v1/produtos/all", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                setSelectProdutos(data)
            } catch (error) {
                console.error("Erro ao buscar produtos:", error)
                return userLogout("Acesso expirado, faça login novamente")
            } finally {

            }

            try {

                const { data } = await apiQsp.get("/v1/FormPag/all", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                setSelectFormPag(data)
            } catch (error) {
                console.error("Erro ao buscar formas de pagamento:", error)
                return userLogout("Acesso expirado, faça login novamente")
            } finally {

            }

            try {

                const { data } = await apiQsp.get("/v1/vendas/bancos", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                setSelectBanco(data)
            } catch (error) {
                console.error("Erro ao buscar Bancos:", error)
                return userLogout("Acesso expirado, faça login novamente")
            } finally {

            }

            try {

                const { data } = await apiQsp.get("/v1/vendas/venc", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                setSelectDiaVenc(data)
            } catch (error) {
                console.error("Erro ao buscar Data Vencimento:", error)
                return userLogout("Acesso expirado, faça login novamente")
            } finally {

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

            setSelectEtapas((prevSelectPlanos) =>
                prevSelectPlanos.map((item) => ({ id: item.id_etapa, ...item }))
            )

            setDataFetched(true)
        }

        if (!dataFetched) {
            fetchData()
        }
    }, [])

    function selectChange(name, valueIten) {
        setValues({
            ...values,
            [name]: valueIten
        })
    }

    const closeModal = () => {
        setCurrentSale(null)
        setItensPatch(null)
    }

    const handleUpdateList = async () => {
        try {
            await getSales()

            setSelectedEtapasFilter(0)
            handleFilterClick()
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <ControlSaleContext.Provider value={{
            saleList, getSales, selectChange,
            errorVerify, setErrorVerify,

            selectedEtapas,
            setSelectedEtapas,
            selectEtapas,

            nome, setNome,
            cpf_cnpj, setCpf_cpnj,
            dataInicial, setDataInicial,
            dataFinal, setDataFinal,

            handleFilterClick,
            saleListFilter,

            closeModal, currentSale, setCurrentSale,

            selectUsuario, selectProdutos, selectFormPag, selectDiaVenc, selectBanco,

            selectedUsuario, selectedProdutos, selectedFormPag,
            setSelectedUsuario, setSelectedProdutos, setSelectedFormPag,
            selectedBanco, setSelectedBanco, selectedDiaVenc, setSelectedDiaVenc,

            selectedEtapasFilter, setSelectedEtapasFilter,

            itensPatch, setItensPatch,
            handleUpdateList, patchSale,
            loadingListSales
        }}>
            {children}
        </ControlSaleContext.Provider>
    )
}