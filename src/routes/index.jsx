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

export const RoutesMain = () => {
    return (
        <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/controle_vendas' element={<ControleVendas />} />
            <Route path='/nova_venda' element={<NovaVenda />} />
            <Route path='/etapas' element={<Etapas />} />
            <Route path='/funcionarios' element={<Funcionarios />} />
            <Route path='/produtos' element={<Produtos />} />
            <Route path='/tipo_pagamento' element={<TipoPagamento />} />
            <Route path='*' element={<ErrorPage />} />
        </Routes>
    )
}