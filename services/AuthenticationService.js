import JWTService from "./JWTService";
import ValidationService from './ValidationService'
import bcrypt from 'bcryptjs'
import DBService from "./DBService";

class AuthenticationService extends JWTService {
    constructor() {
        super()
        this.db = new DBService()
        this.validators = new ValidationService()
    }

    async hashPassword(password,salt=12) {
        let hashed = await bcrypt.hash(password,salt)
        return hashed
    }

    async comparePassword(password,hash) {
        let compare = await bcrypt.compare(password,hash)
        return compare
    }


    


}


export default AuthenticationService