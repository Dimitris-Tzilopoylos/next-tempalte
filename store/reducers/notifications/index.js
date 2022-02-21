import {
    ADD_NOTIFICATION,
    DELETE_NOTIFICATION
} from './types'


const initialState = {
    notification:null,
}

export default (state=initialState,action) => {
    switch(action.type) {
        case ADD_NOTIFICATION:
            return {
                ...state,
                notification:action.payload
            }
        case DELETE_NOTIFICATION:
            return {
                ...state,
                notification:null
            }
        default:
            return {
                ...state
            }
    }
}