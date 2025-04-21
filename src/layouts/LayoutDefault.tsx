import { Outlet } from 'react-router-dom';
import HeaderComponent from '../components/HeaderComponent';
import FooterComponent from '../components/FooterComponent';

const LayoutDefault = () => (
    <>
        <HeaderComponent />
        <main><Outlet /></main>
        <FooterComponent />
    </>
);

export default LayoutDefault
