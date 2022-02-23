export const MethodNotAllowed = (res) => {
    return res.status(405).json({message:'Method not allowed',status:405})
}

export const NotFound = (res) => {
    return res.status(404).json({message:'Not found',status:404})
}

export const Forbidden = (res) => {
    return res.status(403).json({message:'Access denied',status:403})
}

export const Unauthorized = (res) => {
    return res.status(401).json({message:'Unauthorized',status:401})
}

export const BadRequest = (res) => {
    return res.status(400).json({message:'Bad request',status:400})
}