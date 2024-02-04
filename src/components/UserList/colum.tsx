"use client";

import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { ArrowUpDown, Pencil } from "lucide-react";
// import { DialogCloseButton } from "../modal/UserEditModal";

export type User = {
  id_usuario: number;
  nome: string;
  login: string;
  senha: string;
  email: string | null;
  cpf: string | null;
  cargo: number;
  dt_nascimento: string | null;
  telefone: string | null;
  endereco: string | null;
  numero_end: number | null;
  complemento_end: string | null;
  cep: string | null;
  bairro: string | null;
  cidade: string | null;
  situacao: string | null;
  dt_contratacao: string | null;
  supervisor: number | null;
  dt_alt: string | null;
  hr_alt: string | null;
  user_alt: number | null;
  uf: string | null;
  user_ger: number | null;
  dt_ger: string | null;
  nome_cargo: string;
};

export const columns: ColumnDef<User>[] = [
  // {
  //   id: "actions",
  //   cell: ({ row }) => {
  //     const sale = row.original;

  //     return DialogCloseButton(<Pencil className="w-4" />, sale);
  //   },
  // },
  {
    accessorKey: "id_usuario",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "nome",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nome
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "login",
    header: "Login",
    cell: ({ row }) => {
      const login: any = row.getValue("login");

      return (
        <div className="whitespace-nowrap overflow-hidden overflow-ellipsis max-w-[200px]">
          {login}
        </div>
      );
    },
  },
  {
    accessorKey: "telefone",
    header: "Telefone",
    cell: ({ row }) => {
      const Telefone: any = row.getValue("telefone");

      return (
        <div className="whitespace-nowrap overflow-hidden overflow-ellipsis max-w-[200px]">
          {Telefone}
        </div>
      );
    },
  },
  {
    accessorKey: "nome_cargo",
    header: "Cargo",
    cell: ({ row }) => {
      const nomeCargo: any = row.getValue("nome_cargo");

      return (
        <div className="whitespace-nowrap overflow-hidden overflow-ellipsis max-w-[200px]">
          {nomeCargo}
        </div>
      );
    },
  },
];
