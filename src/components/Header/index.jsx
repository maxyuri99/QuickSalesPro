import { Link } from "react-router-dom"
import { UserContext } from "../../providers/UserContext"
import { useContext } from "react"

export const Header = ({}) => {
    const { user, userLogout } =  useContext(UserContext)

    return (
        <header>
            Header
            <div>
                <div>
                    <p>{user?.nome}</p>
                </div>
            </div>
            <nav>
                <ul>
                    <li>
                        <Link to='/'>
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link to='/nova_venda'>
                            Nova Venda
                        </Link>
                    </li>
                    <li>
                        <Link to='/controle_vendas'>
                            Controle de Vendas
                        </Link>
                    </li>
                    <li>
                        <Link to='/produtos'>
                            Produtos
                        </Link>
                    </li>
                    <li>
                        <button onClick={() => userLogout()}>
                            Sair
                        </button>
                    </li>
                </ul>
            </nav>
        </header>
    )
}