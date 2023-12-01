import React, { useEffect } from "react";
import "./MainScreen.css";
import Menu from "../../Components/Menu/Menu";
import { useNavigate } from "react-router-dom";
import Dashboard from "../../Components/Dashboard/Dashboard";
import VroomVolts from "../../Components/Vroomvolts/Vroomvolts";
import Users from "../../Components/Users/Users";
import Marathon from "../../Components/Marathon/Marathon";

export default function MainScreen({ setUserData, userData, path }) {
    const navigate = useNavigate();

    useEffect(() => {
        if (userData.isLoggedIn === false) {
            navigate("/login");
            return;
        }
    }, [navigate, userData.isLoggedIn, setUserData]);

    const handleLogout = (event) => {
        event.preventDefault();
        setTimeout(() => {
            localStorage.removeItem("isLogin");
            setUserData({
                username: "",
                userId: 0,
                isLoggedIn: false,
            });
            localStorage.removeItem("username");
            localStorage.removeItem("userId");
            localStorage.removeItem("isLoggedIn");
        }, 200);
    };

    if (!userData.isLoggedIn) {
        return null;
    }

    return (
        <div className="mainscreen-container">
            <Menu setUserData={setUserData} userData={userData} />
            <>
                {path === "/" ? (
                    <Dashboard userData={userData} />
                ) : path === "/vroomvolts" ? (
                    <VroomVolts userData={userData} />
                ) : path === "/users" ? (
                    <Users userData={userData} />
                ) : path === "/marathon" ? (
                    <Marathon userData={userData} />
                ) : (
                    <></>
                )}
            </>
        </div>
    );
}
