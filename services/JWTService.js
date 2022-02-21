import jwt from 'jsonwebtoken'


class JWTService {

    constructor(secret=process.env.JWT_SECRET,expiresIn=process.env.JWT_EXPIRES_IN) {
        this.secret = secret 
        this.expiresIn = expiresIn
    }

    signToken(payload) {
        const token = jwt.sign(payload,this.secret,{expiresIn:this.expiresIn})
        return token
    }

    verifyToken(token) {
        try {
            return jwt.verify(token,this.secret)  
        } catch (error) {
            return null
        }
       
    }


}


export default JWTService