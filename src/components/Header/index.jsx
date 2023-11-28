import { Link } from "react-router-dom"
import { UserContext } from "../../providers/UserContext"
import { useContext } from "react"
import "./style.scss"

export const Header = ({ }) => {
    const { user, userLogout } = useContext(UserContext)

    return (
        <header>
            <div className="flexbox">
                <div className="header">
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
                            <li>
                                <Link to='/nova_venda' className="paragraph">
                                    Nova Venda
                                </Link>
                            </li>
                            <li>
                                <Link to='/controle_vendas' className="paragraph">
                                    Controle de Vendas
                                </Link>
                            </li>

                            <li>
                                <button onClick={() => userLogout()} className="btn solid primaryNegative hover ">
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