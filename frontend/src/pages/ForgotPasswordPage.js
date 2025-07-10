import React from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope } from 'react-icons/fa';

const ForgotPasswordPage = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Nếu email tồn tại, một link phục hồi mật khẩu đã được gửi đến!');
    };

    return (
        <div className="form-container-standalone">
            <form onSubmit={handleSubmit} className="auth-form-standalone">
                <h1 className="page-title">Đặt lại mật khẩu</h1>
                <p className="form-subtitle">Nhập email của bạn để khôi phục lại mật khẩu.</p>
                <div className="form-group">
                    <label htmlFor="email"><FaEnvelope /></label>
                    <input type="email" id="email" placeholder="Email" required />
                </div>
                <button type="submit" className="btn-auth-full">Gửi</button>
                <Link to="/account" className="cancel-link">Hủy</Link>
            </form>
        </div>
    );
};

export default ForgotPasswordPage;