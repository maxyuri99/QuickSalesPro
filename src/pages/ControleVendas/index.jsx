import { useContext } from "react";
import { DefaultTemplate } from "../../components/DefaultTemplate";
import { SaleListComp } from "../../components/SaleList";
import { ControlSaleContext } from "../../providers/ControlSaleContext";
import { SaleEditModal } from "../../components/modal/SaleEditModal";

export const ControleVendas = () => {
  const { currentSale, loadingListSales } = useContext(ControlSaleContext);
  return (
    <>
      {currentSale ? <SaleEditModal /> : null}
      <DefaultTemplate>
        {loadingListSales && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="rounded-full w-12 h-12 border-t-4 border-blue-500 animate-spin"></div>
          </div>
        )}
        <SaleListComp />
      </DefaultTemplate>
    </>
  );
};
