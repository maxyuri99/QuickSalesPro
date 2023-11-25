import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { UserProvier } from './providers/UserContext.jsx'
import { SaleProvider } from './providers/SaleContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvier>
          <App />
      </UserProvier>
    </BrowserRouter>
  </React.StrictMode>,
)
