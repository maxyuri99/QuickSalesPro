import { apiQsp } from "../services/api.js";
import { useState, useEffect } from "react";
import { createContext } from "react";
import { toast } from "react-toastify";

export const ControlUserContext = createContext({});

// eslint-disable-next-line react/prop-types
export const ControlUserProvider = ({ children }) => {
  const token = localStorage.getItem("@TOKENACESS");

  const [usersAll, setUsersAll] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);

  // ############## Busca todos os usuarios ##############
  const userGetAll = async () => {
    try {
      setLoadingUsers(true);
      const { data } = await apiQsp.get(`/v1/usuarios/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const sortedUsers = data.sort((a, b) => b.id_usuario - a.id_usuario);

      setUsersAll(sortedUsers);
    } catch (error) {
      const errorMessage = JSON.stringify(error.response?.data.erro);
      console.log(errorMessage);
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    userGetAll();
  }, []);
  // ############################################################

  // ############## Inserir usuário ##############
  const registerUser = async (bodyData) => {
    try {
      const { data } = await apiQsp.post(`/v1/usuarios/registro`, bodyData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Usuário registrado com sucesso!");
    } catch (error) {
      if ((error.response.status = 400)) {
        toast.error(error.response.data.erro);
      }
      const errorMessage = error.response?.data?.erro || "Erro desconhecido";
      console.error(`Erro ao registrar o usuário: ${errorMessage}`);
    }
  };
  // ############################################################

  const handleGetAll = () => {
    userGetAll();
  };

  const handleRegisterUser = async (data) => {
    if (data) {
      await registerUser(data);
    }
    handleGetAll();
  };

  return (
    <ControlUserContext.Provider
      value={{ usersAll, handleRegisterUser, loadingUsers, handleGetAll }}
    >
      {children}
    </ControlUserContext.Provider>
  );
};
