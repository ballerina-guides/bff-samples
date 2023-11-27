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
import { BrowserRouter, Route, Routes, Router } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import CreateOrderPage from '../pages/CreateOrderPage';
import CargoPage from '../pages/CargoPage';
import CreateCargoPage from '../pages/CreateCargoPage';
import OrderPage from '../pages/OrderPage';

export default function CustomRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<HomePage />} />
                <Route path="/orders" element={<OrderPage />} />
                <Route path="/create-order" element={<CreateOrderPage />} />
                <Route path="/cargos" element={<CargoPage />} />
                <Route path="/create-cargo" element={<CreateCargoPage />} />
            </Routes>
        </BrowserRouter>
    );
}