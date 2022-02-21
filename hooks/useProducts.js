import { useSelector } from "react-redux";



const userProducts = () => {
    const products = useSelector(state => state.products)
    return {
        ...products
    }
}


export default userProducts