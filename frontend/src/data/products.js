const products = [
  {
    _id: '1',
    name: 'Sune Slickster T-Shirt/Black',
    image: '/images/sune-slickster.jpg',
    description: 'Áo thun Sune Slickster với chất liệu cotton 100% thoáng mát, form áo oversize phù hợp cho cả nam và nữ. Họa tiết in nổi bật, bền màu sau nhiều lần giặt.',
    price: 69000,
    originalPrice: 140000,
    countInStock: 15, // Số lượng tồn kho
    rating: 4.5,
    numReviews: 12,
  },
  {
     _id: '2',
    name: 'Shizu Donna T-Shirt/Black',
    image: '/images/shizu-donna.jpg',
    images: [
        '/images/shizu-donna.jpg',
        '/images/shizu-donna-back.jpg', 
        '/images/shizu-donna-detail1.jpg',
        '/images/shizu-donna-detail2.jpg'
    ],
    description: 'Thiết kế độc đáo lấy cảm hứng từ nhân vật anime Shizu Donna. Vải cotton 2 chiều, dày dặn, không xù lông. Một item không thể thiếu cho các tín đồ manga/anime.',
    price: 69000,
    originalPrice: 140000,
    countInStock: 7,
    rating: 5,
    numReviews: 8,
    sizes: ['M', 'L', 'XL'], 
    sku: 'SHII-3'
},
  {
    _id: '3',
    name: 'Nob Don T-Shirt/Black',
    image: '/images/nob-don.jpg',
    description: 'Phong cách tối giản nhưng không kém phần cá tính. Áo Nob Don T-Shirt dễ dàng phối với nhiều loại trang phục khác nhau. Chất vải co giãn, thấm hút mồ hôi tốt.',
    price: 69000,
    originalPrice: 140000,
    countInStock: 0, 
    rating: 4,
    numReviews: 15,
  },
];

export default products;