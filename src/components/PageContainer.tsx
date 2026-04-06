import { Outlet } from "react-router-dom";

export default function PageContainer() {
    return (
        <div className="arrangement-bilateral page-container">
            <Outlet />
        </div>
    )
}