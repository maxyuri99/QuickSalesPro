import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "../pages/Login";
import { Dashboard } from "../pages/DashBoard";
import { ErrorPage } from "../pages/ErrorPage";
import { ControleVendas } from "../pages/ControleVendas";
import { NovaVenda } from "../pages/NovaVenda";
import { Etapas } from "../pages/Etapas";
import { Produtos } from "../pages/Produtos";
import { TipoPagamento } from "../pages/TipoPagamento";
import { PrivateRoutes } from "./PrivateRoutes";
import { PublicRoutes } from "./PublicRoutes";
import { SaleProvider } from "../providers/SaleContext";
import { useContext } from "react";
import { UserContext } from "../providers/UserContext";
import { ControlSaleProvider } from "../providers/ControlSaleContext";
import { VendasPorUsuario } from "../pages/VendasUsuarios";
import { ControlUserProvider } from "@/providers/ControlUserContext";
import { Usuarios } from "@/pages/Usuarios";

export const RoutesMain = () => {
  const { user } = useContext(UserContext);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/quicksalespro" replace />} />
      <Route element={<PublicRoutes />}>
        <Route path="/quicksalespro" element={<Login />} />
      </Route>
      <Route element={<PrivateRoutes />}>
        {/* <Route path='/quicksalespro/dashboard' element={<Dashboard />} /> */}
        {user.cargo === 1 || user.cargo === 4 || user.cargo === 5 ? (
          <>
            <Route
              path="/quicksalespro/controle_vendas"
              element={
                <ControlSaleProvider>
                  {" "}
                  <ControleVendas />{" "}
                </ControlSaleProvider>
              }
            />
            <Route path="/quicksalespro/etapas" element={<Etapas />} />
            <Route
              path="/quicksalespro/usuarios"
              element={
                <ControlUserProvider>
                  <Usuarios />
                </ControlUserProvider>
              }
            />
            <Route path="/quicksalespro/produtos" element={<Produtos />} />
            <Route
              path="/quicksalespro/tipo_pagamento"
              element={<TipoPagamento />}
            />
          </>
        ) : null}
        {user.cargo !== 0 ? (
          <>
            <Route
              path="/quicksalespro/nova_venda"
              element={
                <SaleProvider>
                  <NovaVenda />
                </SaleProvider>
              }
            />
            <Route
              path="/quicksalespro/minhas_vendas"
              element={
                <ControlSaleProvider>
                  <VendasPorUsuario />
                </ControlSaleProvider>
              }
            />
          </>
        ) : null}
      </Route>
      <Route path="/*" element={<ErrorPage />} />
    </Routes>
  );
};
