import { UserComp } from "@/components/UserList";
import { DefaultTemplate } from "../../components/DefaultTemplate";
import { useContext } from "react";
import { ControlUserContext } from "@/providers/ControlUserContext";

export const Usuarios = () => {
  const { loadingUsers } = useContext(ControlUserContext);
  return (
    <main>
      <DefaultTemplate>
        {loadingUsers && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="rounded-full w-12 h-12 border-t-4 border-blue-500 animate-spin"></div>
          </div>
        )}
        <UserComp />
      </DefaultTemplate>
    </main>
  );
};
