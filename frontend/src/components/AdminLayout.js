import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import './AdminLayout.css'; 

const AdminLayout = () => {
    return (
        <div className="admin-layout">
            <aside className="admin-sidebar">
                <nav>
                    <h2>Admin Panel</h2>
                    <ul>
                        <li>
                            <NavLink to="/admin" end>Dashboard</NavLink>
                        </li>
                         <li>
                            <NavLink to="/admin/products/create">Tạo Sản phẩm</NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin/orders">Quản lý Đơn hàng</NavLink>
                        </li>
                    </ul>
                </nav>
            </aside>
            <main className="admin-content">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;