import { Link } from "react-router-dom"
import { UserContext } from "../../providers/UserContext"
import { useContext } from "react"
import styles from "./style.module.scss"

export const Header = ({ }) => {
    const { user, userLogout } = useContext(UserContext)

    return (
        <header>
            <div className={styles.flexbox}>
                <div className={styles.header}>
                    <div>
                        <div className="paragraph bold center">
                            <p>{user?.nome}</p>
                        </div>
                    </div>
                    <nav>
                        <ul>
                            <li>
                                <Link to='/' className="paragraph">
                                    Dashboard
                                </Link>
                            </li>
                            {(user.cargo === 1 || user.cargo === 4 || user.cargo === 5) ? (
                                <li>
                                    <Link to='/controle_vendas' className="paragraph">
                                        Controle de Vendas
                                    </Link>
                                </li>
                            ) : null}

                            {(user.cargo !== 0) ? (
                                <li>
                                    <Link to='/nova_venda' className="paragraph">
                                        Nova Venda
                                    </Link>
                                </li>
                            ) : null}

                            <li>
                                <button onClick={() => userLogout("Logout feito com sucesso!")} className="btn solid primaryNegative hover ">
                                    Sair
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )
}