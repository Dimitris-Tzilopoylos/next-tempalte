import DBService from '../../../services/DBService'
import ValidationService from '../../../services/ValidationService'
import fs from 'fs/promises'  
 

const saveFile = async (file,path='./') => {
    path = `${path}/${file.name}`
    let fixB64 = file.file.split('base64,')[1]
    return  await fs.writeFile(path,fixB64,"base64")
}

const parseSingleFile = async (req,filename) => {
    let body = []
  req.on('data',(chunk) => {
    body.push(chunk);
  }).on('end', () => {
    body = Buffer.concat(body).toString();
    console.log(body)
  })
}


async function handler(req,res) {
    const db = new DBService()
    const validation = new ValidationService()
    const path = process.cwd() + "/public/images"
    try {
        if(req.method === "POST") {
            const file_path = `/images/${req.body.image.name}`
            await saveFile(req.body.image,path)
            let {supercategory_name,supercategory_description,supercategory_visibility} = req.body 
            supercategory_name = validation.validateString(supercategory_name,{min:2,max:20})
            supercategory_description = validation.validateString(supercategory_description,{min:2,max:5000})
            if(!supercategory_description.isValid || !supercategory_name.isValid) throw {error:'Invalid input on creating super category',status:400}
            await db.connect()
            await db.insert('supercategories',{supercategory_name:supercategory_name.value,supercategory_description:supercategory_description.value,supercategory_visibility,supercategory_image:file_path})
            if(!db.queryResult.insertId) throw {error:'Super category was not created',status:400}
            res.status(201).json({message:'Supercategory created',status:201})
        } else if(req.method === "PUT") {
            
            let {id,supercategory_name,supercategory_description,supercategory_visibility,image} = req.body 
            if(!id) throw {error:'No such super category',status:400}
            supercategory_name = validation.validateString(supercategory_name,{min:2,max:20})
            supercategory_description = validation.validateString(supercategory_description,{min:2,max:5000})
            if(!supercategory_description.isValid || !supercategory_name.isValid) throw {error:'Invalid input on creating super category',status:400}
            if(typeof image !== "string") await saveFile(image,path)
            const file_path = image?.name ? `/images/${image?.name}` : image
            await db.connect()
            await db.query(`SELECT * FROM supercategories WHERE id = ? `,[id])
            const _super = db.extract_first()
            if(!_super) throw {error:'No such supercategory',status:400}
            await db.start_transaction()
            await db.update(
            'supercategories',
            {supercategory_name:supercategory_name.value,supercategory_description:supercategory_description.value,supercategory_visibility,supercategory_image:file_path},
            {id}
            )
            if(image.name)
                await fs.unlink(`${process.cwd()}/public${_super.supercategory_image}`)
            await db.commit()
            if(!db.queryResult.affectedRows) throw {error:'Super category was not updated',status:400}
            res.status(200).json({message:'Supercategory updated',status:200})
        } else if( req.method === "DELETE") {
            let {id} = req.body 
            if(!id) throw {error:'No such super category',status:400}
            await db.connect()
            await db.query(`SELECT * FROM supercategories WHERE id = ? `,[id])
            const _super = db.extract_first()
            if(!_super) throw {error:'No such supercategory',status:400}
            await db.delete('supercategories',{id})
            if(!db.queryResult.affectedRows) throw {error:'Super category was not deleted',status:400}
            await fs.unlink(`${process.cwd()}/public${_super.supercategory_image}`)
            res.status(200).json({message:'Supercategory deleted',status:200})
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