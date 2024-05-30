import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Page/Login';
import Detail from './Page/Detail.tsx';
import Summary from './Page/Summary';
import Home from './Page/Home.tsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detail/:productId" element ={<Detail/>}/>
        <Route path="/summary" element={<Summary />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
reportWebVitals();
