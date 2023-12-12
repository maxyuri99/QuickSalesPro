import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './providers/UserContext.jsx'
import axios from 'axios'
import { SaleProvider } from "../src/providers/SaleContext.jsx"

axios.interceptors.request.use((config) => {
  config.headers['Access-Control-Allow-Origin'] = '*'
  config.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS, PUT, DELETE'
  config.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
  return config
})

const rootElement = document.getElementById('root')

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <SaleProvider>
          <App />
        </SaleProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
