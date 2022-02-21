import {login,logout,register} from '../../api-controllers/auth'
import { Authentication } from '../../middleware/isAuthenticated'

export default {
    'POST': {
    '/auth/login':login,
    '/auth/register':register,
    '/auth/logout': [Authentication,logout]
    },
    'GET': {
        // '/auth/logout': [Authentication,logout]
    }
}