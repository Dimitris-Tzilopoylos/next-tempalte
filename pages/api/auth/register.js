import { register } from "../../../api-controllers/auth";


async function handler(req,res) {
    if(req.method !== "POST") return;  

    await register(req,res)
}


export default handler