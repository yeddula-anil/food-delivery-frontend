import {
  CREATE_MENU_ITEMS_REQUEST,
  CREATE_MENU_ITEMS_SUCCESS,
  CREATE_MENU_ITEMS_FAILURE,
  GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST,

  GET_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS,
  GET_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE,
   SEARCH_MENU_ITEM_REQUEST,
  SEARCH_MENU_ITEM_SUCCESS,
  SEARCH_MENU_ITEM_FAILURE,
   UPDATE_MENU_ITEMS_AVAILABILITY_REQUEST,
  UPDATE_MENU_ITEMS_AVAILABILITY_SUCCESS,
  UPDATE_MENU_ITEMS_AVAILABILITY_FAILURE,
  DELETE_MENU_ITEM_REQUEST,
  DELETE_MENU_ITEM_SUCCESS,
  DELETE_MENU_ITEM_FAILURE,
} from './ActionTypes';

import { api } from '../../config/api';
//create menu item
export const createMenuItem = ({menu, jwt}) => async (dispatch) => {
  dispatch({ type: CREATE_MENU_ITEMS_REQUEST });

  try {
    const { data } = await api.post("/api/admin/food", menu, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    dispatch({ type: CREATE_MENU_ITEMS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_MENU_ITEMS_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

//get menu item by restaurant id
export const getMenuItemByRestaurantId = (reqData) => async (dispatch) => {
  dispatch({ type: GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST });

  try {
    const { data } = await api.get(
      `/api/food/restaurant/${reqData.restaurantId}?vegetarian=${reqData.vegetarian}&seasonal=${reqData.seasonal}&nonveg=${reqData.nonveg}&foodCategory=${reqData.foodCategory}`,
      {
        headers: {
          Authorization: `Bearer ${reqData.jwt}`,
        },
      }
    );

    dispatch({
      type: GET_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

//search menu item
export const searchMenuItem = ({keyword,jwt})=> async (dispatch) => {
  dispatch({ type: SEARCH_MENU_ITEM_REQUEST });

  try {
    const { data } = await api.get(`/api/food/search?name=${keyword}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    dispatch({
      type: SEARCH_MENU_ITEM_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SEARCH_MENU_ITEM_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

//update menu item availability
export const updateMenuItemAvailability = ({foodId,jwt})=> async (dispatch) => {
  dispatch({ type: UPDATE_MENU_ITEMS_AVAILABILITY_REQUEST });

  try {
    const { data } = await api.put(
      `/api/admin/food/${foodId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    dispatch({
      type: UPDATE_MENU_ITEMS_AVAILABILITY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_MENU_ITEMS_AVAILABILITY_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

//delete food item

export const deleteFood = ({ foodId, jwt }) => async (dispatch) => {
  dispatch({ type: DELETE_MENU_ITEM_REQUEST });

  try {
    const { data } = await api.delete(`/api/admin/food/${foodId}`,{
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    dispatch({
      type: DELETE_MENU_ITEM_SUCCESS,
      payload: foodId,
    });
  } catch (error) {
    dispatch({
      type: DELETE_MENU_ITEM_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};