// import { useState } from "react";
import request from "./request";

const api = process.env.REACT_APP_SERVER_API;

export const getUser = () => {
    try {
        let user = localStorage.getItem('user');
        if (!user) {
            return null;
        }
        user = JSON.parse(user)
        return user;
    } catch (ex) {
        return ex;
    }
};
export const getUserById = (id) => {
    try {
        request.post(`${api}/user/${id}`).then(
            (res) => {
                if (res.data.success) {
                    return res.data.data;
                }
                return null;
            }
        )
    } catch (ex) {
        return ex;
    }
}
export const setUser = async (user) => {
    try {
        const response = await request.patch(`${api}/users/${user.id}`, user);
        console.log({response});

        if (response.status === 200) {
            localStorage.setItem("user", JSON.stringify(user));

            return response.data;
        } else {
            throw new Error("Failed to update user data");
        }
    } catch (error) {
        console.error("Error updating user:", error);
        throw new Error("Failed to update user data");
    }
};