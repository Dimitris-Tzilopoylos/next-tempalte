import AuthenticationService from '../services/AuthenticationService'
export const login = async  (req,res) => {
    const auth = new AuthenticationService()
    const {db,validators} = auth 
    try {
        let  {email,password} = req.body 
        email = validators.validateEmail(email)
        password = validators.validateString(password,{min:8,max:16,trim:true})
        if(!email.isValid) throw {error:'Invalid email format'}
        if(!password.isValid) throw {error:'Password should be between 8 and 16 characters long'}
        email = email.value 
        password = password.value
        let query = "SELECT * FROM users WHERE email = ? LIMIT 1"
        await db.connect()
        await db.query(query,[email])
        const user = db.extract_first()
        if(!user) throw {error:'Please signup in order to continue'}
        const isAuthenticated = auth.comparePassword(password,user.password)
        if(!isAuthenticated) throw {error:'Invalid credentials'}
        const token = auth.signToken({...user,password:null})
        var date = new Date();
        date.setTime(date.getTime() + (2*24*60*60*1000));
        res.setHeader('Set-Cookie',`jwt=${token}; path=/; expires=${date.toUTCString()}; HttpOnly`)
        res.status(201).json({status:200,user:{...user,password:null},token})
    } catch (error) {
        console.log(error)
        res.status(404).json({message:'bad'})
    } finally {
        db.close()
        res.end()
        return
    }

}


export const register = async (req,res) =>  {
    const auth = new AuthenticationService()
    const db = auth.db 
    try {
        let  {email,password,name,last_name,password2} = req.body 
        email = auth.validators.validateString(email,{min:6,max:60,trim:true,lower:true})
        if(email.isValid) email = auth.validators.validateEmail(email.value)
        name = auth.validators.validateString(name,{min:2,max:20,trim:true})
        last_name = auth.validators.validateString(last_name,{min:2,max:20,trim:true})
        password = auth.validators.validateString(password,{min:8,max:16,trim:true})
        password2 = auth.validators.validateString(password2,{min:8,max:16,trim:true})
        if(!name.isValid || !last_name.isValid || !email.isValid || !password.isValid || !password2.isValid || !auth.validators.compareValues(password.value,password2.value))  throw {error:`Registration data are not valid`,status:400}
        const hashPWD = await auth.hashPassword(password.value,12)
        await db.connect()
        await db.insert('users',{email:email.value,name:name.value,last_name:last_name.value,password:hashPWD})
        if(!db.queryResult.insertId) throw {error:'Registration failed',status:400}
        return res.status(201).json({message:'Registration completed',status:201})
    } catch (error) {
        res.status(error.status ?? 500).json({message:error.error ?? 'Something went wrong',status:error.status})
    } finally {
        db.close()
        res.end()
        return
    }
   
}


export const logout = async (req,res) => {
    res.setHeader('Set-Cookie','jwt=null; Max-Age=0; path=/')
    res.end();
    return
}