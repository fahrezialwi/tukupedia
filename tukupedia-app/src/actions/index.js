import axios from 'axios'
import URL_API from '../configs/urlAPI'

// Login
export const onLoginUser = (username, password) => {

    return (dispatch) => {
        axios.get (
            URL_API + 'users',
            {
                params: {
                    username: username,
                    password: password
                }
            }
        ).then(res => {

            if (res.data.results.length === 0) {
                alert('User tidak ditemukan')
            } else {
                let{id, username, email, role} = res.data.results[0]

                localStorage.setItem(
                    'userData',
                    JSON.stringify({id, username, email, role})
                )

                dispatch(
                    {
                        type: 'LOGIN_SUCCESS',
                        payload: {
                            id, username, email, role
                        }
                    }
                )
            }
        })
    }
}

// Keep Login
export const keepLogin = (objUser) => {

    return {
        type: 'LOGIN_SUCCESS',
        payload: {
            id: objUser.id,
            username: objUser.username,
            email: objUser.email,
            role: objUser.role
        }
    }
}

// Logout
export const onLogoutUser = () => {

    localStorage.removeItem('userData')
    return {
        type: 'LOGOUT_SUCCESS'
    }
}

// Search
export const searchKeyword = (keyword) => {

    return {
        type: 'SEARCH_SUCCESS',
        payload: {
            keyword: keyword
        }
    }
}