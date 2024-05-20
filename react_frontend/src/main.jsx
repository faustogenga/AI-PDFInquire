import React from 'react'
import ReactDOM from 'react-dom/client'
import HomePage from './views/HomePage'
import 'bootstrap/dist/css/bootstrap.min.css'
import "react-chat-elements/dist/main.css"
import './responsive/responsive.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  // Render the HomePage component
  <React.StrictMode>
    <HomePage/>
  </React.StrictMode>,
)
