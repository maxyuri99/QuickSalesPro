import { MdClose, MdFavorite, MdFavoriteBorder, MdArrowBack, MdArrowForward } from "react-icons/md"
import styles from "./style.module.scss"
import { useKeydown } from "../../hooks/useKeydown"
import { useOutclick } from "../../hooks/useOutclick"
import { ControlSaleContext } from "../../../providers/ControlSaleContext"
import { useContext } from "react"
import { Input } from "../../forms/Input"
import { format } from 'date-fns'

export const SaleEditModal = () => {
    const { closeModal, currentSale } = useContext(ControlSaleContext)
    // assemelhar a um querySelector
    const boxRef = useOutclick(() => {
        if (currentSale) {
            closeModal()
        }
    })

    console.log(currentSale)

    useKeydown("Escape", () => {
        closeModal()
    })

    const retiraCaracteres = (iten) => {
        const itenFormated = iten?.replace(/[^\d]/g, '')

        return itenFormated
    }

    const formatarData = (iten) => {
        const dataFormatada = format(new Date(iten), 'yyyy-MM-dd')

        return dataFormatada
    }

    return (
        <div className={styles.overlayBox} role="dialog">
            <div ref={boxRef} className={styles.modalBox}>
                <button className={styles.closeButton} onClick={closeModal}>
                    <MdClose size={21} />
                </button>
                <div className={styles.divContBox}>
                    <h1 className="title center grey0">Dados Cliente</h1>
                    <div className={styles.contentBox}>
                        <Input
                            label="Nome"
                            type="text"
                            placeholder="Nome do cliente"
                            defaultValue={currentSale.nome_cliente}
                        />
                        <Input
                            label="CPF"
                            type="number"
                            defaultValue={retiraCaracteres(currentSale.cpf)}
                            placeholder="999.999.999-99"
                        />
                        <Input
                            label="CNPJ"
                            type="number"
                            defaultValue={retiraCaracteres(currentSale.cnpj)}
                            placeholder="999.999.999-99"
                        />
                        <Input
                            label="Data Nascimento"
                            type="date"
                            defaultValue={formatarData(currentSale.dt_nascimento)}
                        />
                        <Input
                            label="Nome mãe"
                            type="text"
                            placeholder="Nome da mãe"
                            defaultValue={currentSale.nome_mae}
                        />
                        <Input
                            label="Email"
                            type="text"
                            placeholder="Email"
                            defaultValue={currentSale.email}
                        />
                        <Input
                            label="Telefone Principal"
                            type="text"
                            placeholder="(99)9 9999-9999"
                            defaultValue={currentSale.telefone_1}
                        />
                        <Input
                            label="Telefone 2"
                            type="text"
                            placeholder="(99)9 9999-9999"
                            defaultValue={currentSale.telefone_2}
                        />
                        <Input
                            label="Telefone 3"
                            type="text"
                            placeholder="(99)9 9999-9999"
                            defaultValue={currentSale.telefone_3}
                        />
                        <Input
                            label="CEP"
                            type="number"
                            placeholder="99999-999"
                            defaultValue={currentSale.cep}
                        />
                        <Input
                            label="Rua"
                            type="text"
                            placeholder="Rua..."
                            defaultValue={currentSale.endereco}
                        />
                        <Input
                            label="Numero"
                            type="number"
                            placeholder="Numero da Casa"
                            defaultValue={currentSale.numero_end}
                        />
                        <Input
                            label="Bairro"
                            type="text"
                            placeholder="Bairro"
                            defaultValue={currentSale.bairro}
                        />
                        <Input
                            label="Cidade"
                            type="text"
                            placeholder="Cidade"
                            defaultValue={currentSale.cidade}
                        />
                        <Input
                            label="UF"
                            type="text"
                            placeholder="UF"
                            defaultValue={currentSale.uf}
                        />

                    </div>
                    <h1 className="title center grey0">Dados da Venda</h1>
                    <div className={styles.contentBox}>
                        <Input
                            label="Data Instalação"
                            type="date"
                            defaultValue={formatarData(currentSale.dt_instalacao)}
                        />
                        <Input
                            label="Ord. Venda"
                            type="text"
                            placeholder="Ordem de Venda"
                            defaultValue={currentSale.ord_vendas}
                        />
                        <Input
                            label="Nome Consultor"
                            type="text"
                            placeholder="Nome Consultor"
                            defaultValue={currentSale.nome_usuario}
                        />
                        <Input
                            label="Data Venda"
                            type="date"
                            defaultValue={formatarData(currentSale.dt_ger)}
                        />
                        <Input
                            label="Plano"
                            type="text"
                            placeholder="Plano"
                            defaultValue={currentSale.nome_produto}
                        />
                        <Input
                            label="Tipo Pagamento"
                            type="text"
                            placeholder="Tipo Pagamento"
                            defaultValue={currentSale.form_pag}
                        />
                    </div>
                    <button className="btn solid primary full big">Salvar</button>
                </div>
            </div>
        </div>
    )
}
