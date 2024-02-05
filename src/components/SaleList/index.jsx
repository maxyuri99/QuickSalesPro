import { useContext } from "react";
import { ControlSaleContext } from "../../providers/ControlSaleContext";
import styles from "./style.module.scss";
import { Input } from "../forms/Input";
import { Select } from "../forms/Select";
import { Button } from "../ui/button";
import { DataTable } from "../ui/data-table";
import { columns } from "./colum";
import { Search } from "lucide-react";

export const SaleListComp = () => {
  const {
    selectEtapas,
    selectedEtapasFilter,
    setSelectedEtapasFilter,
    selectChange,
    errorVerify,
    setErrorVerify,

    nome,
    setNome,
    cpf_cnpj,
    setCpf_cpnj,
    dataInicial,
    setDataInicial,
    dataFinal,
    setDataFinal,

    handleFilterClick,
    saleListFilter,
    handleUpdateList,
    exportExcelFunc,
  } = useContext(ControlSaleContext);

  return (
    <div className={styles.saleListDiv}>
      <div>
        <h1 className="title grey0">Controle de Vendas</h1>
        <Button variant="secondary" onClick={handleUpdateList}>
          Atualizar Lista
        </Button>
      </div>
      <div className={styles.filterDivAll}>
        <div className={styles.filterDivItens}>
          <div>
            <Input
              type="text"
              label="Nome:"
              placeholder="Consulte por nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <Input
              type="number"
              label="CPF/CNPJ:"
              placeholder="CPF/CNPJ Apenas números"
              value={cpf_cnpj}
              onChange={(e) => setCpf_cpnj(e.target.value)}
            />
            <Select
              name="etapa"
              selectChange={selectChange}
              options={selectEtapas}
              id={selectedEtapasFilter}
              onChange={setSelectedEtapasFilter}
              placeholder="Todos"
              label="Etapa"
              errorVerify={errorVerify}
              setErrorVerify={setErrorVerify}
            />
          </div>
          <div>
            <span className="title grey2 small">Data Geração:</span>
            <Input
              type="date"
              label="Data inicial"
              value={dataInicial}
              onChange={(e) => setDataInicial(e.target.value)}
            />
            <Input
              type="date"
              label="Data final"
              value={dataFinal}
              onChange={(e) => setDataFinal(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.divButtons}>
          <Button variant="secondary" onClick={exportExcelFunc}>
            Exportar para Excel
          </Button>
          <Button variant="secondary" onClick={handleFilterClick}>
            <Search className="h-4 w-4 mr-3" />
            Filtrar
          </Button>
        </div>
      </div>
      <DataTable columns={columns} data={saleListFilter} />
    </div>
  );
};
