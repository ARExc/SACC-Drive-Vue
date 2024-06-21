import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/index.css'
import './mock/mock.ts'
import Router from "@/router/Router.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router/>
  </React.StrictMode>,
)
