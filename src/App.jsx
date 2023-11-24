import { RoutesMain } from './routes'
import './styles/index.scss'
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.min.css"

function App() {

  return (
    <>
        <RoutesMain />

        <ToastContainer position="bottom-right" autoClose={2 * 1000} />
    </>
  )
}

export default App
