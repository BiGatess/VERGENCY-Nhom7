import React from 'react';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
  return (
    <div className="dashboard-container">
      {/* <h1>Trang quản trị</h1>
      <p>Chào mừng đến với khu vực quản trị của Vergency.</p> */}
      
      <div className="dashboard-quick-links">
        <div className="quick-link-card">
          {/* <h2>Quản lý Sản phẩm</h2>
          <p>Thêm, sửa, xóa sản phẩm.</p> */}
          {/* <Link to="/admin/products/create" className="btn-dashboard">Tạo sản phẩm mới</Link>
          <Link to="/admin/products" className="btn-dashboard">Xem danh sách sản phẩm</Link> */}
        </div>

        <div className="quick-link-card">
          {/* <h2>Quản lý Đơn hàng</h2>
          <p>Xem và cập nhật trạng thái đơn hàng.</p>
          <Link to="/admin/orders" className="btn-dashboard">Xem danh sách đơn hàng</Link> */}
        </div>

        <div className="quick-link-card">
          {/* <h2>Quản lý Người dùng</h2>
          <p>Xem danh sách người dùng.</p>
          <Link to="/admin/users" className="btn-dashboard">Xem danh sách người dùng</Link> */}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;