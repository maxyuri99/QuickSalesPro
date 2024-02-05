import { useContext } from "react";
import { DefaultTemplate } from "../../components/DefaultTemplate";
import { ControlSaleContext } from "../../providers/ControlSaleContext";
import { SaleListUserComp } from "../../components/SaleListUser";

export const VendasPorUsuario = () => {
  const { loadingListUserID } = useContext(ControlSaleContext);
  return (
    <>
      <DefaultTemplate>
        {loadingListUserID && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="rounded-full w-12 h-12 border-t-4 border-blue-500 animate-spin"></div>
          </div>
        )}
        <SaleListUserComp />
      </DefaultTemplate>
    </>
  );
};
