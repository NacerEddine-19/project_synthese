import React from "react";
import { Route, Redirect } from "react-router-dom";
import Home from "./components/Home";
import AdminDashboard from "./components/AdminDashboard";

const Routes = () => {
    const isAuthenticated = localStorage.getItem("token"); // Check if the user is authenticated

    const userRole = localStorage.getItem("role"); // Get the user's role

    // Protected route for users with the 'admin' and 'user' roles
    const AdminUserRoute = ({ component: Component, ...rest }) => (
        <Route
            {...rest}
            render={(props) =>
                isAuthenticated && (userRole === "admin" || userRole === "user") ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    );

    // Protected route for users with the 'superAdmin' role
    const SuperAdminRoute = ({ component: Component, ...rest }) => (
        <Route
            {...rest}
            render={(props) =>
                isAuthenticated && userRole === "superAdmin" ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    );

    return (
        <>
            <Route exact path="/login" component={Login} />
            <AdminUserRoute exact path="/home" component={Home} />
            <SuperAdminRoute exact path="/adminDash" component={AdminDashboard} />
        </>
    );
};

export default Routes;
