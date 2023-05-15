
const getUser = () => {
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

export default getUser;
