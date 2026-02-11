// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import './index.css'
import App from './App.tsx'
import React from 'react';
import { GoogleOAuthProvider } from "@react-oauth/google";
const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
console.log(googleClientId)

ReactDOM.createRoot(document.getElementById("root")!).render(
  
  <React.StrictMode>
    <BrowserRouter>
       <GoogleOAuthProvider clientId={googleClientId}>
    <App />
  </GoogleOAuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);