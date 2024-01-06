import { useContext } from 'react';
import { UserContext } from './providers/UserContext';
import { RoutesMain } from './routes'
import './styles/index.scss'
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.min.css"

function App() {
  const { loading } = useContext(UserContext);

  return (
    <>
      {loading ? <p>Carregando...</p> : <RoutesMain />}
      <ToastContainer position="bottom-right" autoClose={2 * 1000}  style={{ zIndex: 999999 }}/>
    </>
  )
}

export default App
