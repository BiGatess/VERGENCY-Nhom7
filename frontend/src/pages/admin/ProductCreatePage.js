import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, resetCreateStatus } from '../../store/productSlice';
import categoryApi from '../../services/categoryApi';
import Spinner from '../../components/Spinner';
import { FaUpload } from 'react-icons/fa';

const ProductCreatePage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { createStatus, error } = useSelector((state) => state.products);

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [priceBeforeDiscount, setPriceBeforeDiscount] = useState(0);
    const [sku, setSku] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [sizes, setSizes] = useState(''); 
    const [description, setDescription] = useState('');
    
    const [images, setImages] = useState([]); 
    const [imagePreviews, setImagePreviews] = useState([]); 
    
    const [categories, setCategories] = useState([]); 
    const [loadingCategories, setLoadingCategories] = useState(true);

    useEffect(() => {
        const fetchCategoriesData = async () => {
            try {
                const fetchedCategories = await categoryApi.getAllCategories();
                if (Array.isArray(fetchedCategories)) {
                    setCategories(fetchedCategories);
                    if (fetchedCategories.length > 0) {
                        setCategory(fetchedCategories[0]._id); 
                    }
                }
            } catch (error) {
                console.error("Không thể tải danh mục:", error);
            } finally {
                setLoadingCategories(false);
            }
        };
        fetchCategoriesData();
    }, []);

    useEffect(() => {
        if (createStatus === 'succeeded') {
            alert('Tạo sản phẩm thành công!');
            dispatch(resetCreateStatus());
            navigate('/admin/products'); 
        }
        if (createStatus === 'failed') {
            alert(`Tạo sản phẩm thất bại: ${error}`);
            dispatch(resetCreateStatus());
        }
    }, [createStatus, error, navigate, dispatch]);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        setImages(prevFiles => [...prevFiles, ...files]);

        const newPreviews = files.map(file => URL.createObjectURL(file));
        setImagePreviews(prevPreviews => [...prevPreviews, ...newPreviews]);
    };
    
    const handleRemoveImage = (indexToRemove) => {
        setImages(prevImages => prevImages.filter((_, index) => index !== indexToRemove));

        const urlToRemove = imagePreviews[indexToRemove];
        setImagePreviews(prevPreviews => prevPreviews.filter((_, index) => index !== indexToRemove));
        
        URL.revokeObjectURL(urlToRemove);
    };
    
    const submitHandler = (e) => {
        e.preventDefault();
        
        if (images.length === 0) {
            alert('Vui lòng upload ít nhất một hình ảnh cho sản phẩm.');
            return;
        }

        const productData = {
            name,
            price: Number(price),
            priceBeforeDiscount: Number(priceBeforeDiscount),
            sku,
            category,
            countInStock: Number(countInStock),
            sizes: String(sizes || '').split(',').map(s => s.trim()).filter(s => s !== ''),
            description,
            images, 
        };
        
        dispatch(createProduct(productData));
    };
    
    if (loadingCategories) {
        return <Spinner />;
    }

    return (
        <div className="admin-create-product-container">
            <div className="admin-form-card">
                <h1 className="form-title">Tạo Sản Phẩm Mới</h1>
                <form onSubmit={submitHandler}>
                    <div className="form-row"><div className="form-group-half"><label>Tên Sản Phẩm</label><input type="text" placeholder="Nhập tên sản phẩm" value={name} onChange={(e) => setName(e.target.value)} required /></div><div className="form-group-half"><label>SKU (Mã Sản Phẩm)</label><input type="text" placeholder="Nhập mã SKU" value={sku} onChange={(e) => setSku(e.target.value)} required /></div></div>
                    <div className="form-row"><div className="form-group-half"><label>Giá Bán (VND)</label><input type="number" min="0" value={price} onChange={(e) => setPrice(e.target.value)} required /></div><div className="form-group-half"><label>Giá Gốc (Nếu có)</label><input type="number" min="0" value={priceBeforeDiscount} onChange={(e) => setPriceBeforeDiscount(e.target.value)} /></div></div>
                    <div className="form-group-full"><label>Số Lượng Tồn Kho</label><input type="number" min="0" value={countInStock} onChange={(e) => setCountInStock(e.target.value)} required /></div>
                    <div className="form-group-full"><label>Danh mục</label><select value={category} onChange={(e) => setCategory(e.target.value)} required><option value="" disabled>-- Chọn danh mục --</option>{categories && categories.map(cat => (<option key={cat._id} value={cat._id}>{cat.name}</option>))}</select></div>
                    <div className="form-group-full"><label>Kích cỡ (Các size cách nhau bởi dấu phẩy)</label><input type="text" placeholder="Ví dụ: S,M,L,XL" value={sizes} onChange={(e) => setSizes(e.target.value.toUpperCase())} /></div>

                    <div className="form-group-full">
                        <label>Hình Ảnh Sản Phẩm</label>
                        <label htmlFor="image-upload" className="upload-label">
                            <FaUpload /> Chọn ảnh để tải lên
                        </label>
                        <input 
                            id="image-upload"
                            type="file" 
                            onChange={handleImageChange} 
                            multiple 
                            hidden
                            accept="image/png, image/jpeg, image/jpg, image/webp" 
                        />
                        <div className="image-preview-container">
                            {imagePreviews.map((imgSrc, index) => (
                                <div key={index} className="image-preview-item">
                                    <img 
                                        src={imgSrc} 
                                        alt={`Xem trước ${index + 1}`} 
                                    />
                                    <button 
                                        type="button" 
                                        className="remove-image-btn" 
                                        onClick={() => handleRemoveImage(index)}
                                    >
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="form-group-full"><label>Mô Tả Sản Phẩm</label><textarea placeholder="Nhập mô tả sản phẩm" value={description} onChange={(e) => setDescription(e.target.value)} rows="5" required></textarea></div>
                    <button type="submit" className="submit-btn" disabled={createStatus === 'loading'}>{createStatus === 'loading' ? 'Đang tạo...' : 'Tạo Sản Phẩm'}</button>
                </form>
            </div>
        </div>
    );
};

export default ProductCreatePage;