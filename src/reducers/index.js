import { combineReducers } from 'redux'

const init = {
    id: '',
    username: '',
    email: ''
}

const initSearch = {
    keyword: ''
}

const authReducer = (state = init, action) => {
    switch(action.type) {
        case "LOGIN_SUCCESS":
            return {...state, id: action.payload.id, username: action.payload.username, email: action.payload.email}
        case "LOGOUT_SUCCESS":
            return {...state, id: '', username: '', email: ''}
        default:
            return state
    }
}

const searchReducer = (state = initSearch, action) => {
    switch(action.type) {
        case "SEARCH_SUCCESS":
            return {...state, keyword: action.payload.keyword}
        default:
            return state
    }
}

const reducers = combineReducers(
    {
        auth: authReducer,
        search: searchReducer
    }
)

export default reducers

// Pertama kali aplikasi running, reducer akan menjalankan kode yang ada di default
// Pada default kita akan return state yang berisi object init sebagai data awal