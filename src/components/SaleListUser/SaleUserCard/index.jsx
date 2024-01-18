import { useContext } from "react"
import { ControlSaleContext } from "../../../providers/ControlSaleContext"
import styles from "./style.module.scss"

export const SaleUserCard = ({ sale }) => {
    const { setCurrentSale, getRegisterID} = useContext(ControlSaleContext)

    const CPFeCNPJ = sale.cpf? sale.cpf : sale.cnpj

    // const saleIten = (iten)=>{
    //     setCurrentSale(iten)
    //     getRegisterID(iten.id_venda)
    // }onClick={() => { saleIten({...sale})}}
    return (
        <li className={styles.saleCard} >
            <div>
                <span className="paragraph grey1">{CPFeCNPJ}
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
