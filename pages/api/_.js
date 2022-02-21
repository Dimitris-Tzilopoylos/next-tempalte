import router, {combineRoutes} from '../../api-router'
import dashboardRoutes from '../../api-router/routes/dashboard'
import authRoutes from '../../api-router/routes/auth'
 

const routes = combineRoutes([authRoutes,dashboardRoutes])

const handler = async (req,res) => await router(routes,req,res)
 
export default handler 