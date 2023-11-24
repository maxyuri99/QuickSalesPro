import axios from "axios"

// Configuração do Axios
export const apiQsp = axios.create({
    baseURL: "https://62.72.63.245:7389",
    timeout: 8 * 1000,
  })
  
