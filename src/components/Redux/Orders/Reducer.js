import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILURE,
  GET_USER_ORDERS_REQUEST,
  GET_USER_ORDERS_SUCCESS,
  GET_USER_ORDERS_FAILURE,
} from './ActionTypes';

const initialState = {
  loading: false,
  error: null,
  orders: [],      // list of user's past orders
    // order just created
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
   
    case CREATE_ORDER_REQUEST:
    case GET_USER_ORDERS_REQUEST:
        return{
            ...state,
            loading:true,
            
        }
    case GET_USER_ORDERS_SUCCESS:
        return{
            ...state,
            error:null,
            loading:false,
            orders:action.payload
        }
    case GET_USER_ORDERS_FAILURE:
        return{
            ...state,
            error:payload,
            loading:false
        }
    default:
        return state;
  }
};

export default orderReducer;
