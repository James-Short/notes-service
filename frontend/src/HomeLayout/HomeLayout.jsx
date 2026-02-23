import { Outlet } from "react-router-dom"
import './HomeLayout.css'
import SideBar from "../components/SideBar/SideBar.jsx";
import SignOutButton from "../components/SignOutButton/SignOutButton.jsx";
import { useEffect } from "react";
import axios from "axios";

function HomeLayout(){
    useEffect(() => {
        axios.get('http://localhost:8080/users/getUserHomepage', {withCredentials: true})
        .then((res) => {alert(res.data)})
        .catch((err) => {alert(err)})
        
    }, [])

    return(
    <div className="home-layout">
        <SideBar></SideBar>
        <Outlet></Outlet>
        <SignOutButton/>
    </div>
    );
}

export default HomeLayout;