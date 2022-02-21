import { isAuthenticated } from "../utility/auth";

export async function Authentication(req,res,next) {
    try {
        console.log(req.cookie)
        const user = isAuthenticated({req})
        console.log(req.cookies)
        if(!user) return res.status(401).json({error:'Access Denied',status:401})
        req.user = user 
        await next(req,res) 
    } catch (error) {
        await next(req,res)
    }

}
