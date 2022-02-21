export default async function getHandler(routes,req,res) {     
    try {          

        let handlers =  routes[req.method][req.url.split('/api').pop()]
        if(Array.isArray(handlers) && handlers.length > 1) {
             
            for(let i=0;i<handlers.length-1; i++) {
                let result = await handlers[i](req,res,handlers[i+1])
            }
        }else if(Array.isArray(handlers) && handlers.length === 1)  {
            let result = await handlers[0](req,res)
        }else if(typeof handlers === "function"){
            await handlers(req,res)
        }else throw new Error('NO_HANDLER')
    } catch (error) {
        console.log(error)
        if(routes['*']) {
            return await routes["*"](req,res)
        }else {
            return res.status(404).json({'message': 'Not found'})
        }
    }
}



export const combineRoutes = (routes) => {
    const methods = {
        "GET":{},
        "POST":{}
    }

    for(let method of Object.keys(methods)) {
        for(let route of routes) {
            if(route[method] && Object.keys(route[method])?.length > 0) {
                for(let key of Object.keys(route[method])) {
                    methods[method][key] = route[method][key]
                }
            }
            
        }
    }
    return methods
}

