import { handleError } from "./apiClient";
import DBService from "../services/DBService";
import fs from 'fs/promises'
export const saveFile = async (file,path='./') => {
    path = `${path}/${file.name}`
    let fixB64 = file.file.split('base64,')[1]
    return  await fs.writeFile(path,fixB64,"base64")
}


export const getAllSuperCategories = async (db) => {
    let data
    try {
        let query = `
        SELECT supercategories.*,COUNT(categories.id) as total_categories
        FROM supercategories
        LEFT JOIN categories ON categories.super_id = supercategories.id      
        GROUP BY supercategories.id
        `
         
        await db.query(query)
        data = db.queryResult
        if(!data) throw new Error()
    } catch (error) {
        console.log(error)
    } finally{
        
        return data
    }
}

export const getAllCategories = async (db) => {
    let data
    try {
        let query = `
        SELECT categories.*,supercategories.supercategory_name,supercategories.supercategory_description,supercategories.supercategory_visibility,supercategories.supercategory_image,
        COUNT(brands.id) as total_brands
        FROM categories
        LEFT JOIN brands ON brands.category_id = categories.id
        LEFT JOIN supercategories ON supercategories.id = categories.super_id      
        GROUP BY categories.id
        `
        await db.query(query)
        data = db.queryResult
        if(!data) throw new Error()
    } catch (error) {
        console.log(error)
    } finally{
       
        return data
    }
}