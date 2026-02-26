import { Outlet, useNavigate } from "react-router-dom"
import './HomeLayout.css'
import SideBar from "../components/SideBar/SideBar.jsx";
import SignOutButton from "../components/SignOutButton/SignOutButton.jsx";
import { useEffect, useState } from "react";
import axios from "axios";

function HomeLayout(){
    const navigate = useNavigate();
    const[refreshSidebarCount, setRefreshSidebarCount] = useState(0);

    function refreshSidebar(){
        setRefreshSidebarCount(refreshSidebarCount + 1);
    }

    useEffect(() => {
        axios.get('http://localhost:8080/users/verifyCookie', {withCredentials: true})
        .catch((err) => {
            alert(err);
            navigate("/login");
        })
    }, [])

    return(
    <div className="home-layout">
        <SideBar key={refreshSidebarCount}></SideBar>
        <Outlet context={ {refreshSidebar} }></Outlet>
        <SignOutButton/>
    </div>
    );
}

export default HomeLayout;