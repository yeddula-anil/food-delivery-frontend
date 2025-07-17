import {
  UPDATE_ORDER_STATUS_REQUEST,
  UPDATE_ORDER_STATUS_SUCCESS,
  UPDATE_ORDER_STATUS_FAILURE,
   GET_RESTAURANTS_ORDER_REQUEST,
  GET_RESTAURANTS_ORDER_SUCCESS,
  GET_RESTAURANTS_ORDER_FAILURE
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
export const fetchRestaurantsOrder = ({ restaurantId, orderStatus, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: GET_RESTAURANTS_ORDER_REQUEST });

    try {
      const { data } = await api.get(`/api/admin/order/restaurant/${restaurantId}`, {
        params: { order_status: orderStatus },
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      });

      const orders = data;
      console.log("restaurants order ------ ", orders);

      dispatch({
        type: GET_RESTAURANTS_ORDER_SUCCESS,
        payload: orders
      });
    } catch (error) {
      console.error("Failed to fetch restaurant orders:", error);

      dispatch({
        type: GET_RESTAURANTS_ORDER_FAILURE,
        payload: error.response?.data?.message || error.message
      });
    }
  };
};
