import {api} from '../../config/api'
import {
  FIND_CART_REQUEST,
  FIND_CART_SUCCESS,
  FIND_CART_FAILURE,
   ADD_ITEM_TO_CART_REQUEST,
  ADD_ITEM_TO_CART_SUCCESS,
  ADD_ITEM_TO_CART_FAILURE,
   UPDATE_CART_ITEM_REQUEST,
  UPDATE_CART_ITEM_SUCCESS,
  UPDATE_CART_ITEM_FAILURE,
  REMOVE_CART_ITEM_REQUEST,
  REMOVE_CART_ITEM_SUCCESS,
  REMOVE_CART_ITEM_FAILURE,
} from './ActionTypes';

export const findCart = (jwt) => async (dispatch) => {
  dispatch({ type: FIND_CART_REQUEST });

  try {
    const { data } = await api.get('/api/cart', {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    dispatch({ type: FIND_CART_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FIND_CART_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

//add item to cart
export const addItemToCart = (reqData) => async (dispatch) => {
  dispatch({ type: ADD_ITEM_TO_CART_REQUEST });

  try {
    const { data } = await api.put(
      '/api/cart/add',reqData.cartItem,
      
      {
        headers: {
          Authorization: `Bearer ${reqData.jwt}`,
        },
      }
    );

    dispatch({
      type: ADD_ITEM_TO_CART_SUCCESS,
      payload: data, // CartItem or full cart returned by backend
    });
  } catch (error) {
    dispatch({
      type: ADD_ITEM_TO_CART_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

//update cart item
export const updateCartItem = (reqData) => async (dispatch) => {
  dispatch({ type: UPDATE_CART_ITEM_REQUEST });

  try {
    const { data } = await api.put(
      '/api/cart-item/update',
      reqData.data,
      {
        headers: {
          Authorization: `Bearer ${reqData.jwt}`,
        },
      }
    );

    dispatch({ type: UPDATE_CART_ITEM_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_CART_ITEM_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

//delete cart item
export const removeCartItem = (cartItemId, jwt) => async (dispatch) => {
  dispatch({ type: REMOVE_CART_ITEM_REQUEST });

  try {
    const { data } = await api.delete(
      `/api/cart-item/${cartItemId}/remove`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    dispatch({
      type: REMOVE_CART_ITEM_SUCCESS,
      payload: cartItemId, 
    });
  } catch (error) {
    dispatch({
      type: REMOVE_CART_ITEM_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

//clear cart
export const clearCart = (jwt) => async (dispatch) => {
  dispatch({ type: CLEAR_CART_REQUEST });

  try {
    const { data } = await api.put(
      '/api/cart/clear',
      {},
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    dispatch({ type: CLEAR_CART_SUCCESS, payload: data }); // updated cart (likely empty)
  } catch (error) {
    dispatch({
      type: CLEAR_CART_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};