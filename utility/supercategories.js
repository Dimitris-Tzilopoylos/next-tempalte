import { handleError } from "./apiClient";
import DBService from "../services/DBService";


export const getAllSuperCategories = async () => {
    const db = new DBService()
    let data
    try {
        let query = `
        SELECT supercategories.*,COUNT(categories.id) as total_categories
        FROM supercategories
        LEFT JOIN categories ON categories.super_id = supercategories.id      
        GROUP BY supercategories.id
        `
        await db.connect()
        await db.query(query)
        data = db.queryResult
        if(!data) throw new Error()
    } catch (error) {
        console.log(error)
    } finally{
        return data
    }
}