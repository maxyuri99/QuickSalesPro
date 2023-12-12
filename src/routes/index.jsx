import { Route, Routes } from "react-router-dom"
import { Login } from "../pages/Login"
import { Dashboard } from "../pages/DashBoard"
import { ErrorPage } from "../pages/ErrorPage"
import { ControleVendas } from "../pages/ControleVendas"
import { NovaVenda } from "../pages/NovaVenda"
import { Etapas } from "../pages/Etapas"
import { Funcionarios } from "../pages/Funcionarios"
import { Produtos } from "../pages/Produtos"
import { TipoPagamento } from "../pages/TipoPagamento"
import { PrivateRoutes } from "./PrivateRoutes"
import { PublicRoutes } from "./PublicRoutes"
import { SaleProvider } from "../providers/SaleContext"
import { useContext } from "react"
import { UserContext } from "../providers/UserContext"

export const RoutesMain = () => {
    const { user } = useContext(UserContext)

    return (
        <Routes>
            <Route element={<PublicRoutes />}>
                <Route path='/quicksalespro/' element={<Login />} />
            </Route>
            <Route element={<PrivateRoutes />}>
                <Route path='/quicksalespro/dashboard' element={<Dashboard />} />
                {(user.cargo === 1 || user.cargo === 4 || user.cargo === 5) ? (
                    <>
                        <Route path="/quicksalespro/controle_vendas" element={<SaleProvider><ControleVendas /></SaleProvider>} />
                        <Route path='/quicksalespro/etapas' element={<Etapas />} />
                        <Route path='/quicksalespro/funcionarios' element={<Funcionarios />} />
                        <Route path='/quicksalespro/produtos' element={<Produtos />} />
                        <Route path='/quicksalespro/tipo_pagamento' element={<TipoPagamento />} />
                    </>
                ) : null}
                {(user.cargo !== 0 ) ? (
                    <>
                        <Route path="/quicksalespro/nova_venda" element={<SaleProvider><NovaVenda /></SaleProvider>} />
                    </>
                ) : null}

            </Route>
            <Route path='/*' element={<ErrorPage />} />
        </Routes>
    )
}