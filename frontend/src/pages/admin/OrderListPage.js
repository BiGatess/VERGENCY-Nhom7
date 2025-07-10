import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAllOrders, updateOrderAdmin } from '../../store/orderSlice'; 
import Spinner from '../../components/Spinner'; 
import './OrderListPage.css'; 

const OrderListPage = () => {
    const dispatch = useDispatch();
    const { orders, status, error } = useSelector((state) => state.orders); 

    useEffect(() => {
        dispatch(fetchAllOrders());
    }, [dispatch]);

    const statusChangeHandler = (orderId, newStatus) => {
        if (window.confirm('Bạn có chắc muốn thay đổi trạng thái đơn hàng này?')) {
            dispatch(updateOrderAdmin({ orderId, status: newStatus }));
        }
    };

    if (status === 'loading') {
        return <Spinner />;
    }

    if (status === 'failed') {
        return <div className="admin-error-message">Lỗi: {error}</div>;
    }

    return (
        <div className="order-list-container">
            <h1>Quản lý Đơn hàng ({orders.length})</h1>

            {orders.length === 0 ? (
                <p>Chưa có đơn hàng nào.</p>
            ) : (
                <table className="order-table">
                    <thead>
                        <tr>
                            <th>MÃ ĐH</th>
                            <th>KHÁCH HÀNG</th>
                            <th>NGÀY ĐẶT</th>
                            <th>TỔNG TIỀN</th>
                            <th>THANH TOÁN</th>
                            <th>GIAO HÀNG</th>
                            <th>TRẠNG THÁI</th>
                            <th>CHI TIẾT</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <td data-label="MÃ ĐH">{order._id.substring(20)}</td>
                                <td data-label="KHÁCH HÀNG">{order.shippingAddress?.fullName || 'N/A'}</td>
                                <td data-label="NGÀY ĐẶT">{new Date(order.createdAt).toLocaleDateString('vi-VN')}</td>
                                <td data-label="TỔNG TIỀN">{order.totalPrice.toLocaleString('vi-VN')}đ</td>
                                <td data-label="THANH TOÁN">
                                    {order.isPaid ? (
                                        <span className="status-paid">Đã thanh toán</span>
                                    ) : (
                                        <span className="status-unpaid">Chưa thanh toán</span>
                                    )}
                                </td>
                                <td data-label="GIAO HÀNG">
                                    {order.isDelivered ? (
                                        <span className="status-delivered">Đã giao</span>
                                    ) : (
                                        <span className="status-undelivered">Chưa giao</span>
                                    )}
                                </td>
                                <td data-label="TRẠNG THÁI">
                                    <select
                                        value={order.status}
                                        onChange={(e) => statusChangeHandler(order._id, e.target.value)}
                                        className={`status-select status-${order.status.toLowerCase().replace(/\s/g, '-')}`}
                                    >
                                        <option value="Chờ xác nhận">Chờ xác nhận</option>
                                        <option value="Đã xác nhận">Đã xác nhận</option>
                                        <option value="Đang giao hàng">Đang giao hàng</option>
                                        <option value="Đã giao">Đã giao</option>
                                        <option value="Đã hủy">Đã hủy</option>
                                    </select>
                                </td>
                                <td data-label="CHI TIẾT">
                                    <Link to={`/admin/orders/${order._id}`} className="btn-detail">
                                        Xem
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default OrderListPage;