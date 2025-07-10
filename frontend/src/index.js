import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store.js';
import './index.css';

import App from './App';
import HomePage from './pages/HomePage'; 
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import AboutPage from './pages/AboutPage.js';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';
import BlogDetailPage from './pages/BlogDetailPage';
import AuthPage from './pages/AuthPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage'; 
import PrivateRoute from './components/PrivateRoute';

// Import các component cho trang Admin
import AdminRoute from './components/AdminRoute';
import AdminLayout from './components/AdminLayout';
import DashboardPage from './pages/admin/DashboardPage';
import OrderListPage from './pages/admin/OrderListPage';
import ProductCreatePage from './pages/admin/ProductCreatePage';
import ProductListAdminPage from './pages/admin/ProductListAdminPage'; 

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },           
      { path: 'home', element: <HomePage /> },          
      { path: 'shop', element: <ProductListPage /> }, 
      { path: 'shop/:category', element: <ProductListPage /> },
      { path: 'product/:productId', element: <ProductDetailPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'blog', element: <BlogPage /> },
      { path: 'blog/:id', element: <BlogDetailPage /> }, 
      { path: 'account', element: <AuthPage /> },
      { path: 'forgot-password', element: <ForgotPasswordPage /> },
      { path: 'cart', element: <CartPage /> },
      {
        path: '', 
        element: <PrivateRoute />, 
        children: [
          { path: 'checkout', element: <CheckoutPage /> },
        ]
      }
    ],
  },
  {
    path: '/admin',
    element: <AdminRoute />, 
    children: [
      {
        element: <AdminLayout />, 
        children: [
          { index: true, element: <DashboardPage /> }, 
          { path: 'orders', element: <OrderListPage /> },
          { path: 'products', element: <ProductListAdminPage /> }, 
          { path: 'products/create', element: <ProductCreatePage /> }, 
        ]
      }
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);