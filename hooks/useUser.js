import { useSelector } from "react-redux";



const useUser = () => {
    const auth = useSelector(state => state.auth)
    return {
        ...auth
    }
}


export default useUser