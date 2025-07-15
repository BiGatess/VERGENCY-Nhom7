import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { useDispatch, useSelector } from 'react-redux';
import { FaGoogle, FaFacebookF } from 'react-icons/fa';
import { loginUser, registerUser, clearUserState } from '../store/userSlice';
import Spinner from '../components/Spinner';

const AuthPage = () => {
    const [isSignUpActive, setIsSignUpActive] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { userInfo, status, error } = useSelector((state) => state.user);

    useEffect(() => {
        if (userInfo) {
            if (userInfo.isAdmin) {
                navigate('/admin/dashboard', { replace: true }); 
            } else {
                navigate('/', { replace: true });
            }
        }
    }, [navigate, userInfo]); 
    
    const resetFormAndErrors = () => {
        setName('');
        setEmail('');
        setPassword('');
        if (status === 'failed') {
            dispatch(clearUserState());
        }
    };
    
    const handleSwitchToSignUp = () => {
        resetFormAndErrors();
        setIsSignUpActive(true);
    };

    const handleSwitchToSignIn = () => {
        resetFormAndErrors();
        setIsSignUpActive(false);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        if (isSignUpActive) {
            dispatch(registerUser({ name, email, password }));
        } else {
            dispatch(loginUser({ email, password }));
        }
    };

    const SocialLoginButtons = () => (
        <div className="social-login">
            <div className="social-buttons-container">
            </div>
        </div>
    );

    return (
        <div className="auth-body">
            <div className={`auth-container-pro ${isSignUpActive ? 'right-panel-active' : ''}`}>
                
                <div className="form-container sign-up-container">
                    <form onSubmit={submitHandler}>
                        <h1>Tạo tài khoản</h1>
                        <input type="text" placeholder="Tên" value={name} onChange={(e) => setName(e.target.value)} required={isSignUpActive} />
                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <input type="password" placeholder="Mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <button type="submit" className="btn-auth-pro" disabled={status === 'loading'}>
                            {status === 'loading' && isSignUpActive ? 'Đang xử lý...' : 'Đăng ký'}
                        </button>
                        {status === 'failed' && isSignUpActive && <div style={{ color: 'red', marginTop: '10px', fontSize: '14px'}}>{error}</div>}
                        <SocialLoginButtons />
                    </form>
                </div>

                <div className="form-container sign-in-container">
                    <form onSubmit={submitHandler}>
                        <h1>Đăng nhập</h1>
                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <input type="password" placeholder="Mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <Link to="/forgot-password" style={{ textDecoration: 'none' }}>
                        <span style={{ color: '#007bff', fontWeight: 'bold' , fontSize: '14px' }}>Quên mật khẩu? </span>
                        </Link>
                        <button type="submit" className="btn-auth-pro" disabled={status === 'loading'}>
                            {status === 'loading' && !isSignUpActive ? 'Đang xử lý...' : 'Đăng nhập'}
                        </button>
                        {status === 'failed' && !isSignUpActive && <div style={{ color: 'red', marginTop: '10px', fontSize: '14px' }}>{error}</div>}
                        <SocialLoginButtons />
                    </form>
                </div>

                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Chào mừng trở lại!</h1>
                            <p>Để giữ kết nối với chúng tôi, vui lòng đăng nhập bằng thông tin cá nhân của bạn</p>
                            <button className="btn-auth-pro ghost" onClick={handleSwitchToSignIn}>Đăng nhập</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Xin chào, bạn mới!</h1>
                            <p>Nhập thông tin cá nhân của bạn và bắt đầu hành trình với chúng tôi</p>
                            <button className="btn-auth-pro ghost" onClick={handleSwitchToSignUp}>Đăng ký</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AuthPage;