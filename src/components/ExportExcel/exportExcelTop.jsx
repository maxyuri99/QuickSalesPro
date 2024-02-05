import * as XLSX from "xlsx";

export const exportToExcel = (dataExport) => {
  if (!dataExport || dataExport.length === 0) {
    return console.log("Nenhum item para ser exportado!");
  }

  const data = dataExport;

  const dataAtual = new Date();

  const ws = XLSX.utils.json_to_sheet(data);

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet 1");

  XLSX.writeFile(wb, `ebtel_lista_vendas_${dataAtual.toLocaleString()}.xlsx`);

  return console.log("Exportado com sucesso!");
};
