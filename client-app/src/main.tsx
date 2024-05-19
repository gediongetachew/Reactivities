import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/layout/App'
import './app/layout/styles.css'
import 'semantic-ui-css/semantic.min.css'
import { storeContext, store } from './app/store/store'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <storeContext.Provider value={store}>
       <App />
    </storeContext.Provider> 
   
  </React.StrictMode>,
)
