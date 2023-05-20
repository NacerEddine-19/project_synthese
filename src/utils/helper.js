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
                return res;
                // if (res.data.success) {
                //     return res.data.data;
                // }
                // return null;
            }
        )
    }
    catch (ex) {
        return ex;
    }
}

