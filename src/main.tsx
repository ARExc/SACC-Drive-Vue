import React from 'react'
import ReactDOM from 'react-dom/client'
import './mock/mock.ts'
import Router from "@/router/Router.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router/>
  </React.StrictMode>,
)
