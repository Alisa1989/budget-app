import axios from 'axios'

const API_URL = '/api/users/'

// axios.defaults.baseURL = 'http://localhost:3000';

//register user
const register = async (userData) => {
    const response = await axios.post(API_URL + 'register', userData)
    console.log("response", response);

    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

//login user
const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData)
    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

//logout user
const logout = () => {
    localStorage.removeItem('user')
}

const authService = {
    register,
    logout,
    login
}

export default authService