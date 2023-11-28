import { useContext } from "react"
import { SaleContext } from "../../providers/SaleContext"
import { SaleCard } from "./SaleCard";

export const SaleListComp = () => {
    const { saleList, getSales, loadingListSales } = useContext(SaleContext);
    return(
        <div>
            <div className="flexgap1">
                <h1 className="title grey0">Lista de Vendas</h1>
                <button onClick={getSales} className="btn solid primary small">Carregar Lista</button>
            </div>
            <div className="flexgap1">
                <span className="paragraph grey2">{ loadingListSales ? "Carregando..." : ""}</span>
            </div>
            <ul className="flexgap1">
                {saleList.map(sale => (
                    <SaleCard key={sale.id_venda} sale={sale} />
                ))}
            </ul>
        </div>
    )
}