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
} from './types'


const initialState = {
    supercategories_loading: false,
    categories_loading:false,
    products_loading:false,
    products:null,
    product:null,
    supercategories:null,
    supercategory:null,
    categories:null,
    category:null,
    productsPage:1,
    productsLimit:1,
    productsView:12,
    total_products:0,
    supercategoriesPage:1,
    supercategoriesLimit:1,
    supercategoriesView:12,
    total_supercategories:0,
    categoriesPage:1,
    categoriesLimit:1,
    categoriesView:12,
    total_categories:0
}



export default (state=initialState,action) => {
    switch(action.type) {
        case SUPERCATEGORIES_LOADING:
            return {
                ...state,
                supercategories_loading:action.payload
            }
        case CATEGORIES_LOADING:
            return {
                ...state,
                categories_loading:action.payload
            }
        case PRODUCTS_LOADING:
            return {
                ...state,
                products_loading:action.payload
            }
        case SET_SUPERCATEGORIES:
            return {
                ...state,
                ...action.payload
            }
        case SET_SUPERCATEGORY:
            return {
                ...state,
                supercategory:action.payload
            }
        case SET_CATEGORIES:
            return {
                ...state,
                ...action.payload
            }
        case SET_CATEGORY:
            return {
                ...state,
                category:action.payload
            }
        case SET_PRODUCTS:
            return {
                ...state,
                ...action.payload
            }
        case SET_PRODUCT:
            return {
                ...state,
                product:action.payload
            }
        default:
            return {
                ...state
            }
    }
}