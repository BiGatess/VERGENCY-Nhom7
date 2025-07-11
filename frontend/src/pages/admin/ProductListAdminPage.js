import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../../store/productSlice'; 
import Spinner from '../../components/Spinner';

const ProductListAdminPage = () => {
    const dispatch = useDispatch();
    const { products, status, error } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const handleDelete = (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
            console.log('Xóa sản phẩm với ID:', id);
            alert('Chức năng xóa đang được phát triển!');
        }
    };

    return (
        <div className="admin-list-container">
            <div className="admin-list-header">
                <h1>Quản lý Sản phẩm</h1>
                <Link to="/admin/products/create" className="btn-primary">
                    <i className="fas fa-plus"></i> Tạo Sản Phẩm Mới
                </Link>
            </div>

            {status === 'loading' && <Spinner />}
            {status === 'failed' && <div className="error-message">Lỗi: {error}</div>}
            
            {status === 'succeeded' && (
                <div className="table-responsive">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>ID SẢN PHẨM</th>
                                <th>TÊN SẢN PHẨM</th>
                                <th>GIÁ (VND)</th>
                                <th>DANH MỤC</th>
                                <th>TỒN KHO</th>
                                <th>HÀNH ĐỘNG</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.length > 0 ? (
                                products.map((product) => (
                                    <tr key={product._id}>
                                        <td>{product._id}</td>
                                        <td>{product.name}</td>
                                        <td>{product.price.toLocaleString('vi-VN')}</td>
                                        <td>{product.category?.name || 'Chưa phân loại'}</td>
                                        <td>{product.countInStock}</td>
                                        <td className="action-buttons">
                                            <Link to={`/admin/product/${product._id}/edit`} className="btn-sm btn-edit">
                                                <i className="fas fa-edit"></i> Sửa
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(product._id)}
                                                className="btn-sm btn-delete"
                                            >
                                                <i className="fas fa-trash"></i> Xóa
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center">Không có sản phẩm nào.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ProductListAdminPage;