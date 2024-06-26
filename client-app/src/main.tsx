import React from 'react'
import ReactDOM from 'react-dom/client'
import './app/layout/styles.css'
import 'semantic-ui-css/semantic.min.css'
import 'react-calendar/dist/Calendar.css'
import 'react-toastify/dist/ReactToastify.min.css';
import 'react-datepicker/dist/react-datepicker.css'
import { storeContext, store } from './app/store/store'
import { RouterProvider } from 'react-router-dom'
import { router } from './app/routes/router'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <storeContext.Provider value={store}>
     <RouterProvider  router={router}/>
    </storeContext.Provider> 
   
  </React.StrictMode>,
)
