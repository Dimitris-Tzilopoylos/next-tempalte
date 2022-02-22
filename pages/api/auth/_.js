import router from '../../../api-router'
import authRoutes from '../../../api-router/routes/auth'

 
const handler = async (req,res) => await router(authRoutes,req,res)
 

export default handler 