import mysql from 'mysql2/promise'


const pool = mysql.createPool({
    host:process.env.DB_HOST,
    port:process.env.DB_PORT,
    database:process.env.DB_NAME,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    multipleStatements:true,
    connectionLimit:30,
    waitForConnections:true,
    
})
class DBService {
    
    constructor() {
     this.connection = null
     this.queryResult = []
     this.queryResultFieds = []
     this.queryResultRows = 0
     this.connection_status = false 
     this.transaction_started = false 

    }

    async connect() {
        this.connection = await pool.getConnection()
        this.connection_status = true
    }

    async close() {
        if(this.connection_status) this.connection.release()
        this.transaction_started = false
        this.connection_status = false
    }

    async query(query,args=[]) {
        let [rows,fields] = await this.connection.query(query,args)
        this.queryResult = rows 
        this.queryResultFieds = fields 
        this.queryResultRows = this.queryResult?.length || 0 
        return rows
    }

    async start_transaction() {
        if(this.transaction_started) throw new Error('TRANSACTION_ALREADY_STARTED')
        await this.connection.query('START TRANSACTION;')
        this.transaction_started = true         
    }

    async commit() {
        if(!this.transaction_started) throw new Error('NO_PENDING_TRANSACTION')
        await this.connection.query('COMMIT;')
        this.transaction_started = false 
    }

    async rollback() {
        if(!this.transaction_started) throw new Error('NO_PENDING_TRANSACTION')
        await this.connection.query('ROLLBACK;')
        this.transaction_started = false 
    }

    extract_first() {
       return  this.queryResultRows > 0 ?  this.queryResult[0] : null
    }

    extract_last() {
        return  this.queryResultRows > 0  ?  this.queryResult[this.queryResultRows - 1] : null
    }

    async insert(table,args={},multiple = false) {
        if(!table || typeof table !== "string") throw new Error('NO_TABLE_PROVIDED')
        if(multiple && !Array.isArray(args)) throw new Error('MULTIPLE_ERROR_ARGS')
        if(!args || !args instanceof Object || Object.keys(args).length < 1) throw new Error('NO_INSERT_DATA_PROVIDED')
        let query_insert = ''
        let newArr = Array.isArray(args) ? args : [args]
        let columns = this.getColumns(newArr[0])
        let query_args = [table]
        for(let column of columns) {
            query_insert += '??,'
            query_args.push(column)
        }
        query_insert = query_insert.substring(0,query_insert.length - 1) 
        let query = `INSERT INTO ?? (`+query_insert+") VALUES "
        for(let entry of newArr) {
            let query_append = ' ('
            for(let column of columns) {
               query_append += '?,'
               query_args.push(entry[column])
            }
            query_append = query_append.substring(0,query_append.length - 1) + "),"
            query += query_append
        } 
        query = query.substring(0,query.length - 1)
        console.log( query)
        await this.query(query,query_args)
    }

    async update(table,set={},condition={}) {
        if(!table || typeof table !== "string") throw new Error('NO_TABLE_PROVIDED')
        if(!set || !set instanceof Object || Object.keys(set).length < 1) throw new Error('NO_INSERT_DATA_PROVIDED')
        let query = `update ?? set `
        let columns = this.getColumns(set)
        let condition_columns = this.getColumns(condition)
        let query_args = [table]
        let query_condition_args = []
        let query_set = ''
        let conditional_set = ' WHERE TRUE'
        for(let i =0; i< columns.length; i ++) {
            query_set += ' ?? = ?,'
            query_args.push(columns[i])
            query_args.push(set[columns[i]])
            if(i < condition_columns.length) {
                conditional_set += ' AND ?? = ?'
                query_condition_args.push(condition_columns[i])
                query_condition_args.push(condition[condition_columns[i]])
            }
        }   
        query_set = query_set.substring(0,query_set.length - 1)
        query += query_set + conditional_set
        query_args = [...query_args,...query_condition_args]
        console.log(query,query_args)
        await this.query(query,query_args)
    }

    async delete(table,args={},multiple = false) {
        if(!table || typeof table !== "string") throw new Error('NO_TABLE_PROVIDED')
        if(multiple && !Array.isArray(args)) throw new Error('MULTIPLE_ERROR_ARGS')
        if(!args || !args instanceof Object ) throw new Error('NO_DELETE_DATA_PROVIDED')
        let query = `DELETE FROM ?? WHERE true`
        let newArr = Array.isArray(args) ? args : [args]
        let columns = this.getColumns(newArr[0])
        let query_args = [table]
        for(let entry of newArr) {
            let query_append = ''
            for(let column of columns) {
               query_append += ' AND ?? = ?'
               query_args.push(column)
               query_args.push(entry[column])
            }
             
            query += query_append
        } 
        console.log(query)
         
        await this.query(query,query_args)
    }

    getColumns(entry) {
        return Object.keys(entry)
    }

}




 export default DBService