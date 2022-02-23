import { useSelector } from "react-redux";



const useProducts = () => {
    const products = useSelector(state => state.products)
    return {
        ...products
    }
}


export default useProducts