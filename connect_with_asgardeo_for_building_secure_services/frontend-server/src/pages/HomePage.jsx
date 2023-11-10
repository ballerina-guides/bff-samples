/**
 * Copyright (c) 2023, WSO2 LLC (http://www.wso2.com) All Rights Reserved.
 *
 * WSO2 LLC licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React from 'react';
import { useAuthContext } from "@asgardeo/auth-react";
import CustomButton from '../components/CustomButton';
import OrderPage from './OrderPage';

export default function HomePage() {
  const { state } = useAuthContext();

  return (
    !state.isAuthenticated ?
      <GuestHomePage/>
      :
      <OrderPage />
  );
}

function GuestHomePage() {
    const {signIn} = useAuthContext();

    return <div style={{minHeight:"100vh", display:"flex", justifyContent:"center", alignItems:"center"}}>
          <CustomButton color="primary" onClick={() => signIn()} disabled={false} label={"Log In"} size={'large'}/>
      </div>
}
