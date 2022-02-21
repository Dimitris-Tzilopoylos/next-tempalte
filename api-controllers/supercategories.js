import DBService from "../services/DBService";
import { getAllSuperCategories } from "../utility/supercategories";

export const getSuperCategories = async (req,res) => {
    try {
        const data = await getAllSuperCategories()
        if(!data) throw {error:'NO_SUPERCATEGORIES',status:400}
        return res.status(200).json({supercategories:data})
    } catch (error) {
        return res.status(400).json({error:'No supercategories found at the moment',status:400})
    }
}