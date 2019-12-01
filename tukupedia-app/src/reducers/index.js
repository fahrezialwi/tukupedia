import { combineReducers } from 'redux'

const init = {
    id: '',
    username: '',
    email: '',
    role: ''
}

const initSearch = {
    keyword: ''
}

const authReducer = (state = init, action) => {
    switch(action.type) {
        case "LOGIN_SUCCESS":
            return {
                ...state,
                id: action.payload.id,
                username: action.payload.username,
                email: action.payload.email,
                role: action.payload.role
            }
        case "LOGOUT_SUCCESS":
            return {...state, id: '', username: '', email: '', role: ''}
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