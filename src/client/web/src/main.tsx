// Point d’entrée React : monte l’application dans #root avec le router.
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* TODO API: greffer ici les providers (QueryClient, AuthProvider) qui chargeront les données utilisateur globales. */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
