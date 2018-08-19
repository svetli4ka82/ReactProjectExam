import requester from '../api/requester';

let auth=()=> {

    // user/login
    function login(username,  password) {
        let userData = {
            username,
            password
        };

        return requester.post('user', 'login', 'basic', userData);
    }

    // user/register
    function register(name, email, password) {
        let userData = JSON.stringify({
            name,
            email,
            password
        });
        console.log(userData)
        return requester.post('user', 'auth/signup', 'basic', userData);
    }

    // user/logout
    function logout() {
        let logoutData = {
            authtoken: sessionStorage.getItem('authtoken')
        };
        return requester.post('user', '_logout', 'kinvey', logoutData);
    }

    return {
        login,
        register,
        logout
    }
}
export default auth