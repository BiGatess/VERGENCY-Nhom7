import React, { useState } from 'react';
import { Eye, EyeOff, Key } from 'lucide-react';
import './ChangePasswordPage.css';

const ChangePasswordPage = () => {
    const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
    const [newPasswordVisible, setNewPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    
    const [formData, setFormData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validation
        if (formData.newPassword !== formData.confirmPassword) {
            alert('Mật khẩu mới và xác nhận mật khẩu không khớp!');
            return;
        }
        
        if (formData.newPassword.length < 6) {
            alert('Mật khẩu mới phải có ít nhất 6 ký tự!');
            return;
        }
        
        console.log('Form submitted:', formData);
        alert('Đổi mật khẩu thành công!');
    };

    const togglePasswordVisibility = (field) => {
        switch(field) {
            case 'old':
                setOldPasswordVisible(!oldPasswordVisible);
                break;
            case 'new':
                setNewPasswordVisible(!newPasswordVisible);
                break;
            case 'confirm':
                setConfirmPasswordVisible(!confirmPasswordVisible);
                break;
        }
    };

    return (
        <div className="change-password-container">
            <div className="change-password-wrapper">
                {/* Header */}
                <div className="change-password-header">
                    <div className="icon-wrapper">
                        <Key size={32} />
                    </div>
                    <h2>Đổi mật khẩu</h2>
                    <p>Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác</p>
                </div>

                {/* Form */}
                <div className="change-password-form">
                    <form onSubmit={handleSubmit}>
                        {/* Old Password */}
                        <div className="form-group">
                            <label>Mật khẩu cũ</label>
                            <div className="input-wrapper">
                                <input
                                    type={oldPasswordVisible ? 'text' : 'password'}
                                    name="oldPassword"
                                    value={formData.oldPassword}
                                    onChange={handleInputChange}
                                    placeholder="Nhập mật khẩu cũ"
                                    required
                                />
                                <button
                                    type="button"
                                    className="toggle-password"
                                    onClick={() => togglePasswordVisibility('old')}
                                >
                                    {oldPasswordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        {/* New Password */}
                        <div className="form-group">
                            <label>Mật khẩu mới</label>
                            <div className="input-wrapper">
                                <input
                                    type={newPasswordVisible ? 'text' : 'password'}
                                    name="newPassword"
                                    value={formData.newPassword}
                                    onChange={handleInputChange}
                                    placeholder="Nhập mật khẩu mới"
                                    required
                                />
                                <button
                                    type="button"
                                    className="toggle-password"
                                    onClick={() => togglePasswordVisibility('new')}
                                >
                                    {newPasswordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div className="form-group">
                            <label>Xác nhận mật khẩu mới</label>
                            <div className="input-wrapper">
                                <input
                                    type={confirmPasswordVisible ? 'text' : 'password'}
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    placeholder="Nhập lại mật khẩu mới"
                                    required
                                />
                                <button
                                    type="button"
                                    className="toggle-password"
                                    onClick={() => togglePasswordVisibility('confirm')}
                                >
                                    {confirmPasswordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="form-actions">
                            <button type="submit" className="btn-submit">
                                ĐỔI MẬT KHẨU
                            </button>
                        </div>
                    </form>
                </div>

                {/* Security Tips */}
                <div className="security-tips">
                    <h3>Lời khuyên bảo mật:</h3>
                    <ul>
                        <li>• Sử dụng mật khẩu mạnh với ít nhất 8 ký tự</li>
                        <li>• Kết hợp chữ hoa, chữ thường, số và ký tự đặc biệt</li>
                        <li>• Không sử dụng thông tin cá nhân dễ đoán</li>
                        <li>• Thay đổi mật khẩu định kỳ</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ChangePasswordPage;