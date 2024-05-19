import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from "react-redux";
import store from './redux/store.js';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Warehouse from './components/Warehouse';
import Homepage from './components/Homepage'


ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
    <Routes>
          <Route path='/' element={<App />} />
          <Route path='/warehouse/:id' element={<Warehouse />} />
      </Routes>
    </BrowserRouter>
  </Provider>
  // </React.StrictMode>,
)
