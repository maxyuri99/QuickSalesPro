import { LoginForm } from "../../components/forms/LoginForm"
import pageStyles from "../../styles/modules/pageBox.module.scss"
import styles from "./style.module.scss"

export const Login = () => {
    return (
        <main className={styles.background}>
            <div className={pageStyles.pageBox}>
                <div className="container">
                    <div className={styles.flexBox}>
                        <h1 className="title center grey0">Quick Sales Pro</h1>
                        <LoginForm />
                    </div>
                </div>
            </div>
        </main>
    )
}