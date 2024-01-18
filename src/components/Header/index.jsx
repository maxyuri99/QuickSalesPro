import { Link } from "react-router-dom"
import { UserContext } from "../../providers/UserContext"
import { useContext } from "react"
import styles from "./style.module.scss"
import { LiaUserCircleSolid, LiaBarsSolid, LiaChalkboardSolid, LiaClipboardListSolid, LiaCartPlusSolid, LiaClipboardSolid  } from "react-icons/lia"

export const Header = ({ children }) => {
    const { user, userLogout, isHeaderExpanded, setHeaderExpanded } = useContext(UserContext)

    return (
        <div className="container">
            <div className={styles.headerUser}>
                <div>
                    <LiaBarsSolid className="title bold grey1 click" onClick={() => { setHeaderExpanded(!isHeaderExpanded) }} />
                </div>
                <div>
                    <LiaUserCircleSolid className="title bold grey1" />
                    <p className="paragraph bold grey1">{user?.nome}</p>
                </div>
            </div>
            <div className="ajustPage">
                <div className={styles.headerPages}>
                    <div className={styles.divQuick}>
                        <h1 className="paragraph bold center ">Quick Sales Pro</h1>
                    </div>
                    <nav>
                        <ul>
                            <li>
                                <LiaChalkboardSolid className="paragraph big" />
                                <Link to='/quicksalespro/dashboard' className="paragraph small">
                                    Dashboard
                                </Link>
                            </li>
                            {(user.cargo === 1 || user.cargo === 4 || user.cargo === 5) ? (
                                <li>
                                    <LiaClipboardListSolid className="paragraph big" />
                                    <Link to='/quicksalespro/controle_vendas' className="paragraph small">
                                        Controle de Vendas
                                    </Link>
                                </li>
                            ) : null}

                            {(user.cargo !== 0) ? (
                                <>
                                    <li>
                                        <LiaCartPlusSolid className="paragraph big" />
                                        <Link to='/quicksalespro/nova_venda' className="paragraph small">
                                            Nova Venda
                                        </Link>
                                    </li>
                                    <li>
                                        <LiaClipboardSolid className="paragraph big"/>
                                        <Link to='/quicksalespro/minhas_vendas' className="paragraph small">
                                            Minhas Vendas
                                        </Link>
                                    </li>
                                </>
                            ) : null}

                            <li>
                                <button onClick={() => userLogout("Logout feito com sucesso!")} className="btn solid primaryNegative hover ">
                                    Sair
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="divChildren">
                    {children}
                </div>
            </div>
        </div>
    )
}