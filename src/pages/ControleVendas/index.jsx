import { useContext } from "react"
import { DefaultTemplate } from "../../components/DefaultTemplate"
import { SaleListComp } from "../../components/SaleList"
import { ControlSaleContext } from "../../providers/ControlSaleContext"
import styles from "./style.module.scss"
import { SaleEditModal } from "../../components/modal/SaleEditModal"

export const ControleVendas = () => {
    const { currentSale, loadingListSales } = useContext(ControlSaleContext)
    return (
        <>
            {currentSale ? (
                <SaleEditModal />
            ) : null}
            <DefaultTemplate>
                {loadingListSales && (
                    <div className={styles.overlaySpinner}>
                        <div className={styles.spinner}></div>
                    </div>
                )}
                <SaleListComp />
            </DefaultTemplate>
        </>
    )
}