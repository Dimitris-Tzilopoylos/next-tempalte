import router from '../../../api-router'
import dashboardRoutes from '../../../api-router/routes/dashboard'

 
const handler = async (req,res) => await router(dashboardRoutes,req,res)
 
export default handler 