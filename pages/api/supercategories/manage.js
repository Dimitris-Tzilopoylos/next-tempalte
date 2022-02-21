import DBService from '../../../services/DBService'
import ValidationService from '../../../services/ValidationService'

async function handler(req,res) {
    const db = new DBService()
    const validation = new ValidationService()
    try {
        if(req.method === "POST") {
            let {supercategory_name,supercategory_description,supercategory_visibility} = req.body 
            supercategory_name = validation.validateString(supercategory_name,{min:2,max:20})
            supercategory_description = validation.validateString(supercategory_description,{min:2,max:5000})
            if(!supercategory_description.isValid || !supercategory_name.isValid) throw {error:'Invalid input on creating super category',status:400}
            await db.connect()
            await db.insert('supercategories',{supercategory_name:supercategory_name.value,supercategory_description:supercategory_description.value,supercategory_visibility})
            if(!db.queryResult.insertId) throw {error:'Super category was not created',status:400}
            res.status(201).json({message:'Supercategory created',status:201})
        } else if(req.method === "PUT") {
            let {id,supercategory_name,supercategory_description,supercategory_visibility} = req.body 
            if(!id) throw {error:'No such super category',status:400}
            supercategory_name = validation.validateString(supercategory_name,{min:2,max:20})
            supercategory_description = validation.validateString(supercategory_description,{min:2,max:5000})
            if(!supercategory_description.isValid || !supercategory_name.isValid) throw {error:'Invalid input on creating super category',status:400}
            await db.connect()
            await db.update('supercategories',{supercategory_name:supercategory_name.value,supercategory_description:supercategory_description.value,supercategory_visibility},{id})
            if(!db.queryResult.affectedRows) throw {error:'Super category was not updated',status:400}
            res.status(200).json({message:'Supercategory updated',status:200})
        } else if( req.method === "DELETE") {
            let {id} = req.body 
            if(!id) throw {error:'No such super category',status:400}
            await db.connect()
            await db.delete('supercategories',{id})
            if(!db.queryResult.affectedRows) throw {error:'Super category was not deleted',status:400}
            res.status(200).json({message:'Supercategory deleted',status:200})
        }else return
    } catch (error) {
            res.status(error.status ?? 500).json({error:error.error ?? 'Something went wrong',status:error.status ?? 400})
    } finally {
        db.close()
    }
   
}


export default handler