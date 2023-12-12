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
}

export const RegisterSaleForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(registerSaleFormSchema)
    })
    const [errorVerify, setErrorVerify] = useState({
        hasError: false,
        errorField: null,
        message: ''
    })
    const [values, setValues] = useState(initialValues)
    const [selectedRadio, setSelectedRadio] = useState("cpf")

    const { selectedUsuario, selectedProdutos, selectedFormPag,
        setSelectedUsuario, setSelectedProdutos, setSelectedFormPag,
        selectUsuario, selectProdutos, selectFormPag,
        loadingNewSale, saleRegister, getCEP } = useContext(SaleContext)

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

        // Dados da Venda
        const vendaData = {
            id_usuario: selectedUsuario,
            etapa: 38,
            ord_vendas: "",
            plano: selectedProdutos,
            periodo: formData.periodo,
            tipo_pagmento: selectedFormPag,
            banco: formData.banco,
            agencia: formData.agencia,
            conta: formData.conta,
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
            endereco: formData.endereco,
            complemento_end: formData.complemento_end,
            numero_end: formData.numero_end,
            cep: values.cep,
            bairro: formData.bairro,
            cidade: formData.cidade,
            uf: formData.uf,
        }

        saleRegister(vendaData)

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

        window.scrollTo({
            top: 0,
            behavior: 'smooth', 
        })

    }

    function handleChange(event) {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        })
    }

    function selectChange(name, valueIten) {
        setValues({
            ...values,
            [name]: valueIten
        })
    }

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
        <div className={styles.formcontainer}>
            <form onSubmit={handleSubmit(submit)} className={styles.flexbox}>
                <div className={styles.flexbox}>
                    <RadioSelector
                        options={optionsRadio}
                        label="CPF ou CNPJ:"
                        name="documentType"
                        value={selectedRadio}
                        onChange={handleRadioChange}
                    />
                </div>
                <div className={styles.flexbox}>

                    {selectedRadio === "cpf" && (
                        <>
                            <MaskedInput
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
                                placeholder="Nome da mãe do cliente"
                            />
                        </>
                    )}
                    {selectedRadio === "cnpj" && (
                        <>
                            <MaskedInput
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
                        placeholder="Selecione a data de nascimento do cliente"
                    />
                    <Input
                        label="Email"
                        type="text"
                        {...register("email")}
                        error={errors.email}
                        disabled={loadingNewSale}
                        placeholder="Digite aqui o email do cliente"
                    />
                    <MaskedInput
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
                        label="Numero Residencial"
                        type="text"
                        {...register("numero_end")}
                        error={errors.numero_end}
                        disabled={loadingNewSale}
                        placeholder="Digite aqui o numero residencial do cliente"
                    />
                    <Input
                        label="Bairro"
                        type="text"
                        {...register("bairro")}
                        error={errors.bairro}
                        disabled={loadingNewSale}
                        placeholder="Digite aqui o bairro do cliente"
                    />
                    <Input
                        label="Rua"
                        type="text"
                        {...register("endereco")}
                        error={errors.endereco}
                        disabled={loadingNewSale}
                        placeholder="Digite aqui a rua do cliente"
                    />
                    <Input
                        label="Complemento"
                        type="text"
                        {...register("complemento_end")}
                        error={errors.complemento_end}
                        disabled={loadingNewSale}
                        placeholder="Digite aqui o complemento do endereço"
                    />
                    <Input
                        label="Cidade"
                        type="text"
                        {...register("cidade")}
                        error={errors.cidade}
                        disabled={loadingNewSale}
                        placeholder="Digite aqui a cidade do cliente"
                    />
                    <Input
                        label="UF"
                        type="text"
                        {...register("uf")}
                        error={errors.uf}
                        disabled={loadingNewSale}
                        placeholder="Digite aqui a UF do cliente"
                    />
                </div>

                <div className={styles.flexbox}>
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
                        placeholder="Selecione uma Froma de Pagamento"
                        label="Forma de Pagamento"
                        errorVerify={errorVerify}
                        setErrorVerify={setErrorVerify}
                    />
                    <Input
                        label="Banco"
                        type="text"
                        {...register("banco")}
                        error={errors.banco}
                        disabled={loadingNewSale}
                        placeholder="Digite aqui o banco do cliente"
                    />
                    <Input
                        label="Agencia"
                        type="text"
                        {...register("agencia")}
                        error={errors.agencia}
                        disabled={loadingNewSale}
                        placeholder="Digite aqui a agencia do cliente"
                    />
                    <Input
                        label="Conta"
                        type="text"
                        {...register("conta")}
                        error={errors.conta}
                        disabled={loadingNewSale}
                        placeholder="Digite aqui a conta do cliente"
                    />
                    <Input
                        label="Observações"
                        type="text"
                        {...register("observacao")}
                        error={errors.observacao}
                        disabled={loadingNewSale}
                        placeholder="Digite aqui as Observações da venda"
                    />
                </div>

                {errorVerify.hasError && (
                    <p className="paragraph negative center">Complete todos os requisitos</p>
                )}

                <button type="submit" className="btn solid primary full">
                    {loadingNewSale ? "Cadastrando..." : "Cadastrar"}
                </button>
            </form>
            <button onClick={() => getCEP(88108330)}>getcep</button>
        </div>
    )
}