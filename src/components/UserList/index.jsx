import React, { useState } from "react";
import { DataTable } from "../ui/data-table.tsx";
import { columns } from "./colum.tsx";
import { ControlUserContext } from "@/providers/ControlUserContext";
import { useContext } from "react";
import { Input } from "../ui/input";
import { DialogInsertUser } from "../modal/UserInsertModal/index.jsx";
import { Label } from "../ui/label.tsx";
import { Button } from "../ui/button";

export const UserComp = () => {
  const { usersAll, handleGetAll } = useContext(ControlUserContext);
  const [filtroNome, setFiltroNome] = useState("");

  const usersFiltrados = usersAll.filter((user) =>
    user.nome.toLowerCase().includes(filtroNome.toLowerCase())
  );

  return (
    <div className="flex flex-col justify-between gap-5">
      <div className="flex justify-between items-center">
        <h1 className="title grey0">Controle de Usuarios</h1>
        <Button variant="secondary" onClick={() => handleGetAll()}>Atualizar Lista</Button>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <Label className="text-slate-300">Filtrar por nome</Label>
          <Input
            className="text-slate-300 border-solid w-auto"
            type="text"
            name="nome"
            placeholder="Nome do usuario"
            value={filtroNome}
            onChange={(e) => setFiltroNome(e.target.value)}
          />
        </div>
        <DialogInsertUser />
      </div>
      <DataTable columns={columns} data={usersFiltrados} />
    </div>
  );
};
