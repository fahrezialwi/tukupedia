import axios from 'axios'

// Kumpulan Action Creator

// Action Creator Login
export const onLoginUser = (username, password) => {

    return (dispatch) => {
        axios.get (
            'http://localhost:2019/users',
            {
                params: {
                    username: username,
                    password: password
                }
            }
        ).then((res)=> {
    
            // res.data merupakan sebuah array
            // jika data ditemukan, length > 0
            // jika data tidak ditemukan, length = 0
            if (res.data.length === 0){
                alert('User tidak ditemukan')
            } else {
                // mengambil properti id dan username dari object res.data[0]
                let{id, username, email} = res.data[0]
    
                // Mengirim data ke local storage
                localStorage.setItem(
                    'userData',
                    JSON.stringify({id, username, email})
                    // JSON.stringify akan mengubah bentuk object menjadi string 
                )
                // Mengirim data ke redux
                dispatch(
                    {
                        type: 'LOGIN_SUCCESS',
                        payload: {
                            id, username, email
                        }
                    }
                )
            }
        })
    }
}

// Action Creator
export const keepLogin = (objUser) => {

    // Action
    return {
        type: 'LOGIN_SUCCESS',
        payload: {
            id: objUser.id,
            username: objUser.username,
            email: objUser.email
        }
    }
}

// Action Creator Logout
export const onLogoutUser = () => {

    localStorage.removeItem('userData')
    // Action
    return {
        type: 'LOGOUT_SUCCESS',
    }
}

// Action Creator
export const searchKeyword = (keyword) => {

    // Action
    return {
        type: 'SEARCH_SUCCESS',
        payload: {
            keyword: keyword
        }
    }
}

// export dengan default
// ketika diimport di file lain tidak boleh menggunakan kurung kurawal

// export tanpa default
// ketika diimport di file lain harus menggunakan kurung kurawal

// hanya ada satu export default dalam satu file
