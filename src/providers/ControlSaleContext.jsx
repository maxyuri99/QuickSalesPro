import { useEffect } from "react"
import { useState } from "react"
import { createContext } from "react"
import { apiQsp } from "../services/api"

export const ControlSaleContext = createContext({})

const initialValues = {
    cpf: '',
    plano: 0
}

export const ControlSaleProvider = ({ children }) => {
    const [values, setValues] = useState(initialValues)

    const [saleList, setSaleList] = useState([])
    const [saleListFilter, setSaleListFilter] = useState([])
    const [loadingListSales, setLoadingListSales] = useState(false)

    const [dataFetched, setDataFetched] = useState(false)
    const [selectedPlanos, setSelectedPlanos] = useState(0)
    const [selectPlanos, setSelectPlanos] = useState(0)

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
            plano:
                selectedPlanos !== 0
                    ? selectPlanos.find((objeto) => objeto.id_produto === selectedPlanos)?.nome
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

            const planoValido =
                filtro.plano === "Todos" ||
                (sale.nome_produto && sale.nome_produto.toLowerCase() === filtro.plano.toLowerCase())


            return nomeValido && dataValida && cpfCnpjValido && planoValido
        })

        // Ordenar a lista filtrada pela data (dt_ger) de forma decrescente
        const sortedFilteredList = filteredList.sort((a, b) => new Date(b.dt_ger) - new Date(a.dt_ger))

        // Atualize a saleListFilter com os resultados da filtragem e ordenação
        setSaleListFilter(sortedFilteredList)

    }

    useEffect(() => {
        // Obtém a data atual
        const dataAtual = new Date()

        // Configura dataInicial para o primeiro dia do mês atual
        const primeiroDiaMesAtual = new Date(dataAtual.getFullYear(), dataAtual.getMonth(), 1)
        const formattedPrimeiroDia = primeiroDiaMesAtual.toISOString().split("T")[0]
        setDataInicial(formattedPrimeiroDia)

        // Configura dataFinal para o último dia do mês atual
        const ultimoDiaMesAtual = new Date(dataAtual.getFullYear(), dataAtual.getMonth() + 1, 0)
        const formattedUltimoDia = ultimoDiaMesAtual.toISOString().split("T")[0]
        setDataFinal(formattedUltimoDia)
    }, []) // Executa apenas uma vez ao montar o componente

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

                const { data } = await apiQsp.get("/v1/produtos/all", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                setSelectPlanos(data)
            } catch (error) {
                console.error("Erro ao buscar produtos:", error)
                userLogout("Acesso expirado, faça login novamente")
            } finally {

            }


            setSelectPlanos((prevSelectPlanos) =>
                prevSelectPlanos.map((item) => ({ id: item.id_produto, ...item }))
            )

            setDataFetched(true)
        }

        if (!dataFetched) {
            fetchData()
        }
    }, [token])

    function selectChange(name, valueIten) {
        setValues({
            ...values,
            [name]: valueIten
        })
    }

    return (
        <ControlSaleContext.Provider value={{
            saleList, getSales, selectChange,
            errorVerify, setErrorVerify,

            selectedPlanos,
            setSelectedPlanos,
            selectPlanos,

            nome, setNome,
            cpf_cnpj, setCpf_cpnj,
            dataInicial, setDataInicial,
            dataFinal, setDataFinal,

            handleFilterClick,
            saleListFilter
        }}>
            {children}
        </ControlSaleContext.Provider>
    )
}