import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../store/userSlice';
import Spinner from '../../components/Spinner';
import './UserListPage.css';

const UserListPage = () => {
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState('');
    const [sortField, setSortField] = useState('createdAt');
    const [sortOrder, setSortOrder] = useState('desc');

    const { users, status, error } = useSelector((state) => state.user);
    const userList = users || [];

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);

    const filteredAndSortedUsers = userList
        .filter(user => 
            user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user._id?.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            let aValue = a[sortField];
            let bValue = b[sortField];
            
            if (sortField === 'createdAt') {
                aValue = new Date(aValue);
                bValue = new Date(bValue);
            }
            
            if (sortOrder === 'asc') {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        });

    const handleSort = (field) => {
        if (sortField === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortOrder('asc');
        }
    };

    const getSortIcon = (field) => {
        if (sortField !== field) return '↕️';
        return sortOrder === 'asc' ? '↑' : '↓';
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
    };

    const truncateId = (id) => {
        return id?.length > 10 ? `${id.substring(0, 10)}...` : id;
    };

    return (
        <div className="user-list-page-container">
            <div className="user-list-header">
                <div className="header-content">
                    <h2 className="page-title">Danh sách khách hàng</h2>
                    <div className="user-count-badge">
                        <span className="count-number">{filteredAndSortedUsers.length}</span>
                        <span className="count-label">khách hàng</span>
                    </div>
                </div>
                
                <div className="search-container">
                    <div className="search-input-wrapper">
                        <input
                            type="text"
                            placeholder="Tìm kiếm theo tên, email hoặc ID..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input"
                        />
                        <span className="search-icon">🔍</span>
                    </div>
                </div>
            </div>

            {status === 'loading' && (
                <div className="user-list-spinner-container">
                    <Spinner />
                </div>
            )}

            {error && (
                <div className="user-list-error-message">
                    <span className="error-icon">⚠️</span>
                    <span>{error}</span>
                </div>
            )}

            {status !== 'loading' && (
                <div className="user-list-table-wrapper">
                    <div className="table-container">
                        <table className="user-list-table">
                            <thead>
                                <tr>
                                    <th 
                                        className="sortable-header"
                                        onClick={() => handleSort('_id')}
                                    >
                                        ID Người dùng
                                        <span className="sort-indicator">{getSortIcon('_id')}</span>
                                    </th>
                                    <th 
                                        className="sortable-header"
                                        onClick={() => handleSort('name')}
                                    >
                                        Tên khách hàng
                                        <span className="sort-indicator">{getSortIcon('name')}</span>
                                    </th>
                                    <th 
                                        className="sortable-header"
                                        onClick={() => handleSort('email')}
                                    >
                                        Email
                                        <span className="sort-indicator">{getSortIcon('email')}</span>
                                    </th>
                                    <th 
                                        className="sortable-header"
                                        onClick={() => handleSort('createdAt')}
                                    >
                                        Ngày tham gia
                                        <span className="sort-indicator">{getSortIcon('createdAt')}</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredAndSortedUsers.length > 0 ? (
                                    filteredAndSortedUsers.map((user, index) => (
                                        <tr key={user._id} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                                            <td className="user-id-cell">
                                                <span className="id-text" title={user._id}>
                                                    {truncateId(user._id)}
                                                </span>
                                            </td>
                                            <td className="user-name-cell">
                                                <div className="name-wrapper">
                                                    <span className="user-avatar">👤</span>
                                                    <span className="user-name">{user.name}</span>
                                                </div>
                                            </td>
                                            <td className="user-email-cell">
                                                <a href={`mailto:${user.email}`} className="email-link">
                                                    {user.email}
                                                </a>
                                            </td>
                                            <td className="user-date-cell">
                                                <span className="date-text">
                                                    {formatDate(user.createdAt)}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="user-list-empty-message">
                                            <div className="empty-state">
                                                <span className="empty-icon">📭</span>
                                                <p className="empty-text">
                                                    {searchTerm ? 'Không tìm thấy khách hàng nào phù hợp' : 'Không có khách hàng nào để hiển thị'}
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserListPage;