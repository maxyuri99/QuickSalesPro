import { DefaultTemplate } from "../../components/DefaultTemplate"
import styles from "./style.module.scss"

export const Dashboard = () => {
    return (
        <div className={styles.background}>
            <DefaultTemplate >
                <main className={styles.content}>
                    <h1 className="title grey1">Dashboard do sistema Quick Sales Pro</h1>
                </main>
            </DefaultTemplate>
        </div>
    )
}