import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Input } from "../Input"
import { SaleContext } from "../../../providers/SaleContext"
import { useContext } from "react"
import { Select } from "../Select"
import { registerSaleFormSchema } from "./registerSaleFormSchema"
import styles from "./style.module.scss"

export const RegisterSaleForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(registerSaleFormSchema)
    })

    const { selectedUsuario, selectedProdutos, selectedFormPag,
        setSelectedUsuario, setSelectedProdutos, setSelectedFormPag,
        selectUsuario, selectProdutos, selectFormPag,
        loadingNewSale, saleRegister } = useContext(SaleContext)

    const submit = (formData) => {

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
            cpf: formData.cpf,
            cnpj: formData.cnpj,
            cpf_socio: formData.cpf_socio,
            dt_nascimento: formData.dt_nascimento,
            nome_mae: formData.nome_mae,
            telefone_1: formData.telefone_1,
            telefone_2: formData.telefone_2,
            telefone_3: formData.telefone_3,
            endereco: formData.endereco,
            complemento_end: formData.complemento_end,
            numero_end: formData.numero_end,
            cep: formData.cep,
            bairro: formData.bairro,
            cidade: formData.cidade,
            uf: formData.uf,
        }

        saleRegister(vendaData)
    }

    return (
        <div className={styles.formcontainer}>
            <form onSubmit={handleSubmit(submit)} className={styles.flexbox}>
                <Input
                    label="CPF"
                    type="text"
                    {...register("cpf")}
                    error={errors.cpf}
                    disabled={loadingNewSale}
                    placeholder="Digite aqui o CPF do cliente"
                />
                <Input
                    label="CNPJ"
                    type="text"
                    {...register("cnpj")}
                    error={errors.cpnj}
                    disabled={loadingNewSale}
                    placeholder="Digite aqui o CPNJ do cliente"
                />
                <Input
                    label="Nome"
                    type="text"
                    {...register("nome")}
                    error={errors.name}
                    disabled={loadingNewSale}
                    placeholder="Digite aqui o nome do cliente"
                />
                <Input
                    label="Data Nascimento"
                    type="date"
                    {...register("dt_nascimento")}
                    error={errors.dt_nascimento}
                    disabled={loadingNewSale}
                    placeholder="Selecione a data de nascimento do cliente"
                />
                <Select
                    options={selectUsuario}
                    id={selectedUsuario}
                    onChange={setSelectedUsuario}
                    disabled={loadingNewSale}
                    placeholder="Selecione um vendedor"
                    label="Vendedor"
                />
                <Select
                    options={selectProdutos}
                    id={selectedProdutos}
                    onChange={setSelectedProdutos}
                    disabled={loadingNewSale}
                    placeholder="Selecione um plano"
                    label="Plano"
                />
                <Input
                    label="Email"
                    type="text"
                    {...register("email")}
                    error={errors.email}
                    disabled={loadingNewSale}
                    placeholder="Digite aqui o email do cliente"
                />
                <Input
                    label="Nome da Mãe"
                    type="text"
                    {...register("nome_mae")}
                    error={errors.nome_mae}
                    disabled={loadingNewSale}
                    placeholder="Digite aqui o nome da mãe do cliente"
                />
                <Input
                    label="Telefone Principal"
                    type="text"
                    {...register("telefone_1")}
                    error={errors.telefone_1}
                    disabled={loadingNewSale}
                    placeholder="Digite aqui o telefone principal do cliente"
                />
                <Input
                    label="Telefone 2"
                    type="text"
                    {...register("telefone_2")}
                    error={errors.telefone_2}
                    disabled={loadingNewSale}
                    placeholder="Digite aqui o telefone 2 do cliente"
                />
                <Input
                    label="Telefone 3"
                    type="text"
                    {...register("telefone_3")}
                    error={errors.telefone_3}
                    disabled={loadingNewSale}
                    placeholder="Digite aqui o telefone 3 do cliente"
                />
                <Input
                    label="CEP"
                    type="text"
                    {...register("cep")}
                    error={errors.cep}
                    disabled={loadingNewSale}
                    placeholder="Digite aqui o cep do cliente"
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
                <Select
                    options={selectFormPag}
                    id={selectedFormPag}
                    onChange={setSelectedFormPag}
                    disabled={loadingNewSale}
                    placeholder="Selecione uma Froma de Pagamento"
                    label="Forma de Pagamento"
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
                    label="CPF  Sócio"
                    type="text"
                    {...register("cpf_socio")}
                    error={errors.cpf_socio}
                    disabled={loadingNewSale}
                    placeholder="Digite aqui o CPF do Sócio do cliente"
                />
                <Input
                    label="Observações"
                    type="text"
                    {...register("observacao")}
                    error={errors.observacao}
                    disabled={loadingNewSale}
                    placeholder="Digite aqui as Observações da venda"
                />

                <div>
                    <button type="submit" className="btn solid primary full">
                        {loadingNewSale ? "Cadastrando..." : "Cadastrar"}
                    </button>
                </div>

            </form>
        </div>
    )
}