import { authService } from '../Services/authService';
import { history } from '../Helpers/history';

export const userActions = {
    login,
    logout
};

function login(email, password) {
    return dispatch => {
        let apiEndpoint = 'user/signIn';
        let payload = {
            email : email,
            password : password
        }

        authService.post(apiEndpoint, payload)
            .then(res => {
                console.log(res);
                if(res.data.status === 200) {
                    localStorage.setItem('token', res.data.token);
                    localStorage.setItem('auth', true);
                    localStorage.setItem('user', JSON.stringify(res.data.result));                    
                    dispatch(setUserDetails(res.data));
                    history.push('/dashboard');
                    alert(res.data.message);
                } else {
                    alert(res.data.message);
                }
            })
    };
}

function logout() {
    return dispatch => {
        localStorage.removeItem('token');
        localStorage.removeItem('auth');
        localStorage.removeItem('user');
        dispatch(logoutUser());
        history.push('/login');        
    }
}

export function setUserDetails(data) {
    return {
        type: "LOGIN_SUCCESS",
        auth: true,
        token: data.token,
        user: JSON.stringify(data.result)
    }
}

export function logoutUser() {
    return {
        type: "LOGOUT_SUCCESS",
        auth: false,
        token: '',
        user: ''
    }
}
