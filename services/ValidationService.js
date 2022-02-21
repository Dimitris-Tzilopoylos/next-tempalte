class ValidationService {

    validateEmail(email) {
        return {isValid:/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email),value:email}
    }

    validateString(value,opt={}) {
        const options = {
            min:0,
            max:100,
            trim:false,
            upper:false,
            lower:false,
            ...opt
        }
        if(!value) return {isValid:false,value}
        if(options.trim)
            value = value.toString().trim()
        if(options.lower) value = value.toLowerCase()
        else if(options.upper) value = value.toUpperCase()

        if(value.length < options.min) return {isValid:false,value}
        if(value.length > options.max) return {isValid:false,value}

        return {isValid:true,value}
    }

    validateNumber(value,opt={}) {
        const options = {
            min:null,
            max:null,
            ...opt
        }
        if(!value || isNaN(value)) return {isValid:false,value}
        value = Number(value)
        if(value < options.min) return {isValid:false,value}
        if(value > options.max) return {isValid:false,value}
        return {isValid:true,value}
    }


    compareValues(value1,value2) {
        return value1 === value2
    }
}


export default ValidationService