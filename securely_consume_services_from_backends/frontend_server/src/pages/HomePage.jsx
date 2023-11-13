import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from "@asgardeo/auth-react";
import CustomButton from '../components/CustomButton';
import CargoPage from './CargoPage';

export default function HomePage() {
  const { state } = useAuthContext();

  return (
    !state.isAuthenticated ?
      <GuestHomePage/>
      :
      <CargoPage />
  );
}

function GuestHomePage() {
    const {signIn} = useAuthContext();

    return <div style={{minHeight:"100vh", display:"flex", justifyContent:"center", alignItems:"center"}}>
          <CustomButton color="primary" onClick={() => signIn()} disabled={false} label={"Log In"} size={'large'}/>
      </div>
}
