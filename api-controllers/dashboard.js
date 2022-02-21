import DBService from '../services/DBService'
import { getDashboardData  as getData} from '../utility/dashboard'

export const getDashboardData = async (req,res) =>  {
     try {
       
        const data = await getData()
        if(!data) throw new Error()
        return res.status(200).json({...data,status:200})
    } catch (error) {
        return res.status(400).json({error:'Something went wrong',status:400})
    } 
}

