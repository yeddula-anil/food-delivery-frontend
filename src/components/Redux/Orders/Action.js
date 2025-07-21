import {api} from '../../config/api'
import {  
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILURE,
  GET_USER_ORDERS_REQUEST,
  GET_USER_ORDERS_SUCCESS,
  GET_USER_ORDERS_FAILURE
 } from './ActionTypes'

//create order
export const createOrder = (reqData) => async (dispatch) => {
  dispatch({ type: CREATE_ORDER_REQUEST });

  try {
    const { data } = await api.post(
      '/api/order',
      reqData.order,
      {
        headers: {
          Authorization: `Bearer ${reqData.jwt}`,
        },
      }
    );

    dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
    console.log("order created successfully",data)
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

//get user orders
export const getUserOrders = (jwt) => async (dispatch) => {
  dispatch({ type: GET_USER_ORDERS_REQUEST });

  try {
    const { data } = await api.get('/api/order/user', {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    dispatch({ type: GET_USER_ORDERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_USER_ORDERS_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};