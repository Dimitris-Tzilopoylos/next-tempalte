import { getAllSuperCategories } from "../../../utility/supercategories";

async function handler(req,res) {
    try {
        const supercategories = await getAllSuperCategories()
        console.log(supercategories)
        if(!supercategories?.length) throw {error:'No supercategories',status:400}
        return res.status(200).json({supercategories})
    } catch (error) {
        console.log(error)
        return res.status(400).json({error:error.error ?? 'Something went wrong',status:error.status ?? 400})
    }
}


export default handler