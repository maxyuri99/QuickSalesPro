import { Link } from "react-router-dom"
import styles from "./style.module.scss"

export const SaleCard = ({ sale }) => {
    return (
        <li className={styles.saleCard} >
            <div>
                <span className="paragraph grey1">{sale.cpf}
                </span>
                <span className="paragraph grey1">{sale.nome_cliente}
                </span>
                <span className="paragraph grey1">{sale.nome_usuario}</span>
                <span className="paragraph grey1">{sale.nome_produto}</span>
                <span className="paragraph grey1">{sale.nome_etapa}</span>
                <span className="paragraph grey1">{new Date(sale.dt_ger).toLocaleDateString()}</span>
            </div>
        </li>
    )
}
