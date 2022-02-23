import { getAllCategories } from "../../../utility/admin";
import DBService from '../../../services/DBService'
import * as apiErrors from '../../../utility/apiErrors'

async function handler(req,res) {
    if(req.method !== "POST") return apiErrors.MethodNotAllowed(res);
    const db = new DBService()
    try {
        await db.connect()
        const categories = await getAllCategories(db)
        if(!categories?.length) throw {error:'No categories',status:400}
        res.status(200).json({categories})
    } catch (error) {
        res.status(400).json({error:error.error ?? 'Something went wrong',status:error.status ?? 400})
    } finally {
        db.close()
    }
}


export default handler