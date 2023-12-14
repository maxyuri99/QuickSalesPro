import { DefaultTemplate } from "../../components/DefaultTemplate"
import { SaleListComp } from "../../components/SaleList"
import styles from "./style.module.scss"

export const ControleVendas = () => {
    return (
        <DefaultTemplate>
            <main className={styles.background}>
                <div className={styles.content}>
                    <SaleListComp/>
                </div>
            </main>
        </DefaultTemplate>
    )
}