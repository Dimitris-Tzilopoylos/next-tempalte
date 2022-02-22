import { logout } from "../../../api-controllers/auth";


async function handler(req,res) {
    if(req.method !== "POST") return;
    await logout(req,res)
}

export default handler