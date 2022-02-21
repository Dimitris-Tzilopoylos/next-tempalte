import axios from './apiClient'
import JWTService from '../services/JWTService'
import { handleError } from './apiClient'

export const registerUser = async (user) => {
    const data = {}
    let error  = null 
   
    try {
        for(let key of Object.keys(user)) {
            data[key] = user[key].value
            if(!user[key].isValid) {
                error = user[key].error ?? 'Something went wrong'
                throw {message:error}
            }
        }
        let res = await axios.post(`http://localhost:3000/api/auth/register`,data) 
        return {error}
    } catch (error) {
        return handleError(error)
    }
}

export const loginUser = async (user) => {
    const data = {}
    let error  = null 
   
    try {
        for(let key of Object.keys(user)) {
            data[key] = user[key].value
            if(!user[key].isValid) {
                error = user[key].error ?? 'Something went wrong'
                throw {message:error}
            }
        }
        let res = await axios.post(`http://localhost:3000/api/auth/login`,data,{withCredentials:true}) 
        return {error}
    } catch (error) {
        return handleError(error)
    }
}


export const isAuthenticated = (ctx) => {
    const auth = new JWTService()
    const token = ctx?.req?.cookies?.jwt
    if(!token) return false 
    const user = auth.verifyToken(token)
    if(!user) return false 
    return user
}