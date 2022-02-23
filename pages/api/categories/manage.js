import DBService from '../../../services/DBService'
import ValidationService from '../../../services/ValidationService'
import fs from 'fs/promises'  
import {saveFile} from '../../../utility/admin'

 

async function handler(req,res) {
    const db = new DBService()
    const validation = new ValidationService()
    const path = process.cwd() + "/public/images/categories"
    try {
        if(req.method === "POST") {
            const file_path = `/images/categories/${req.body.image.name}`
            await saveFile(req.body.image,path)
            let {category_name,category_description,category_visibility,super_id} = req.body 
            if(!super_id) throw {error:'No supercategory provided'}
            category_name = validation.validateString(category_name,{min:2,max:20})
            category_description = validation.validateString(category_description,{min:2,max:5000})
            if(!category_description.isValid || !category_name.isValid) throw {error:'Invalid input on creating category',status:400}
            await db.connect()
            await db.insert('categories',{super_id,category_name:category_name.value,category_description:category_description.value,category_visibility,category_image:file_path})
            if(!db.queryResult.insertId) throw {error:'Category was not created',status:400}
            res.status(201).json({message:'Category created',status:201})
        } else if(req.method === "PUT") {      
            let {id,category_name,category_description,category_visibility,image,super_id} = req.body 
            if(!id) throw {error:'No such category',status:400}
            if(!super_id) throw {error:'No such supercategory',status:400}
            category_name = validation.validateString(category_name,{min:2,max:20})
            category_description = validation.validateString(category_description,{min:2,max:5000})
            if(!category_description.isValid || !category_name.isValid) throw {error:'Invalid input on creating super category',status:400}
            if(typeof image !== "string") await saveFile(image,path)
            const file_path = image?.name ? `/images/categories/${image?.name}` : image
            await db.connect()
            await db.query(`SELECT * FROM categories WHERE id = ? `,[id])
            const _super = db.extract_first()
            if(!_super) throw {error:'No such category',status:400}
            await db.start_transaction()
            await db.update(
            'categories',
            {category_name:category_name.value,category_description:category_description.value,category_visibility,category_image:file_path,super_id},
            {id}
            )
            if(image.name) {
                try {
                    await fs.unlink(`${process.cwd()}/public${_super.category_image}`)
                } catch (error) {
                    
                }
            }
            await db.commit()
            if(!db.queryResult.affectedRows) throw {error:'Category was not updated',status:400}
            res.status(200).json({message:'Category updated',status:200})
        } else if( req.method === "DELETE") {
            let {id} = req.body 
            if(!id) throw {error:'No such category',status:400}
            await db.connect()
            await db.query(`SELECT * FROM categories WHERE id = ? `,[id])
            const _super = db.extract_first()
            if(!_super) throw {error:'No such category',status:400}
            await db.delete('categories',{id})
            if(!db.queryResult.affectedRows) throw {error:'Super category was not deleted',status:400}
            try {
                await fs.unlink(`${process.cwd()}/public${_super.category_image}`)
            } catch (error) {
                
            }
            res.status(200).json({message:'Category deleted',status:200})
        } 
    } catch (error) {
            console.log(error)
            if(db.transaction_started) await db.rollback()
            res.status(error.status ?? 500).json({error:error.error ?? 'Something went wrong',status:error.status ?? 400})
    } finally {
        db.close()
    }
   
}


export default handler