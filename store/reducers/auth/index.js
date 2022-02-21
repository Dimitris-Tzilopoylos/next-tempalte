import { AUTHENTICATE,LOGOUT,AUTH_LOADING } from "./types"
const initialState = {
    isAuthenticated:false,
    authLoading:false,
    authMessage:null,
    user:null,
    token:null
}




export default (state=initialState,action) => {
    switch(action.type) {
        case  AUTH_LOADING:
            return {
                ...state,
                authLoading:action.payload
            }
        case AUTHENTICATE:
            return {
                ...state,
                ...action.payload
            }
        case LOGOUT:
            return {
                ...state,
                isAuthenticated:false,
                user:null,
                authLoading:false,
                authMessage:null,
                user:null,
                token:null
            }
        default:
            return {
                ...state
            }
    }
}