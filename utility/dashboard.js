import axios from './apiClient'
import { handleError } from './apiClient'
import DBService from '../services/DBService'



export const getDashboardData = async () => {
   
    const db = new DBService()
    let data = null
    try {
        let query = `
            with members as (
                select COUNT(*) as total_users from users 
            )
            SELECT * FROM members LIMIT 1;
        `

        await db.connect()
        await db.query(query)
        data = db.extract_first()
       
    } catch (error) {

    } finally {
        db.close()
        return data
    }
   
}