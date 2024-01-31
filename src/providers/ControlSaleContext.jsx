import { useContext, useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { apiQsp } from "../services/api";
import { UserContext } from "./UserContext";
import { toast } from "react-toastify";
import { exportToExcel } from "../components/ExportExcel";

export const ControlSaleContext = createContext({});

const initialValues = {
  cpf: "",
  etapa: 0,
};

// eslint-disable-next-line react/prop-types
export const ControlSaleProvider = ({ children }) => {
  const { userLogout, user } = useContext(UserContext);
  const [values, setValues] = useState(initialValues);

  const [saleList, setSaleList] = useState([]);
  const [saleListFilter, setSaleListFilter] = useState([]);
  const [loadingListSales, setLoadingListSales] = useState(false);

  const [saleListUserID, setSaleListUserID] = useState([]);
  const [saleListUserIDFilter, setSaleListUserIDFilter] = useState([]);
  const [loadingListUserID, setLoadingListUserID] = useState(false);

  const [saleRegisterList, setSaleRegisterList] = useState([]);

  const [dataFetched, setDataFetched] = useState(false);
  const [selectedEtapas, setSelectedEtapas] = useState(0);
  const [selectEtapas, setSelectEtapas] = useState(0);

  const [selectedEtapasFilter, setSelectedEtapasFilter] = useState(0);

  // Item Selecionado
  const [selectedUsuario, setSelectedUsuario] = useState(0);
  const [selectedProdutos, setSelectedProdutos] = useState(0);
  const [selectedFormPag, setSelectedFormPag] = useState(0);
  const [selectedBanco, setSelectedBanco] = useState(0);
  const [selectedDiaVenc, setSelectedDiaVenc] = useState(0);

  // Itens que vem da API
  const [selectUsuario, setSelectUsuario] = useState();
  const [selectProdutos, setSelectProdutos] = useState();
  const [selectFormPag, setSelectFormPag] = useState();
  const [selectBanco, setSelectBanco] = useState();
  const [selectDiaVenc, setSelectDiaVenc] = useState();

  const [itensPatch, setItensPatch] = useState(null);

  //Modal
  const [currentSale, setCurrentSale] = useState(null);

  const token = localStorage.getItem("@TOKENACESS");

  const [errorVerify, setErrorVerify] = useState({
    hasError: false,
    errorField: null,
    message: "",
  });

  const [nome, setNome] = useState("");
  const [cpf_cnpj, setCpf_cpnj] = useState("");
  const [dataInicial, setDataInicial] = useState("");
  const [dataFinal, setDataFinal] = useState("");

  const handleFilterClick = () => {
    try {
      setLoadingListSales(true);

      const filtro = {
        nome,
        cpf_cnpj,
        dataInicial,
        dataFinal,
        etapa:
          selectedEtapasFilter !== 0
            ? selectEtapas.find(
                (objeto) => objeto.id_etapa === selectedEtapasFilter
              )?.nome
            : "Todos",
      };

      const filteredList = saleList.filter((sale) => {
        const nomeValido =
          !filtro.nome ||
          (sale.nome_cliente &&
            sale.nome_cliente
              .toLowerCase()
              .includes(filtro.nome.toLowerCase()));

        const dataValida =
          (!filtro.dataInicial ||
            new Date(sale.dt_ger) >= new Date(filtro.dataInicial)) &&
          (!filtro.dataFinal ||
            new Date(sale.dt_ger) <= new Date(filtro.dataFinal));

        const cpfSemCaEspeciais = sale.cpf
          ? sale.cpf.replace(/[^\d]/g, "")
          : "";
        const cnpjSemCaEspeciais = sale.cnpj
          ? sale.cnpj.replace(/[^\d]/g, "")
          : "";

        const cpfCnpjValido =
          (!filtro.cpf_cnpj && true) ||
          cpfSemCaEspeciais.includes(filtro.cpf_cnpj) ||
          cnpjSemCaEspeciais.includes(filtro.cpf_cnpj);

        const etapaValido =
          filtro.etapa === "Todos" ||
          (sale.nome_etapa &&
            sale.nome_etapa.toLowerCase() === filtro.etapa.toLowerCase());

        return nomeValido && dataValida && cpfCnpjValido && etapaValido;
      });

      // Ordenar a lista filtrada pelo número da venda (id_venda) de forma decrescente
      const sortedFilteredList = filteredList.sort(
        (a, b) => b.id_venda - a.id_venda
      );

      // Atualize a saleListFilter com os resultados da filtragem e ordenação
      setSaleListFilter(sortedFilteredList);
    } finally {
      setLoadingListSales(false);
    }
  };

  const handleFilterUserIDClick = () => {
    // Ordenar a lista filtrada pelo número da venda (id_venda) de forma decrescente
    const FilteredList = saleListUserID.sort((a, b) => b.id_venda - a.id_venda);
    // Atualize a saleListFilter com os resultados da filtragem e ordenação
    setSaleListUserIDFilter(FilteredList);
  };

  useEffect(() => {
    const dataAtual = new Date();

    // Obtém o dia inicial como "hoje - 10 dias"
    const diaInicial = new Date(dataAtual);
    diaInicial.setDate(dataAtual.getDate() - 10);
    const formattedDiaInicial = diaInicial.toISOString().split("T")[0];
    setDataInicial(formattedDiaInicial);

    // Obtém o dia final como "hoje" + 1 dia
    const diaFinal = new Date(dataAtual);
    diaFinal.setDate(dataAtual.getDate() + 1);
    const formattedDiaFinal = diaFinal.toISOString().split("T")[0];
    setDataFinal(formattedDiaFinal);
    
  }, []);

  const getSales = async () => {
    try {
      setLoadingListSales(true);
      const { data } = await apiQsp.get("/v1/vendas/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSaleList(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingListSales(false);
    }
  };

  const getRegisterID = async (id_venda) => {
    try {
      setLoadingListUserID(true);
      const { data } = await apiQsp.get(`/v1/vendas/register/${id_venda}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSaleRegisterList(data);
    } catch (error) {
      console.error("Erro ao buscar registro de alteração:", error);
    } finally {
      setLoadingListUserID(false);
    }
  };

  const deleteSale = async (id_venda, id_cliente) => {
    try {
      setLoadingListUserID(true);

      if (!id_venda || !id_cliente) {
        // Adiciona verificação para garantir que os IDs estejam presentes
        throw new Error(
          "IDs de venda e cliente são obrigatórios para excluir."
        );
      }

      const response = await apiQsp.delete(
        `/v1/vendas/delete/${id_venda}/${id_cliente}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Verifica se a resposta da API foi bem-sucedida
      if (response.status === 200) {
        console.log("Feito, excluído!");
        toast.success("Venda excluída com sucesso!");
        handleUpdateList();
      } else {
        console.error(
          "Erro ao deletar a venda:",
          response.data.message || response.statusText
        );
        toast.error("Erro ao excluir a venda. Por favor, tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao deletar a venda:", error.message || error);
      toast.error("Erro ao excluir a venda. Por favor, tente novamente.");
    } finally {
      setLoadingListUserID(false);
    }
  };

  const getSaleUserID = async (id_user) => {
    try {
      setLoadingListUserID(true);
      const { data } = await apiQsp.get(`/v1/vendas/user/${id_user}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSaleListUserID(data);
    } catch (error) {
      console.error("Erro ao buscar registro de venda por usuario:", error);
    } finally {
      setLoadingListUserID(false);
    }
  };

  const patchSale = async (id_venda, updatedData) => {
    try {
      const response = await apiQsp.patch(
        `/v1/vendas/edit/${id_venda}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Venda atualizada com sucesso:", response.data);
      toast.success("Dados atualizados com sucesso!");
      handleUpdateList();
    } catch (error) {
      console.error("Erro ao atualizar a venda:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingListSales(true);

        if (saleList.length === 0) {
          // Chama getSales apenas se saleList estiver vazia
          await getSales();
        }

        // Chama handleFilterClick se a obtenção de vendas for bem-sucedida
        handleFilterClick();
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingListSales(false);
      }
    };

    fetchData();
  }, [saleList]);

  useEffect(() => {
    const fetchData = () => {
      try {
        setLoadingListUserID(true);

        if (saleListUserID.length === 0) {
          getSaleUserID(user.id_usuario);
        }

        handleFilterUserIDClick();
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingListUserID(false);
      }
    };

    fetchData();
  }, [saleListUserID]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await apiQsp.get("/v1/etapas/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSelectEtapas(data);
      } catch (error) {
        console.error("Erro ao buscar etapas:", error);
        return userLogout("Acesso expirado, faça login novamente");
      }

      try {
        const { data } = await apiQsp.get("/v1/usuarios/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSelectUsuario(data);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        return userLogout("Acesso expirado, faça login novamente");
      }

      try {
        const { data } = await apiQsp.get("/v1/produtos/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSelectProdutos(data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        return userLogout("Acesso expirado, faça login novamente");
      }

      try {
        const { data } = await apiQsp.get("/v1/FormPag/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSelectFormPag(data);
      } catch (error) {
        console.error("Erro ao buscar formas de pagamento:", error);
        return userLogout("Acesso expirado, faça login novamente");
      }

      try {
        const { data } = await apiQsp.get("/v1/vendas/bancos", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSelectBanco(data);
      } catch (error) {
        console.error("Erro ao buscar Bancos:", error);
        return userLogout("Acesso expirado, faça login novamente");
      }

      try {
        const { data } = await apiQsp.get("/v1/vendas/venc", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSelectDiaVenc(data);
      } catch (error) {
        console.error("Erro ao buscar Data Vencimento:", error);
        return userLogout("Acesso expirado, faça login novamente");
      }

      setSelectUsuario((prevSelectUsuario) =>
        prevSelectUsuario.map((item) => ({ id: item.id_usuario, ...item }))
      );

      setSelectProdutos((prevSelectProdutos) =>
        prevSelectProdutos.map((item) => ({ id: item.id_produto, ...item }))
      );

      setSelectFormPag((prevSelectFormPag) =>
        prevSelectFormPag.map((item) => ({ id: item.id_formpag, ...item }))
      );

      setSelectBanco((prevSelectBanco) =>
        prevSelectBanco.map((item) => ({ id: item.id_banco, ...item }))
      );

      setSelectDiaVenc((prevSelectDiaVenc) =>
        prevSelectDiaVenc.map((item) => ({
          id: item.id_venc,
          nome: item.dia_venc,
        }))
      );

      setSelectEtapas((prevSelectPlanos) =>
        prevSelectPlanos.map((item) => ({ id: item.id_etapa, ...item }))
      );

      setDataFetched(true);
    };

    if (!dataFetched) {
      fetchData();
    }
  }, []);

  const selectChange = (name, valueIten) => {
    setValues({
      ...values,
      [name]: valueIten,
    });
  };

  const closeModal = () => {
    setCurrentSale(null);
    setItensPatch(null);
    setSaleRegisterList([]);
  };

  const handleUpdateList = async () => {
    try {
      await getSales();

      setSelectedEtapasFilter(0);
      handleFilterClick();
      setSaleRegisterList([]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateListUserID = () => {
    try {
      getSaleUserID(user.id_usuario);
      handleFilterUserIDClick();
    } catch (error) {
      console.error(error);
    }
  };

  const exportExcelFunc = () => {
    if (!saleListFilter || saleListFilter.length === 0) {
      return;
    }

    // Mapear e transformar os dados antes de exportar
    const transformedData = saleListFilter.map((item) => ({
      id_venda: item.id_venda,
      nome_cliente: item.nome_cliente,
      cpf: item.cpf,
      cnpj: item.cnpj,
      cnpj_socio: item.cnpj_socio,
      email: item.email,
      dt_nascimento: new Date(item.dt_nascimento).toLocaleDateString(),
      telefone_1: item.telefone_1,
      cep: item.cep,
      endereco: item.endereco,
      numero_end: item.numero_end,
      complemento_end: item.complemento_end,
      bairro: item.bairro,
      cidade: item.cidade,
      uf: item.uf,
      nome_mae: item.nome_mae,
      plano: item.nome_produto,
      etapa: item.nome_etapa,
      periodo: item.periodo,
      form_pag: item.form_pag,
      dia_venc: item.dia_venc,
      banco: item.banco,
      agencia: item.agencia,
      conta: item.conta,
      dt_geracao: new Date(item.dt_ger).toLocaleDateString(),
      usuario_geracao: item.nome_usuario,
      dt_instalacao: new Date(item.dt_instalacao).toLocaleDateString(),
      dt_cancelamento: new Date(item.dt_cancelamento).toLocaleDateString(),
      dt_alt: new Date(item.dt_alt).toLocaleDateString(),
      observacao: item.observacao,
    }));

    // Ordenar os dados
    transformedData.sort((a, b) => a.id_venda - b.id_venda);

    //console.log(transformedData)

    // Exportar os dados transformados
    exportToExcel(transformedData);
  };

  return (
    <ControlSaleContext.Provider
      value={{
        saleList,
        getSales,
        selectChange,
        errorVerify,
        setErrorVerify,

        saleListUserID,
        setSaleListUserID,
        handleUpdateListUserID,
        saleListUserIDFilter,
        setSaleListUserIDFilter,
        loadingListUserID,
        setLoadingListUserID,

        selectedEtapas,
        setSelectedEtapas,
        selectEtapas,

        nome,
        setNome,
        cpf_cnpj,
        setCpf_cpnj,
        dataInicial,
        setDataInicial,
        dataFinal,
        setDataFinal,

        handleFilterClick,
        saleListFilter,

        closeModal,
        currentSale,
        setCurrentSale,

        selectUsuario,
        selectProdutos,
        selectFormPag,
        selectDiaVenc,
        selectBanco,

        selectedUsuario,
        selectedProdutos,
        selectedFormPag,
        setSelectedUsuario,
        setSelectedProdutos,
        setSelectedFormPag,
        selectedBanco,
        setSelectedBanco,
        selectedDiaVenc,
        setSelectedDiaVenc,

        selectedEtapasFilter,
        setSelectedEtapasFilter,

        itensPatch,
        setItensPatch,
        handleUpdateList,
        patchSale,
        loadingListSales,
        getRegisterID,
        saleRegisterList,
        setSaleRegisterList,
        exportExcelFunc,
        deleteSale,
      }}
    >
      {children}
    </ControlSaleContext.Provider>
  );
};
