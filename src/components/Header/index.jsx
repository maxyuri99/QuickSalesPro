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
                    <p>{user?.login}</p>
                </div>
            </div>
            <nav>
                <ul>
                    <li>
                        <Link to='/'>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to='/nova_venda'>
                            Nova Venda
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