"use client";

import React from "react";
import { ControlSaleContext } from "@/providers/ControlSaleContext";
import { ColumnDef } from "@tanstack/react-table";
import { useContext } from "react";
import { Button } from "../ui/button";
import { ArrowUpDown, Pencil } from "lucide-react";

export type Sales = {
  agencia: string;
  bairro: string;
  banco: string;
  cep: string;
  cidade: string;
  cnpj: string;
  complemento_end: string;
  conta: string;
  cpf: string;
  cpf_socio: string;
  dia_venc: number;
  dt_alt: Date | null;
  dt_cancelamento: Date | null;
  dt_ger: Date;
  dt_instalacao: Date | null;
  dt_nascimento: string;
  email: string;
  endereco: string;
  form_pag: string;
  id_cliente: number;
  id_etapa: number;
  id_formpag: number;
  id_produto: number;
  id_usuario: number;
  id_venda: number;
  nome_cliente: string;
  nome_etapa: string;
  nome_mae: string;
  nome_produto: string;
  nome_usuario: string;
  numero_end: string;
  observacao: string;
  ord_vendas: string;
  periodo: null;
  telefone_1: string;
  uf: string;
  user_alt: string | null;
  user_ger: number;
};

export const columns: ColumnDef<Sales>[] = [
  {
    id: "actions",
    cell: ({ row }) => {
      const { setCurrentSale, getRegisterID } = useContext<any>(ControlSaleContext);
      const sale = row.original;

      const saleIten = (iten: any) => {
        setCurrentSale(iten);
        getRegisterID(iten.id_venda);
      };

      return (
        <Button onClick={() => saleIten(sale)}>
          <Pencil className="w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "id_venda",
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
    accessorKey: "cpf",
    header: "CPF/CNPJ",
    cell: ({ row }) => {
      const cpf = row.original.cpf;
      const cnpj = row.original.cnpj;

      const cpfCnpj = cpf ? cpf : cnpj;

      return <div>{cpfCnpj}</div>;
    },
  },
  {
    accessorKey: "nome_cliente",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Cliente
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const nomeCliente : any = row.getValue("nome_cliente");

      return (
        <div className="whitespace-nowrap overflow-hidden overflow-ellipsis max-w-[200px]">
          {nomeCliente}
        </div>
      );
    },
  },
  {
    accessorKey: "nome_usuario",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Consultor
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const nomeConsumidor : any = row.getValue("nome_usuario");

      return (
        <div className="whitespace-nowrap overflow-hidden overflow-ellipsis max-w-[200px]">
          {nomeConsumidor}
        </div>
      );
    },
  },
  {
    accessorKey: "nome_etapa",
    header: "Etapa",
    cell: ({ row }) => {
      const nomeEtapa  : any = row.getValue("nome_etapa");

      return (
        <div className="whitespace-nowrap overflow-hidden overflow-ellipsis max-w-[200px]">
          {nomeEtapa}
        </div>
      );
    },
  },
  {
    accessorKey: "nome_produto",
    header: "Plano",
    cell: ({ row }) => {
      const nomeProduto  : any = row.getValue("nome_produto");

      return (
        <div className="whitespace-nowrap overflow-hidden overflow-ellipsis max-w-[200px]">
          {nomeProduto}
        </div>
      );
    },
  },
  {
    accessorKey: "dt_ger",
    header: "Data Geração",
    cell: ({ row }) => {
      const dt_ger  : any = row.getValue("dt_ger");

      // Verifica se a data existe antes de formatá-la
      if (dt_ger) {
        const formattedDate = new Date(dt_ger).toLocaleDateString("pt-BR");
        return <div>{formattedDate}</div>;
      }

      return <div>N/A</div>; // Ou qualquer outra mensagem de fallback que desejar
    },
  },
];
