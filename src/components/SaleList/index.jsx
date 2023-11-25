import { useContext } from "react"
import { SaleContext } from "../../providers/SaleContext"
import { SaleCard } from "./SaleCard";

export const SaleListComp = () => {
    const { saleList } = useContext(SaleContext);
    return(
        <div>
            <div>
                <h1 className="title">Lista de Vendas</h1>
            </div>
            <ul>
                {saleList.map(sale => (
                    <SaleCard key={sale.id_venda} sale={sale} />
                ))}
            </ul>
        </div>
    )
}