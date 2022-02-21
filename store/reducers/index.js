import { combineReducers } from "redux";
import authReducer from './auth'
import productsReducer from './products'
import notificationReducer from "./notifications";

export default combineReducers({
    auth:authReducer,
    products:productsReducer,
    notifications:notificationReducer
})