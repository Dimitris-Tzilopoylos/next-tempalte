import {getDashboardData} from '../../api-controllers/dashboard'
import { Authentication } from '../../middleware/isAuthenticated'

export default {
    'GET': {
        '/dashboard/data': [Authentication,getDashboardData]
    }
}