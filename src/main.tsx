import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './mock/mock.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App></App>
    </React.StrictMode>,
)
