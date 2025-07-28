import * as actionTypes from './ActionTypes'
const initialState={
    loading:false,
    error:null,
    orders:[]
}

const restaurantOrderReducer=(state=initialState,action)=>{
    switch(action.type){
        case actionTypes.GET_RESTAURANT_ORDERS_REQUEST:
        case actionTypes.UPDATE_ORDER_STATUS_REQUEST:
            return{
                ...state,
                loading:true,
                error:null
            }
        case actionTypes.GET_RESTAURANT_ORDERS_SUCCESS:
            return{
                ...state,
                loading:false,
                orders:[...action.payload]
            }
        case actionTypes.UPDATE_ORDER_STATUS_SUCCESS:{
             const updatedOrders=state.orders.map((order)=>order.id===action.payload.id?action.payload:order)
            return{
                ...state,
                loading:false,
                orders:updatedOrders
            }
        }
        case actionTypes.GET_RESTAURANT_ORDERS_FAILURE:
        case actionTypes.UPDATE_ORDER_STATUS_FAILURE:
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        default:
            return state;
    }
}
export default restaurantOrderReducer