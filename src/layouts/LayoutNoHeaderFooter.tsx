import { Outlet } from "react-router-dom";

const LayoutNoHeaderFooter = () => (
    <>
        <main><Outlet /></main>
    </>
);

export default LayoutNoHeaderFooter;
