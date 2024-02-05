import { useContext } from "react";
import { ControlSaleContext } from "../../providers/ControlSaleContext";
import styles from "./style.module.scss";
import { columns } from "./colum";
import { DataTable } from "../ui/data-table";

export const SaleListUserComp = () => {
  const { handleUpdateListUserID, saleListUserIDFilter } =
    useContext(ControlSaleContext);

  const clickButtonAtualizar = () => {
    handleUpdateListUserID();
  };

  const coutItens = saleListUserIDFilter.length;

  return (
    <div className={styles.saleListDiv}>
      <div>
        <h1 className="title grey0">Minhas Vendas</h1>
        <button
          onClick={clickButtonAtualizar}
          className="btn solid primary small"
        >
          Atualizar Lista
        </button>
      </div>
      <div className={styles.filterDivAll}>
        <h1 className="paragraph big grey0">
          Total de Vendas: {saleListUserIDFilter ? coutItens : 0}
        </h1>
      </div>
      <DataTable columns={columns} data={saleListUserIDFilter} />
    </div>
  );
};
