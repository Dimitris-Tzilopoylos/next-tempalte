import {
    SUPERCATEGORIES_LOADING,
    CATEGORIES_LOADING,
    PRODUCTS_LOADING,
    SET_PRODUCTS,
    SET_SUPERCATEGORIES,
    SET_CATEGORIES,
    SET_PRODUCT,
    SET_SUPERCATEGORY,
    SET_CATEGORY,
} from '../reducers/products/types'
import { addNotification } from './notifications'
import axios from '../../utility/apiClient'
const API ='http://localhost:3000/api'


export const supercategoriesLoading = (loading) => (dispatch,getState) => dispatch({type:SUPERCATEGORIES_LOADING,payload:loading})
export const categoriesLoading = (loading) => (dispatch,getState) => dispatch({type:CATEGORIES_LOADING,payload:loading})
export const productsLoading = (loading) => (dispatch,getState) => dispatch({type:PRODUCTS_LOADING,payload:loading})
export const setSupercategories = (data) => (dispatch,getState) => dispatch({type:SET_SUPERCATEGORIES,payload:{...data}})
export const setCategories = (data) => (dispatch,getState) => dispatch({type:SET_CATEGORIES,payload:{...data}})
export const setProducts = (data) => (dispatch,getState) => dispatch({type:SET_PRODUCTS,payload:{...data}})
export const setSupercategory = (supercategory) => (dispatch,getState) => dispatch({type:SET_SUPERCATEGORY,payload:supercategory})
export const setCategory = (category) => (dispatch,getState) => dispatch({type:SET_CATEGORY,payload:category})
export const setProduct = (product) => (dispatch,getState) => dispatch({type:SET_PRODUCT,payload:product})



/// GETTERS 

export const getSupercategories = (page=1,view=12) => async (dispatch,getState) => {
    let status = true 
    try {
        dispatch(supercategoriesLoading(true))
        const res = await axios.post(`${API}/supercategories`,{
            page,
            view
        })
        dispatch(setSupercategories({...res.data}))
    } catch (error) {
        status = false
         dispatch(setSupercategories({supercategories:[],supercategoriesPage:1,supercategoriesLimit:1,total_supercategories:0}))
    } finally {
        dispatch(supercategoriesLoading(false))
        return status
    }
}


export const getCategories = (page=1,view=12) => async (dispatch,getState) => {
    let status = true 
    try {
        dispatch(categoriesLoading(true))
        const res = await axios.post(`${API}/categories`,{
            page,
            view
        })
        dispatch(setCategories({...res.data}))
    } catch (error) {
        status = false
    } finally {
        dispatch(categoriesLoading(false))
        return status
    }
}


export const getProducts = (page=1,view=12) => async (dispatch,getState) => {
    let status = true 
    try {
        dispatch(productsLoading(true))
        const res = await axios.post(`${API}/supercategories`,{
            page,
            view
        })
        dispatch(setProducts({...res.data}))
    } catch (error) {
        status = false
    } finally {
        dispatch(productsLoading(false))
        return status
    }
}



/// CRUD SUPER CATEGORIES 

export const createSuperCategory = (formData) => async (dispatch,getState) => {
    let status = true 
    try {
        const data = {}
        Object.keys(formData).forEach(key => {
            data[key] = formData[key].value
        })
        dispatch(supercategoriesLoading(true))
        let res = await axios.post(`${API}/supercategories/manage`,data)
        dispatch(addNotification({notification:res.data.message,variant:'success'}))
        await dispatch(getSupercategories())
    } catch (error) {
        status = false
        dispatch(addNotification({notification:'Supercategory was not created',variant:'error'}))
    } finally {
        dispatch(supercategoriesLoading(false))
        return status
    }
}



export const updateSuperCategory = (id,formData) => async (dispatch,getState) => {
    let status = true 
    try {
        if(!id) throw new Error('No supercategory provided')
        const data = {}
        Object.keys(formData).forEach(key => {
            data[key] = formData[key].value
        })
        data.id = id
        dispatch(supercategoriesLoading(true))
        let res = await axios.put(`${API}/supercategories/manage`,data)
        dispatch(addNotification({notification:res.data.message,variant:'success'}))
        await dispatch(getSupercategories())
    } catch (error) {
        status = false
        dispatch(addNotification({notification:'Supercategory was not updated',variant:'error'}))
    } finally {
        dispatch(supercategoriesLoading(false))
        return status
    }

} 


export const deleteSuperCategory = (id) => async (dispatch,getState) => {
    let status = true 
    try {
        if(!id) throw new Error('No supercategory provided')
         
        dispatch(supercategoriesLoading(true))
        let res = await axios.delete(`${API}/supercategories/manage`,{
            data:{id}
        })
        dispatch(addNotification({notification:res.data.message,variant:'success'}))
        await dispatch(getSupercategories())
    } catch (error) {
        status = false
        dispatch(addNotification({notification:'Supercategory was not deleted',variant:'error'}))
    } finally {
        dispatch(supercategoriesLoading(false))
        return status
    }

} 