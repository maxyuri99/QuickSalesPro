import { MdEdit, MdDelete, MdVisibility } from "react-icons/md"
import { Link } from "react-router-dom"

export const SaleCard = ({ sale }) => {
    return (
        <li>
            <div>
                <span className="paragraph grey1">
                    <strong>Id Venda: {sale.id_venda}</strong>
                    Cliente: {sale.nome_cliente}
                    Nome Usuario: {sale.nome_usuario}
                    Plano: {sale.nome_produto}
                    Etapa: {sale.nome_etapa}
                    Banco: {sale.banco}
                    Agencia: {sale.agencia}
                    Conta: {sale.conta}
                    Data: {sale.dt_ger}
                </span>
            </div>
            <div>
                <button title="Editar" aria-label="edit" className="paragraph grey2">
                    <MdEdit />
                </button>
                <button title="Visualizar nota" aria-label="view" className="paragraph grey2">
                    <MdVisibility />
                </button>
            </div>
        </li>
    )
}
