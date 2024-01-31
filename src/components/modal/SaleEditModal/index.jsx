import { MdClose } from "react-icons/md";
import styles from "./style.module.scss";
import { useKeydown } from "../../hooks/useKeydown";
// import { useOutclick } from "../../hooks/useOutclick";
import { ControlSaleContext } from "../../../providers/ControlSaleContext";
import { useContext, useEffect } from "react";
import { Input } from "../../forms/Input";
import { format } from "date-fns";
import { Select } from "../../forms/Select";
import { TextArea } from "../../forms/TextArea";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

export const SaleEditModal = () => {
  const { register, handleSubmit } = useForm();

  const {
    closeModal,
    currentSale,
    selectEtapas,
    selectedEtapas,
    setSelectedEtapas,

    selectChange,

    patchSale,

    selectUsuario,
    selectProdutos,
    selectFormPag,
    selectDiaVenc,

    selectedUsuario,
    selectedProdutos,
    selectedFormPag,
    setSelectedUsuario,
    setSelectedProdutos,
    setSelectedFormPag,
    selectedDiaVenc,
    setSelectedDiaVenc,
    errorVerify,
    setErrorVerify,
    saleRegisterList,
    deleteSale,
  } = useContext(ControlSaleContext);

  //   const boxRef = useOutclick(() => {
  //     if (currentSale) {
  //       closeModal();
  //     }
  //   });  ref={boxRef}

  useKeydown("Escape", () => {
    closeModal();
  });

  const retiraCaracteres = (iten) => {
    const itenFormated = iten?.replace(/[^\d]/g, "");

    return itenFormated;
  };

  const formatarData = (iten) => {
    if (iten !== null && iten !== "1900-01-01T03:06:28.000Z") {
      const dataFormatada = format(new Date(iten), "yyyy-MM-dd");

      return dataFormatada;
    }
  };

  const handleDelete = () => {
    confirmAlert({
      title: "Confirmação",
      message: "Tem certeza que deseja excluir este item?",
      buttons: [
        {
          label: "Sim",
          onClick: () => {
            deleteSale(currentSale.id_venda, currentSale.id_usuario);
            closeModal();
          },
        },
        {
          label: "Não",
          onClick: () => {
            toast.error('A exclusão foi cancelada!')
          },
        },
      ],
      overlayClassName: `overlay-custom-class-name customAlertDelete` 
    });
  };

  const onSubmit = (data) => {
    //console.log("Dados do formulário:", data)
    //console.log("Dados do current:", currentSale)

    const arrayPatchCliente = {};
    const arrayPatchVenda = {};
    const arrayPatchRegister = {};

    // Lógica de verificação e salvamento aqui, se necessário
    const compareAndLogChange = (
      fieldName,
      formDataValue,
      currentSaleValue,
      pertence
    ) => {
      // verificar se no current que é do banco está vazio ou = 0
      if (
        currentSaleValue === null ||
        currentSaleValue === undefined ||
        currentSaleValue === 0
      ) {
        currentSaleValue = "";
        //console.log(`teste ${fieldName} : ${currentSaleValue}`)
      }

      if (formDataValue === 0 || formDataValue === null) {
        formDataValue = "";
      }

      if (formDataValue !== currentSaleValue && pertence === "cliente") {
        //console.log(` Iten Depois ${fieldName} = ${formDataValue}`)
        arrayPatchCliente[fieldName] = formDataValue;
      }

      if (formDataValue !== currentSaleValue && pertence === "venda") {
        //console.log(` Iten Depois ${fieldName} = ${formDataValue}`)
        arrayPatchVenda[fieldName] = formDataValue;
      }

      if (formDataValue !== currentSaleValue && pertence === "register") {
        //console.log(` Iten Depois ${fieldName} = ${formDataValue}`)
        arrayPatchRegister[fieldName] = formDataValue;
      }
    };

    const arrayPatch = {
      cliente: arrayPatchCliente,
      venda: arrayPatchVenda,
      register: arrayPatchRegister,
    };

    // Cliente
    compareAndLogChange("nome", data.nome, currentSale.nome_cliente, "cliente");
    compareAndLogChange(
      "cpf",
      data.cpf,
      retiraCaracteres(currentSale.cpf),
      "cliente"
    );
    compareAndLogChange(
      "cnpj",
      data.cnpj,
      retiraCaracteres(currentSale.cnpj),
      "cliente"
    );
    compareAndLogChange(
      "dt_nascimento",
      data.data_nascimento,
      formatarData(currentSale.dt_nascimento),
      "cliente"
    );
    compareAndLogChange(
      "nome_mae",
      data.nome_mae,
      currentSale.nome_mae,
      "cliente"
    );
    compareAndLogChange("email", data.email, currentSale.email, "cliente");
    compareAndLogChange(
      "telefone_1",
      data.telefone_1,
      currentSale.telefone_1,
      "cliente"
    );
    compareAndLogChange(
      "telefone_2",
      data.telefone_2,
      currentSale.telefone_2,
      "cliente"
    );
    compareAndLogChange(
      "telefone_3",
      data.telefone_3,
      currentSale.telefone_3,
      "cliente"
    );
    compareAndLogChange("cep", data.cep, currentSale.cep, "cliente");
    compareAndLogChange("endereco", data.rua, currentSale.endereco, "cliente");
    compareAndLogChange(
      "numero_end",
      data.numero,
      currentSale.numero_end,
      "cliente"
    );
    compareAndLogChange(
      "complemento_end",
      data.complemento,
      currentSale.complemento_end,
      "cliente"
    );
    compareAndLogChange("bairro", data.bairro, currentSale.bairro, "cliente");
    compareAndLogChange("cidade", data.cidade, currentSale.cidade, "cliente");
    compareAndLogChange("uf", data.uf, currentSale.uf, "cliente");

    // Venda
    compareAndLogChange(
      "dt_instalacao",
      data.data_instalacao,
      formatarData(currentSale.dt_instalacao),
      "venda"
    );
    compareAndLogChange(
      "user_ger",
      selectedUsuario,
      currentSale.id_usuario,
      "venda"
    );
    compareAndLogChange(
      "dt_ger",
      data.data_venda,
      formatarData(currentSale.dt_ger),
      "venda"
    );
    compareAndLogChange(
      "plano",
      selectedProdutos,
      currentSale.id_produto,
      "venda"
    );
    compareAndLogChange(
      "tipo_pagmento",
      selectedFormPag,
      currentSale.id_formpag,
      "venda"
    );
    compareAndLogChange("etapa", selectedEtapas, currentSale.id_etapa, "venda");
    compareAndLogChange("banco", data.banco, currentSale.banco, "venda");
    compareAndLogChange("agencia", data.agencia, currentSale.agencia, "venda");
    compareAndLogChange("conta", data.conta, currentSale.conta, "venda");
    compareAndLogChange(
      "dia_venc",
      selectedDiaVenc,
      currentSale.dia_venc,
      "venda"
    );
    compareAndLogChange("periodo", data.periodo, currentSale.periodo, "venda");
    compareAndLogChange(
      "observacao",
      data.observacao,
      currentSale.observacao,
      "venda"
    );

    // Register
    compareAndLogChange(
      "nome",
      data.nome,
      currentSale.nome_cliente,
      "register"
    );
    compareAndLogChange(
      "cpf",
      data.cpf,
      retiraCaracteres(currentSale.cpf),
      "register"
    );
    compareAndLogChange(
      "cnpj",
      data.cnpj,
      retiraCaracteres(currentSale.cnpj),
      "register"
    );
    compareAndLogChange(
      "dt_nascimento",
      data.data_nascimento,
      formatarData(currentSale.dt_nascimento),
      "register"
    );
    compareAndLogChange(
      "nome_mae",
      data.nome_mae,
      currentSale.nome_mae,
      "register"
    );
    compareAndLogChange("email", data.email, currentSale.email, "register");
    compareAndLogChange(
      "telefone_1",
      data.telefone_1,
      currentSale.telefone_1,
      "register"
    );
    compareAndLogChange(
      "telefone_2",
      data.telefone_2,
      currentSale.telefone_2,
      "register"
    );
    compareAndLogChange(
      "telefone_3",
      data.telefone_3,
      currentSale.telefone_3,
      "register"
    );
    compareAndLogChange("cep", data.cep, currentSale.cep, "register");
    compareAndLogChange("endereco", data.rua, currentSale.endereco, "register");
    compareAndLogChange(
      "numero_end",
      data.numero,
      currentSale.numero_end,
      "register"
    );
    compareAndLogChange(
      "complemento_end",
      data.complemento,
      currentSale.complemento_end,
      "register"
    );
    compareAndLogChange("bairro", data.bairro, currentSale.bairro, "register");
    compareAndLogChange("cidade", data.cidade, currentSale.cidade, "register");
    compareAndLogChange("uf", data.uf, currentSale.uf, "register");
    compareAndLogChange(
      "dt_instalacao",
      data.data_instalacao,
      formatarData(currentSale.dt_instalacao),
      "register"
    );
    compareAndLogChange(
      "vendedor",
      selectUsuario.find((set) => set.id_usuario === selectedUsuario).nome,
      currentSale.nome_usuario,
      "register"
    );
    compareAndLogChange(
      "plano",
      selectProdutos.find((set) => set.id_produto === selectedProdutos).nome,
      currentSale.nome_produto,
      "register"
    );
    compareAndLogChange(
      "tipo_pagmento",
      selectFormPag.find((set) => set.id_formpag === selectedFormPag).nome,
      currentSale.form_pag,
      "register"
    );
    compareAndLogChange(
      "etapa",
      selectEtapas.find((set) => set.id_etapa === selectedEtapas).nome,
      currentSale.nome_etapa,
      "register"
    );
    compareAndLogChange("banco", data.banco, currentSale.banco, "register");
    compareAndLogChange(
      "agencia",
      data.agencia,
      currentSale.agencia,
      "register"
    );
    compareAndLogChange("conta", data.conta, currentSale.conta, "register");

    if (selectedDiaVenc) {
      compareAndLogChange(
        "dia_venc",
        selectDiaVenc.find((set) => set.id === selectedDiaVenc).nome,
        selectDiaVenc.find((set) => set.id === currentSale.dia_venc).nome,
        "register"
      );
    }

    compareAndLogChange(
      "periodo",
      data.periodo,
      currentSale.periodo,
      "register"
    );
    compareAndLogChange(
      "observacao",
      data.observacao,
      currentSale.observacao,
      "register"
    );

    console.log(arrayPatch);
    if (
      Object.keys(arrayPatch.cliente).length === 0 &&
      Object.keys(arrayPatch.venda).length === 0
    ) {
      toast.info("Nenhum item foi alterado!");
    } else {
      //console.log(arrayPatch)
      patchSale(currentSale.id_venda, arrayPatch);
      closeModal();
    }
  };

  useEffect(() => {
    setSelectedEtapas(currentSale.id_etapa);
    setSelectedUsuario(currentSale.id_usuario);
    setSelectedProdutos(currentSale.id_produto);
    setSelectedFormPag(currentSale.id_formpag);
    setSelectedDiaVenc(currentSale.dia_venc);
  }, [currentSale.id_etapa]);

  return (
    <div className={styles.overlayBox} role="dialog">
      <div className={styles.modalBox}>
        <button className={styles.closeButton} onClick={closeModal}>
          <MdClose size={21} />
        </button>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.formContent}>
          <h1 className="title center grey0">Dados Cliente</h1>
          <div className={styles.contentBox}>
            <Input
              label="Nome"
              type="text"
              {...register("nome")}
              placeholder="Nome do cliente"
              defaultValue={currentSale.nome_cliente}
            />
            <Input
              label="CPF"
              type="number"
              {...register("cpf")}
              defaultValue={retiraCaracteres(currentSale.cpf)}
              placeholder="999.999.999-99"
            />
            <Input
              label="CNPJ"
              type="number"
              {...register("cnpj")}
              defaultValue={retiraCaracteres(currentSale.cnpj)}
              placeholder="999.999.999-99"
            />
            <Input
              label="Data Nascimento"
              type="date"
              {...register("data_nascimento")}
              defaultValue={formatarData(currentSale.dt_nascimento)}
            />
            <Input
              label="Nome mãe"
              type="text"
              {...register("nome_mae")}
              placeholder="Nome da mãe"
              defaultValue={currentSale.nome_mae}
            />
            <Input
              label="Email"
              type="text"
              {...register("email")}
              placeholder="Email"
              defaultValue={currentSale.email}
            />
            <Input
              label="Telefone Principal"
              type="number"
              {...register("telefone_1")}
              placeholder="(99)9 9999-9999"
              defaultValue={currentSale.telefone_1}
            />
            <Input
              label="Telefone 2"
              type="number"
              {...register("telefone_2")}
              placeholder="(99)9 9999-9999"
              defaultValue={currentSale.telefone_2}
            />
            <Input
              label="Telefone 3"
              type="number"
              {...register("telefone_3")}
              placeholder="(99)9 9999-9999"
              defaultValue={currentSale.telefone_3}
            />
            <Input
              label="CEP"
              type="number"
              {...register("cep")}
              placeholder="99999-999"
              defaultValue={currentSale.cep}
            />
            <Input
              label="Rua"
              type="text"
              {...register("rua")}
              placeholder="Rua..."
              defaultValue={currentSale.endereco}
            />
            <Input
              label="Numero"
              type="number"
              {...register("numero")}
              placeholder="Numero da Casa"
              defaultValue={currentSale.numero_end}
            />
            <Input
              label="Complemento"
              type="text"
              {...register("complemento")}
              placeholder="Complemento..."
              defaultValue={currentSale.complemento_end}
            />
            <Input
              label="Bairro"
              type="text"
              {...register("bairro")}
              placeholder="Bairro"
              defaultValue={currentSale.bairro}
            />
            <Input
              label="Cidade"
              type="text"
              {...register("cidade")}
              placeholder="Cidade"
              defaultValue={currentSale.cidade}
            />
            <Input
              label="UF"
              type="text"
              {...register("uf")}
              placeholder="UF"
              defaultValue={currentSale.uf}
            />
          </div>
          <h1 className="title center grey0">Dados da Venda</h1>
          <div className={styles.contentBox}>
            <Input
              label="Data Instalação"
              type="date"
              {...register("data_instalacao")}
              defaultValue={formatarData(currentSale.dt_instalacao)}
            />

            <Select
              name="vendedor"
              selectChange={selectChange}
              options={selectUsuario}
              id={selectedUsuario}
              onChange={setSelectedUsuario}
              placeholder="Selecione um vendedor"
              label="Vendedor"
              errorVerify={errorVerify}
              setErrorVerify={setErrorVerify}
            />
            <Input
              label="Data Venda"
              type="date"
              {...register("data_venda")}
              defaultValue={formatarData(currentSale.dt_ger)}
              disabled
            />
            <Select
              name="plano"
              selectChange={selectChange}
              options={selectProdutos}
              id={selectedProdutos}
              onChange={setSelectedProdutos}
              placeholder="Selecione um plano"
              label="Plano"
              errorVerify={errorVerify}
              setErrorVerify={setErrorVerify}
            />
            <Select
              name="formpag"
              selectChange={selectChange}
              options={selectFormPag}
              id={selectedFormPag}
              onChange={setSelectedFormPag}
              placeholder="Forma de Pagamento..."
              label="Forma de Pagamento"
              errorVerify={errorVerify}
              setErrorVerify={setErrorVerify}
            />
            <Select
              name="etapa"
              selectChange={selectChange}
              options={selectEtapas}
              id={selectedEtapas}
              onChange={setSelectedEtapas}
              placeholder="Todos"
              label="Etapa"
              errorVerify={errorVerify}
              setErrorVerify={setErrorVerify}
            />
            <Input
              label="Banco"
              type="text"
              {...register("banco")}
              placeholder="Banco"
              defaultValue={currentSale.banco}
            />
            <Input
              label="Agência"
              type="number"
              {...register("agencia")}
              placeholder="Agência"
              defaultValue={currentSale.agencia}
            />
            <Input
              label="Conta"
              type="number"
              {...register("conta")}
              placeholder="UF"
              defaultValue={retiraCaracteres(currentSale.conta)}
            />
            <Select
              name="dia_venc"
              selectChange={selectChange}
              options={selectDiaVenc}
              id={selectedDiaVenc}
              onChange={setSelectedDiaVenc}
              placeholder="Dia Vencimento"
              label="Dia Vencimento"
              errorVerify={errorVerify}
              setErrorVerify={setErrorVerify}
            />
            <Input
              label="Periodo"
              type="text"
              {...register("periodo")}
              placeholder="Periodo"
              defaultValue={currentSale.periodo}
            />
            <TextArea
              label="Observação"
              {...register("observacao")}
              placeholder="Digite a observação aqui..."
              rows={5}
              defaultValue={currentSale.observacao}
            />
          </div>
          <h1 className="title center grey0">Registro de Alteração</h1>
          <div className={styles.contentBoxGrid}>
            <ul>
              {saleRegisterList && saleRegisterList.length > 0 ? (
                saleRegisterList.map((sale) => (
                  <li
                    className="paragraph bold grey1"
                    key={sale.id_registersale}
                  >
                    {sale.descricao.split("\n").map((line, index) => (
                      <p key={index}>
                        {line} <br />
                      </p>
                    ))}{" "}
                  </li>
                ))
              ) : (
                <h1 className={`paragraph negative ${styles.noRegisterH1}`}>
                  Nenhum registro encontrado!
                </h1>
              )}
            </ul>
          </div>
          <button type="submit" className="btn solid primary full big">
            Salvar
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="btn solid negative full big"
          >
            Excluir
          </button>
        </form>
      </div>
    </div>
  );
};
