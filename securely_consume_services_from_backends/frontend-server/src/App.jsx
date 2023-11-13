import './App.css';
import React from 'react';
import { AuthProvider } from "@asgardeo/auth-react";
import CustomRouter from './routes';

function App() {
  const asgardioConfig = {
    signInRedirectURL: "http://localhost:3000",
    signOutRedirectURL: "http://localhost:3000",
    clientID: "s0PYeIeVCb1fVPPVMfBLMde7tNka",
    baseUrl: "https://api.asgardeo.io/t/orgsd",
    scope: ["openid", "email", "profile", "order_insert", "order_read", "cargo_insert", "cargo_read"]
  };

  return (
    <AuthProvider config={asgardioConfig}>
      <CustomRouter />
    </AuthProvider>
  );
}

export default App;
