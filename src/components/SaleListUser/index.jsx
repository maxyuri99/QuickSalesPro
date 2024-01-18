import { useContext } from "react"
import { ControlSaleContext } from "../../providers/ControlSaleContext"
import styles from "./style.module.scss"
import { SaleUserCard } from "./SaleUserCard"

export const SaleListUserComp = () => {
    const {
        saleListUserID, 
        handleUpdateListUserID,
        saleListUserIDFilter,
    } = useContext(ControlSaleContext)

    const clickButtonAtualizar = () => {
        handleUpdateListUserID()
    }

    const coutItens = saleListUserIDFilter.length

    return (
        <div className={styles.saleListDiv}>
            <div >
                <h1 className="title grey0">Minhas Vendas</h1>
                <button onClick={clickButtonAtualizar} className="btn solid primary small">Atualizar Lista</button>
            </div>
            <div className={styles.filterDivAll}>
                <h1 className="paragraph big grey0">Total de Vendas: {saleListUserIDFilter ? coutItens : 0}</h1>
            </div>
            <ul>
                <section className={styles.sectionAllTabel}>
                    <div className={styles.saleTitles}>
                        <span className="paragraph grey1">CPF/CNPJ:</span>
                        <span className="paragraph grey1">Cliente:</span>
                        <span className="paragraph grey1">Nome Consultor:</span>
                        <span className="paragraph grey1">Plano: </span>
                        <span className="paragraph grey1">Etapa: </span>
                        <span className="paragraph grey1">Data Geração:</span>
                    </div>
                    <div className={styles.divSaleCard}>
                        {saleListUserIDFilter && saleListUserIDFilter.length > 0 ? (
                            saleListUserIDFilter.map(sale => (
                                <SaleUserCard key={sale.id_venda} sale={sale} />
                            ))
                        ) : (
                            <h1 className={`paragraph negative ${styles.noRegisterH1}`}>Nenhum registro encontrado!</h1>
                        )}
                    </div>
                </section >
            </ul >
        </div >
    )
}