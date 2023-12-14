import { useContext } from "react"
import { DefaultTemplate } from "../../components/DefaultTemplate"
import { RegisterSaleForm } from "../../components/forms/RegisterSaleForm"
import { SaleContext } from "../../providers/SaleContext"
import styles from "./style.module.scss"

export const NovaVenda = () => {
    const { loadingListSales } = useContext(SaleContext)
    return (
        <main className={styles.background}>
            <DefaultTemplate>
                {loadingListSales && (
                    <div className={styles.overlay}>
                        <div className={styles.spinner}></div>
                    </div>
                )}
                <div className={styles.content}>
                    <h1 className="title grey1">Nova Venda</h1>
                    <RegisterSaleForm />
                </div>
            </DefaultTemplate>
        </main>
    )
}