import { useContext } from "react"
import { DefaultTemplate } from "../../components/DefaultTemplate"
import { ControlSaleContext } from "../../providers/ControlSaleContext"
import styles from "./style.module.scss"
import { SaleListUserComp } from "../../components/SaleListUser"

export const VendasPorUsuario = () => {
    const {  loadingListUserID } = useContext(ControlSaleContext)
    return (
        <>
            <DefaultTemplate>
                {loadingListUserID && (
                    <div className={styles.overlaySpinner}>
                        <div className={styles.spinner}></div>
                    </div>
                )}
                <SaleListUserComp />
            </DefaultTemplate>
        </>
    )
}