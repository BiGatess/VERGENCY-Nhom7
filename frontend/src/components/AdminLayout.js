import React from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/userSlice';
import './AdminLayout.css';

const menuItems = [
    { path: '/admin/dashboard', icon: 'fas fa-tachometer-alt', name: 'Dashboard' },
    { path: '/admin/products', icon: 'fas fa-shopping-cart', name: 'Sản Phẩm' },
    { path: '/admin/orders', icon: 'fas fa-chart-bar', name: 'Đơn Hàng' },
    { path: '/admin/customers', icon: 'fas fa-users', name: 'Khách Hàng' },
    { path: '/admin/reviews', icon: 'fas fa-comments', name: 'Đánh Giá' },
    { path: '/admin/categories', icon: 'fas fa-tags', name: 'Danh Mục' },
    { path: '/admin/discounts', icon: 'fas fa-percentage', name: 'Khuyến Mãi' },
    { path: '/admin/shipping', icon: 'fas fa-truck', name: 'Vận Chuyển' },
    { path: '/admin/settings', icon: 'fas fa-cog', name: 'Cài Đặt' },
];

const AdminLayout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const { userInfo } = useSelector((state) => state.user);

    const handleLogout = () => {
        if (window.confirm('Bạn có chắc chắn muốn đăng xuất?')) {
            dispatch(logout());
            navigate('/login');
        }
    };

    const currentPage = menuItems.find(item => location.pathname.startsWith(item.path));
    const pageTitle = currentPage ? currentPage.name : 'Dashboard';

    return (
        <div className="admin-layout">
            <aside className="admin-sidebar">
                <div className="sidebar-header">
                    <h1>Vergency Admin</h1>
                </div>
                <nav className="admin-nav">
                    <ul>
                        {menuItems.map((item) => (
                            <li key={item.name}>
                                <NavLink to={item.path} end={item.path === '/admin/dashboard'}>
                                    <i className={item.icon}></i>
                                    <span>{item.name}</span>
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>

            <div className="admin-main-content">
                <header className="admin-page-header">
                    <h2>{pageTitle}</h2>
                    <div className="user-info">
                        <span>
                            <i className="fas fa-user-circle"></i> 
                            {userInfo?.name || 'Admin'}
                        </span>
                        <button onClick={handleLogout} className="logout-button">
                            <i className="fas fa-sign-out-alt"></i>
                            <span>Đăng Xuất</span>
                        </button>
                    </div>
                </header>
                
                <main>
                    {/* Stats Cards */}
                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-card-header">
                                <div>
                                    <p className="stat-card-title">Tổng sản phẩm</p>
                                    <p className="stat-card-value"></p>
                                </div>
                                <div className="stat-card-icon blue">
                                    <i className="fas fa-shopping-cart"></i>
                                </div>
                            </div>
                            <div className="stat-card-footer">
                                <span className="stat-card-change"></span>
                                <span className="stat-card-label"></span>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-card-header">
                                <div>
                                    <p className="stat-card-title">Đơn hàng</p>
                                    <p className="stat-card-value"></p>
                                </div>
                                <div className="stat-card-icon green">
                                    <i className="fas fa-chart-bar"></i>
                                </div>
                            </div>
                            <div className="stat-card-footer">
                                <span className="stat-card-change"></span>
                                <span className="stat-card-label"></span>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-card-header">
                                <div>
                                    <p className="stat-card-title">Khách hàng</p>
                                    <p className="stat-card-value"></p>
                                </div>
                                <div className="stat-card-icon purple">
                                    <i className="fas fa-users"></i>
                                </div>
                            </div>
                            <div className="stat-card-footer">
                                <span className="stat-card-change"></span>
                                <span className="stat-card-label"></span>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-card-header">
                                <div>
                                    <p className="stat-card-title">Doanh thu</p>
                                    <p className="stat-card-value"></p>
                                </div>
                                <div className="stat-card-icon orange">
                                    <i className="fas fa-dollar-sign"></i>
                                </div>
                            </div>
                            <div className="stat-card-footer">
                                <span className="stat-card-change"></span>
                                <span className="stat-card-label"></span>
                            </div>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="content-card">
                        <div className="content-card-header">
                            <h3 className="content-card-title">Nội dung {pageTitle}</h3>
                            {/* <button className="btn-primary">
                                <i className="fas fa-plus"></i> Thêm mới
                            </button> */}
                        </div>
                        <div className="content-card-body">
                            <div className="empty-state-icon">
                                <i className="fas fa-shopping-cart"></i>
                            </div>
                            <h4 className="empty-state-title">Chào mừng đến với {pageTitle}</h4>
                            <p className="empty-state-description">
                                Đây là nơi bạn có thể quản lý tất cả {pageTitle.toLowerCase()} của cửa hàng
                            </p>
                        </div>
                    </div>
                    
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;