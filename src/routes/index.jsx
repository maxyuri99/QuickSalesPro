import { Route, Routes } from "react-router-dom"
import { Login } from "../pages/Login"
import { Dashboard } from "../pages/DashBoard"
import { ErrorPage } from "../pages/ErrorPage"
import { ControleVendas } from "../pages/ControleVendas"
import { NovaVenda } from "../pages/NovaVenda"

export const RoutesMain = () => {
    return (
        <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/controle-vendas' element={<ControleVendas />} />
            <Route path='/nova-venda' element={<NovaVenda />} />
            <Route path='*' element={<ErrorPage />} />
        </Routes>
    )
}