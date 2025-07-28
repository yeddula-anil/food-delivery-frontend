import {
  UPDATE_ORDER_STATUS_REQUEST,
  UPDATE_ORDER_STATUS_SUCCESS,
  UPDATE_ORDER_STATUS_FAILURE,
   GET_RESTAURANT_ORDERS_REQUEST,
  GET_RESTAURANT_ORDERS_SUCCESS,
  GET_RESTAURANT_ORDERS_FAILURE
} from './ActionTypes';
import {api} from '../../config/api'
//update orders stauts
export const updateOrderStatus = ({ orderId, orderStatus, jwt }) => async (dispatch) => {
  dispatch({ type: UPDATE_ORDER_STATUS_REQUEST });

  try {
    const { data } = await api.put(
      `/api/admin/order/${orderId}/${orderStatus}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    dispatch({ type: UPDATE_ORDER_STATUS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_ORDER_STATUS_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};


//fetch restaurant orders
export const fetchRestaurantsOrder = (jwt) => {
  return async (dispatch) => {
    dispatch({ type: GET_RESTAURANT_ORDERS_REQUEST });

    try {
      const { data } = await api.get(`/api/admin/orders/restaurant`, {
       
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      });

      const orders = data;
      console.log("restaurants order ------ ", orders);

      dispatch({
        type: GET_RESTAURANT_ORDERS_SUCCESS,
        payload: orders
      });
      console.log("orders fetched successfully",orders)
    } catch (error) {
      console.error("Failed to fetch restaurant orders:", error);

      dispatch({
        type: GET_RESTAURANT_ORDERS_FAILURE,
        payload: error.response?.data?.message || error.message
      });
    }
  };
};
