// src/router/index.tsx
import { createBrowserRouter } from 'react-router-dom';
// import Home from '../pages/Home';
// import About from '../pages/About';
// import Login from '../pages/Login';
// import ProductDetail from '../pages/ProductDetail';
// import Cart from '../pages/Cart';
import LayoutDefault from '../layouts/LayoutDefault';
import LayoutNoHeaderFooter from '../layouts/LayoutNoHeaderFooter';
import CartPage from '../pages/CartPage/CartPage';
import LoginPage from '../pages/LoginPage/LoginPage';
import SignUpPage from '../pages/SignUpPage/SignUpPage';
import OrderPage from '../pages/OrderPage/OrderPage';
import OrderDetailPage from '../pages/OrderDetailPage/OrderDetailPage';
import AdminOrderPage from '../pages/AdminOrderPage/AdminOrderPage';
import CheckoutPage from '../pages/CheckoutPage/CheckoutPage';
import AdminProductPage from '../pages/AdminProductPage/AdminProductPage';
import AdminUserPage from '../pages/AdminUserPage/AdminUserPage';
import CustomerSupportPage from '../pages/CustomerSupportPage/CustomerSupportPage';
import AboutUsPage from '../pages/AboutUsPage/AboutUsPage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <LayoutDefault />,  // Layout có Header và Footer
        children: [
            { path: '', element: <CartPage /> }, // Trang giỏ hàng
            { path: 'orders', element: <AdminOrderPage /> }, // Trang quản lý đơn hàng của admin
            { path: 'order/:orderId', element: <OrderDetailPage /> }, // Trang chi tiết đơn hàng
            { path: 'checkout', element: <CheckoutPage /> }, // Trang thanh toán
            { path: 'admin/products', element: <AdminProductPage /> }, // Trang quản lý sản phẩm của admin
            { path: 'admin/users', element: <AdminUserPage /> }, // Trang quản lý người dùng của admin
            { path: 'customer-support', element: <CustomerSupportPage /> }, // Trang hỗ trợ khách hàng
            { path: 'about-us', element: <AboutUsPage /> }, // Trang giới thiệu
            { path: 'cart', element: <CartPage /> }, // Trang giỏ hàng
            { path: '*', element: <NotFoundPage /> }, // Trang 404
        ],
    },
    {
        path: '',
        element: <LayoutNoHeaderFooter />,  // Layout không có Header và Footer
        children: [
            { path: '/login', element: <LoginPage /> }, // Trang đăng nhập
            { path: '/sign-up', element: <SignUpPage /> },
        ],
    },
]);

export default router;
