import React from 'react';
import { BrowserRouter, Route, Routes, Router } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import CargoPage from '../pages/CargoPage';
import CreateCargoPage from '../pages/CreateCargoPage';

export default function CustomRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<HomePage />} />
                <Route path="/cargos" element={<CargoPage />} />
                <Route path="/create-cargo" element={<CreateCargoPage />} />
            </Routes>
        </BrowserRouter>
    );
}