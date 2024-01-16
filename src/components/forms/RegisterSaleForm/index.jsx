import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Input } from "../Input"
import { SaleContext } from "../../../providers/SaleContext"
import { useContext, useState } from "react"
import { Select } from "../Select"
import { registerSaleFormSchema } from "./registerSaleFormSchema"
import styles from "./style.module.scss"
import { MaskedInput } from "../InputMaskCPF"
import { RadioSelector } from "../Radio"
import { useEffect } from "react"
import { toast } from "react-toastify"
import { MyDatePicker } from "../InputDate"

export const RegisterSaleForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(registerSaleFormSchema())
    })
    const [errorVerify, setErrorVerify] = useState({
        hasError: false,
        errorField: null,
        message: ''
    })

    const {
        selectedUsuario, selectedProdutos, selectedFormPag,
        selectedDiaVenc, selectedBanco,
        setSelectedUsuario, setSelectedProdutos, setSelectedFormPag,
        setSelectedDiaVenc, setSelectedBanco, values, setValues, initialValues,

        selectChange, selectedRadio, setSelectedRadio,
        handleChange,

        selectUsuario, selectProdutos, selectFormPag, selectDiaVenc, selectBanco,
        loadingNewSale, saleRegister, getCEP, cepIten, setCepIten } = useContext(SaleContext)

    const optionsRadio = [
        { value: "cpf", label: "CPF" },
        { value: "cnpj", label: "CNPJ" },
    ]

    const submit = (formData) => {

        setErrorVerify({
            hasError: false,
            errorField: null,
            message: ''
        })

        if (selectedRadio === "cpf") {
            if (!values.cpf || values.cpf.length !== 11) {
                console.log("Erro: CPF inválido")
                setErrorVerify({
                    hasError: true,
                    errorField: 'cpf',
                    message: 'CPF inválido'
                })
                return
            }
        } else if (selectedRadio === "cnpj") {
            if (!values.cnpj || values.cnpj.length !== 14) {
                console.log("Erro: CNPJ inválido")
                setErrorVerify({
                    hasError: true,
                    errorField: 'cnpj',
                    message: 'CNPJ inválido'
                })
                return
            }
            if (!values.cpf_socio || values.cpf_socio.length !== 11) {
                console.log("Erro: CPF Sócio inválido")
                setErrorVerify({
                    hasError: true,
                    errorField: 'cpf_socio',
                    message: 'CPF Sócio inválido'
                })
                return
            }
        }

        if (!values.telefone_1 || values.telefone_1.length !== 11) {
            console.log("Erro: Telefone Principal inválido")
            setErrorVerify({
                hasError: true,
                errorField: 'telefone_1',
                message: 'Telefone Principal inválido'
            })
            return
        }

        if (!values.cep || values.cep.length !== 8) {
            console.log("Erro: CEP inválido")
            setErrorVerify({
                hasError: true,
                errorField: 'cep',
                message: 'CEP inválido'
            })
            return
        }


        if (values.vendedor === 0) {
            console.log("Erro: Vendedor inválido")
            setErrorVerify({
                hasError: true,
                errorField: 'vendedor',
                message: 'Selecione um vendedor'
            })
            return
        }

        if (values.plano === 0) {
            console.log("Erro: Plano inválido")
            setErrorVerify({
                hasError: true,
                errorField: 'plano',
                message: 'Selecione um Plano'
            })
            return
        }

        if (values.formpag === 0) {
            console.log("Erro: formpag inválido")
            setErrorVerify({
                hasError: true,
                errorField: 'formpag',
                message: 'Selecione uma Forma de Pagamento'
            })
            return
        }

        if (values.banco === 0 && selectedFormPag === 1) {
            console.log("Erro: banco inválido")
            setErrorVerify({
                hasError: true,
                errorField: 'banco',
                message: 'Selecione um Banco'
            })
            return
        }

        if (values.dia_venc === 0) {
            console.log("Erro: dia_venc inválido")
            setErrorVerify({
                hasError: true,
                errorField: 'dia_venc',
                message: 'Selecione um Dia de Vencimento'
            })
            return
        }

        console.log(values)
        if (values.agencia.length === 0 && selectedFormPag === 1) {
            console.log("Erro: Agência inválida")
            toast.error("Agência deve ser preenchida")
            return
        }

        if (values.conta.length === 0 && selectedFormPag === 1) {
            console.log("Erro: Conta inválida")
            toast.error("Conta deve ser preenchida")
            return
        }

        if ((!formData.bairro && !cepIten.neighborhood) || (!formData.cidade && !cepIten.city) || (!formData.uf && !cepIten.state) || (!formData.endereco && !cepIten.street)) {
            console.log("Erro: Itens endereço inválidos")
            toast.error("Você deve preencher todos os itens do endereço")
            return
        }

        // Dados da Venda
        const vendaData = {
            id_usuario: selectedUsuario,
            etapa: 13, //Etapa Inicial é BKO ID 13 no banco
            ord_vendas: "",
            plano: selectedProdutos,
            periodo: formData.periodo,
            tipo_pagmento: selectedFormPag,
            banco: selectedFormPag === 1 ? (
                selectBanco.find(objeto => objeto.id === selectedBanco).nome
            ) : (''),
            agencia: selectedFormPag === 1 ? (
                values.agencia
            ) : (''),
            conta: selectedFormPag === 1 ? (
                values.conta
            ) : (''),
            observacao: formData.observacao,
            nome: formData.nome,
            email: formData.email,
            cpf: values.cpf,
            cnpj: values.cnpj,
            cpf_socio: values.cpf_socio,
            dt_nascimento: formData.dt_nascimento,
            nome_mae: formData.nome_mae,
            telefone_1: values.telefone_1,
            telefone_2: values.telefone_2,
            telefone_3: values.telefone_3,
            endereco: cepIten.street,
            complemento_end: formData.complemento_end,
            numero_end: formData.numero_end,
            cep: values.cep,
            bairro: cepIten.neighborhood,
            cidade: cepIten.city,
            uf: cepIten.state,
            dia_venc: selectedDiaVenc,
        }

        //console.log(vendaData)
        saleRegister(vendaData)

        document.documentElement.scrollTo({
            top: 0,
            behavior: 'smooth',
        })

        reset()

        setValues(initialValues)

        setErrorVerify({
            hasError: false,
            errorField: null,
            message: '',
        })

        setSelectedFormPag(0)
        setSelectedProdutos(0)
        setSelectedUsuario(0)
        setSelectedBanco(0)
        setSelectedDiaVenc(0)

        setCepIten({})
    }

    useEffect(() => {
        if (values.cep.length === 8) {
            getCEP(values.cep)
        }
    }, [values.cep])

    const handleRadioChange = (value) => {
        setSelectedRadio(value);
        // Limpar os campos quando o selectedRadio for alterado
        setValues(initialValues);
        setErrorVerify({
            hasError: false,
            errorField: null,
            message: ''
        });
    }

    return (
        <div className={``}>
            <form onSubmit={handleSubmit(submit)} className={styles.flexbox}>
                <div>
                    <RadioSelector
                        options={optionsRadio}
                        label="CPF ou CNPJ:"
                        name="documentType"
                        value={selectedRadio}
                        onChange={handleRadioChange}
                    />
                </div>
                <div className={`${styles.divClientData} ${styles.otherSections}`}>
                    {selectedRadio === "cpf" && (
                        <>
                            <MaskedInput
                                type="number"
                                label="CPF"
                                name="cpf"
                                mask="999.999.999-99"
                                value={values.cpf}
                                onChange={handleChange}
                                disabled={loadingNewSale}
                                placeholder="999.999.999-99"
                                errorVerify={errorVerify}
                                setErrorVerify={setErrorVerify}
                            />
                            <Input
                                label="Nome"
                                type="text"
                                {...register("nome")}
                                error={errors.nome}
                                disabled={loadingNewSale}
                                placeholder="Nome do cliente"
                            />
                            <Input
                                label="Nome da Mãe"
                                type="text"
                                {...register("nome_mae")}
                                error={errors.nome_mae}
                                disabled={loadingNewSale}
                                placeholder="Nome mãe do cliente"
                            />
                        </>
                    )}
                    {selectedRadio === "cnpj" && (
                        <>
                            <MaskedInput
                                type="number"
                                label="CNPJ"
                                name="cnpj"
                                mask="99.999.999/9999-99"
                                value={values.cnpj}
                                onChange={handleChange}
                                disabled={loadingNewSale}
                                placeholder="99.999.999/9999-99"
                                errorVerify={errorVerify}
                                setErrorVerify={setErrorVerify}
                            />

                            <MaskedInput
                                type="number"
                                label="CPF Sócio"
                                name="cpf_socio"
                                mask="999.999.999-99"
                                value={values.cpf_socio}
                                onChange={handleChange}
                                disabled={loadingNewSale}
                                placeholder="999.999.999-99"
                                errorVerify={errorVerify}
                                setErrorVerify={setErrorVerify}
                            />

                            <Input
                                label="Nome"
                                type="text"
                                {...register("nome")}
                                error={errors.name}
                                disabled={loadingNewSale}
                                placeholder="Digite aqui o nome do cliente"
                            />
                        </>
                    )}
                    <Input
                        label="Data Nascimento"
                        type="date"
                        {...register("dt_nascimento")}
                        error={errors.dt_nascimento}
                        disabled={loadingNewSale}
                    />
                    <MyDatePicker
                        label="Data"
                        disabled={loadingNewSale}
                        placeholder="Email do cliente"
                    />
                    <Input
                        label="Email"
                        type="text"
                        {...register("email")}
                        error={errors.email}
                        disabled={loadingNewSale}
                        placeholder="Email do cliente"
                    />
                    <MaskedInput
                        type="number"
                        label="Telefone Principal"
                        name="telefone_1"
                        mask="(99)9 9999-9999"
                        value={values.telefone_1}
                        onChange={handleChange}
                        disabled={loadingNewSale}
                        placeholder="(99)9 9999-9999"
                        errorVerify={errorVerify}
                        setErrorVerify={setErrorVerify}
                    />
                    <MaskedInput
                        type="number"
                        label="Telefone Residencial"
                        name="telefone_2"
                        mask="(99) 9999-9999"
                        value={values.telefone_2}
                        onChange={handleChange}
                        disabled={loadingNewSale}
                        placeholder="(99) 9999-9999"
                        errorVerify={errorVerify}
                        setErrorVerify={setErrorVerify}
                    />
                    <MaskedInput
                        type="number"
                        label="Telefone Reserva"
                        name="telefone_3"
                        mask="(99)9 9999-9999"
                        value={values.telefone_3}
                        onChange={handleChange}
                        disabled={loadingNewSale}
                        placeholder="(99)9 9999-9999"
                        errorVerify={errorVerify}
                        setErrorVerify={setErrorVerify}
                    />
                    <MaskedInput
                        type="number"
                        label="CEP"
                        name="cep"
                        mask="99999-999"
                        value={values.cep}
                        onChange={handleChange}
                        disabled={loadingNewSale}
                        placeholder="99999-99"
                        errorVerify={errorVerify}
                        setErrorVerify={setErrorVerify}
                    />
                    <Input
                        label="Rua"
                        type="text"
                        value={cepIten?.street}
                        disabled={loadingNewSale}
                        placeholder="Rua do cliente"
                        onChange={(e) => setCepIten(prevCepIten => ({
                            ...prevCepIten,
                            street: e.target.value
                        }))}
                    />
                    <Input
                        label="Numero Residencial"
                        type="number"
                        {...register("numero_end")}
                        error={errors.numero_end}
                        disabled={loadingNewSale}
                        placeholder="Numero residencial"
                    />
                    <Input
                        label="Complemento"
                        type="text"
                        {...register("complemento_end")}
                        error={errors.complemento_end}
                        disabled={loadingNewSale}
                        placeholder="Complemento do endereço"
                    />
                    <Input
                        label="Bairro"
                        type="text"
                        value={cepIten?.neighborhood}
                        disabled={loadingNewSale}
                        placeholder="Bairro do cliente"
                        onChange={(e) => setCepIten(prevCepIten => ({
                            ...prevCepIten,
                            neighborhood: e.target.value
                        }))}
                    />
                    <Input
                        label="Cidade"
                        type="text"
                        value={cepIten?.city}
                        disabled={loadingNewSale}
                        placeholder="Cidade do cliente"
                        onChange={(e) => setCepIten(prevCepIten => ({
                            ...prevCepIten,
                            city: e.target.value
                        }))}
                    />
                    <Input
                        label="UF"
                        type="text"
                        value={cepIten?.state}
                        disabled={loadingNewSale}
                        placeholder="UF do cliente"
                        onChange={(e) => setCepIten(prevCepIten => ({
                            ...prevCepIten,
                            state: e.target.value
                        }))}
                    />
                </div>

                <div className={`${styles.divSaleData} ${styles.otherSections}`}>
                    <Select
                        name="vendedor"
                        value={values.vendedor}
                        selectChange={selectChange}
                        options={selectUsuario}
                        id={selectedUsuario}
                        onChange={setSelectedUsuario}
                        disabled={loadingNewSale}
                        placeholder="Selecione um vendedor"
                        label="Vendedor"
                        errorVerify={errorVerify}
                        setErrorVerify={setErrorVerify}
                    />
                    <Select
                        name="plano"
                        value={values.plano}
                        selectChange={selectChange}
                        options={selectProdutos}
                        id={selectedProdutos}
                        onChange={setSelectedProdutos}
                        disabled={loadingNewSale}
                        placeholder="Selecione um plano"
                        label="Plano"
                        errorVerify={errorVerify}
                        setErrorVerify={setErrorVerify}
                    />
                    <Select
                        name="formpag"
                        value={values.formpag}
                        selectChange={selectChange}
                        options={selectFormPag}
                        id={selectedFormPag}
                        onChange={setSelectedFormPag}
                        disabled={loadingNewSale}
                        placeholder="Forma de Pagamento..."
                        label="Forma de Pagamento"
                        errorVerify={errorVerify}
                        setErrorVerify={setErrorVerify}
                    />
                    {selectedFormPag === 1 ? (
                        <>
                            <Select
                                name="banco"
                                value={values.banco}
                                selectChange={selectChange}
                                options={selectBanco}
                                id={selectedBanco}
                                onChange={setSelectedBanco}
                                disabled={loadingNewSale}
                                placeholder="Banco"
                                label="Banco"
                                errorVerify={errorVerify}
                                setErrorVerify={setErrorVerify}
                            />
                            <Input
                                label="Agencia"
                                type="number"
                                name="agencia"
                                onChange={handleChange}
                                disabled={loadingNewSale}
                                placeholder="Agencia do cliente"
                            />
                            <Input
                                label="Conta"
                                type="number"
                                name="conta"
                                onChange={handleChange}
                                disabled={loadingNewSale}
                                placeholder="Conta do cliente"
                            />
                        </>
                    ) : (null)}
                    <Select
                        name="dia_venc"
                        value={values.dia_venc}
                        selectChange={selectChange}
                        options={selectDiaVenc}
                        id={selectedDiaVenc}
                        onChange={setSelectedDiaVenc}
                        disabled={loadingNewSale}
                        placeholder="Dia Vencimento"
                        label="Dia Vencimento"
                        errorVerify={errorVerify}
                        setErrorVerify={setErrorVerify}
                    />
                    <Input
                        label="Observações"
                        type="text"
                        {...register("observacao")}
                        error={errors.observacao}
                        disabled={loadingNewSale}
                        placeholder="Observações da venda"
                    />
                </div>

                {errorVerify.hasError && (
                    <p className="paragraph negative center">Complete todos os requisitos</p>
                )}

                <button type="submit" className="btn solid primary full">
                    {loadingNewSale ? "Cadastrando..." : "Cadastrar"}
                </button>
            </form>
        </div>
    )
}