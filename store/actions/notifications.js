import { ADD_NOTIFICATION,DELETE_NOTIFICATION } from "../reducers/notifications/types";


export const addNotification = (notification,timer=3) => (dispatch,getState) => {
    dispatch({type:ADD_NOTIFICATION,payload:notification})
    let x = setTimeout(()=>{
        dispatch(deleteNotification())
    },timer ? timer*1000 : 3000)
}

export const deleteNotification = () => (dispatch,getState) => {
    dispatch({type:DELETE_NOTIFICATION })
}