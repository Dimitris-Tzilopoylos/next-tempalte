import axios from 'axios'

const api = axios.create({
    withCredentials:true
})

export const handleError = (error) => {
    if(error?.response?.data?.message ) {
        return {error:error?.response?.data?.message ?? error.message }
    }
}

export default api