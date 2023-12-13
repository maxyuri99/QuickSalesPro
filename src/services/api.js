import axios from "axios"

// Configuração do Axios
export const apiQsp = axios.create({
     baseURL: "https://www.ebtel.com.br:7389",
    //baseURL: "http://localhost:7389",
    timeout: 8 * 1000,
    withCredentials: true,
  })

  export const apiCEP = axios.create({
    baseURL: "https://brasilapi.com.br",
    timeout: 4 * 1000,
  })

  
