import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './providers/UserContext.jsx'
import axios from 'axios'

axios.interceptors.request.use((config) => {
  config.headers['Access-Control-Allow-Origin'] = '*'
  config.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS, PUT, DELETE'
  config.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
  return config
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename='/quicksalespro'>
      <UserProvider>
        <App />
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
