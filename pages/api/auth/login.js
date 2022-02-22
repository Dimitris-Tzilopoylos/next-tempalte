import { login } from "../../../api-controllers/auth";

async function handler(req,res) {
    if(req.method !== "POST") return;

    await login(req,res)
}

export default handler