import { useContext } from "react"
import { ControlSaleContext } from "../../../providers/ControlSaleContext"
import styles from "./style.module.scss"

export const SaleCard = ({ sale }) => {
    const { setCurrentSale, currentSale } = useContext(ControlSaleContext)

    const saleIten = (iten)=>{
        setCurrentSale(iten)
    }
    return (
        <li className={styles.saleCard} onClick={() => { saleIten({...sale})}} >
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
