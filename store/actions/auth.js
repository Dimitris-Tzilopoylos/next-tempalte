import axios from '../../utility/apiClient'
import { AUTHENTICATE,LOGOUT,AUTH_LOADING } from '../reducers/auth/types'
import Router from 'next/router'


export const setAuthLoading = (loading) => (dispatch) => dispatch({type:AUTH_LOADING,payload:loading})

export const authenticate = (user,token) => {
    return {type:AUTHENTICATE,payload:{user:{...user},token:token,isAuthenticated:!!user?.id}}
}


export const logout = () => async (dispatch,getState) => {
    try {
        dispatch(setAuthLoading(true))
        const res = await axios.post(`/api/auth/logout`)
        dispatch({type:LOGOUT})
        Router.push('/auth/login')
    } catch (error) {

    } finally {
        dispatch(setAuthLoading(false))
    }
}