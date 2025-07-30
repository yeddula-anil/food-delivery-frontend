import * as actionTypes from './ActionTypes'
const initialState={
    restaurants:[],
    userRestaurant:null,
    restaurant:null,
    loading:false,
    error:null,
    search:[],
    categories:[]

}
const restaurantReducer=(state=initialState,action)=>{
    switch(action.type){
        case actionTypes.CREATE_RESTAURANT_REQUEST:
        case actionTypes.GET_ALL_RESTAURANT_REQUEST:
        case actionTypes.DELETE_RESTAURANT_REQUEST:
        case actionTypes.UPDATE_RESTAURANT_REQUEST:
        case actionTypes.GET_RESTAURANT_BY_ID_REQUEST:
        case actionTypes.CREATE_CATEGORY_REQUEST:
        case actionTypes.GET_RESTAURANT_CATEGORY_REQUEST:
        case actionTypes.SEARCH_RESTAURANT_REQUEST:
            return{
                ...state,
                loading:true
            };
        case actionTypes.CREATE_RESTAURANT_SUCCESS:
            return{
                ...state,
                loading:false,
                userRestaurant:action.payload
            };
        case actionTypes.GET_ALL_RESTAURANT_SUCCESS:
            return{
                ...state,
                loading:false,
                restaurants:action.payload
            };
        case actionTypes.GET_RESTAURANT_BY_ID_SUCCESS:
            return{
                ...state,
                loading:false,
                restaurant:action.payload
            };
        case actionTypes.GET_RESTAURANT_BY_USER_ID_SUCCESS:
        case actionTypes.UPDATE_RESTAURANT_STATUS_SUCCESS:
        case actionTypes.UPDATE_RESTAURANT_SUCCESS:
            return{
                ...state,
                loading:false,
                userRestaurant:action.payload
            };
        case actionTypes.DELETE_RESTAURANT_SUCCESS:
            return{
                ...state,
                error:null,
                loading:false,
                restaurants:state.restaurants.filter((item)=>item.id!==action.payload),
                userRestaurant:state.userRestaurant?.id === action.payload ? null : state.userRestaurant

            }
        case actionTypes.CREATE_CATEGORY_SUCCESS:
            return{
                ...state,
                loading:false,
                categories:[...state.categories,action.payload]
            };
        case actionTypes.GET_RESTAURANT_CATEGORY_SUCCESS:
            return{
                ...state,
                loading:false,
                categories:action.payload
            }
        case actionTypes.SEARCH_RESTAURANT_SUCCESS:
            return{
                ...state,
                loading:false,
                 search: Array.isArray(action.payload) ? action.payload : []
            }
        case actionTypes.CREATE_RESTAURANT_FAILURE:
        case actionTypes.GET_ALL_RESTAURANT_FAILURE:
        case actionTypes.UPDATE_RESTAURANT_FAILURE:
        case actionTypes.GET_RESTAURANT_BY_ID_FAILURE:
        case actionTypes.CREATE_CATEGORY_FAILURE:
        case actionTypes.GET_RESTAURANT_CATEGORY_FAILURE:
        case actionTypes.SEARCH_RESTAURANT_FAILURE:
            return{
                ...state,
                loading:false,
                error:action.payload,

            }
        default:
            return state;
        
    }
}
export default restaurantReducer;