import { Route, Routes, useNavigate } from "react-router-dom"
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

export const RoutesMain = () => {
    return (
        <Routes>
            <Route element={<PublicRoutes />}>
                <Route path='/' element={<Login />} />
            </Route>
            <Route element={<PrivateRoutes />}>
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/controle_vendas' element={<SaleProvider><ControleVendas /></SaleProvider>} />
                <Route path='/nova_venda' element={<SaleProvider><NovaVenda /></SaleProvider>} />
                <Route path='/etapas' element={<Etapas />} />
                <Route path='/funcionarios' element={<Funcionarios />} />
                <Route path='/produtos' element={<Produtos />} />
                <Route path='/tipo_pagamento' element={<TipoPagamento />} />
            </Route>
            <Route path='*' element={<ErrorPage />} />
        </Routes>
    )
}