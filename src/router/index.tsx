// src/router/index.tsx
import { createBrowserRouter } from 'react-router-dom';
// import Home from '../pages/Home';
// import About from '../pages/About';
// import Login from '../pages/Login';
// import ProductDetail from '../pages/ProductDetail';
// import Cart from '../pages/Cart';
import LayoutDefault from '../layouts/LayoutDefault';
import HomePage from '../pages/HomePage/HomePage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <LayoutDefault />,  // Layout có Header và Footer
        children: [
            { path: '', element: <HomePage /> }, // Trang chủ
            //   { path: 'about', element: <About /> }, // Giới thiệu
            //   { path: 'product/:id', element: <ProductDetail /> }, // Chi tiết sản phẩm
            //   { path: 'cart', element: <Cart /> }, // Giỏ hàng
        ],
    },
    //   {
    //     path: '/login',
    //     element: <LayoutNoHeaderFooter />,  // Layout không có Header và Footer
    //     children: [
    //       { path: '', element: <Login /> }, // Trang đăng nhập
    //     ],
    //   },
]);

export default router;
