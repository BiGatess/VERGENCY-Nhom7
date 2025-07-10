import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import App from './App'; 

import HomePage from './pages/HomePage';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';
import AuthPage from './pages/AuthPage'; 
import CheckoutPage from './pages/CheckoutPage'; 

import PrivateRoute from './components/PrivateRoute'; 
import DashboardPage from './pages/admin/DashboardPage';
import OrderListPage from './pages/admin/OrderListPage';
import ProductCreatePage from './pages/admin/ProductCreatePage';


const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<App />}>
                
                <Route index element={<Navigate to="/home" replace />} />
                <Route path="home" element={<HomePage />} />
                <Route path="shop" element={<ProductListPage />} />
                <Route path="product/:productId" element={<ProductDetailPage />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="contact" element={<ContactPage />} />
                <Route path="blog" element={<BlogPage />} />

                <Route path="account" element={<AuthPage />} />


                <Route path="admin" element={<PrivateRoute adminOnly={true} />}>
                    <Route index element={<DashboardPage />} />
                    <Route path="orders" element={<OrderListPage />} />

                    <Route path="products/create" element={<ProductCreatePage />} />
                </Route>

            </Route>
        </Routes>
    );
};

export default AppRoutes;
