import { __DO_NOT_USE__ActionTypes } from 'redux';
import { api } from '../../config/api';
import {
  GET_ALL_RESTAURANT_REQUEST,
  GET_ALL_RESTAURANT_SUCCESS,
  GET_ALL_RESTAURANT_FAILURE,
  GET_RESTAURANT_BY_ID_REQUEST,
  GET_RESTAURANT_BY_ID_SUCCESS,
  GET_RESTAURANT_BY_ID_FAILURE,
  GET_RESTAURANT_BY_USER_ID_REQUEST,
  GET_RESTAURANT_BY_USER_ID_SUCCESS,
  GET_RESTAURANT_BY_USER_ID_FAILURE,
  CREATE_RESTAURANT_REQUEST,
  CREATE_RESTAURANT_SUCCESS,
  CREATE_RESTAURANT_FAILURE,
  UPDATE_RESTAURANT_REQUEST,
  UPDATE_RESTAURANT_SUCCESS,
  UPDATE_RESTAURANT_FAILURE,
   DELETE_RESTAURANT_REQUEST,
  DELETE_RESTAURANT_SUCCESS,
  DELETE_RESTAURANT_FAILURE,
  UPDATE_RESTAURANT_STATUS_REQUEST,
  UPDATE_RESTAURANT_STATUS_SUCCESS,
  UPDATE_RESTAURANT_STATUS_FAILURE,
  CREATE_EVENTS_REQUEST,
  CREATE_EVENTS_SUCCESS,
  CREATE_EVENTS_FAILURE,
   CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_SUCCESS,
  CREATE_CATEGORY_FAILURE,
  GET_RESTAURANT_CATEGORY_REQUEST,
  GET_RESTAURANT_CATEGORY_SUCCESS,
  GET_RESTAURANT_CATEGORY_FAILURE,
} from './ActionTypes';

export const getAllRestaurants = (token) => async (dispatch) => {
  dispatch({ type: GET_ALL_RESTAURANT_REQUEST });

  try {
    const { data } = await api.get("/api/restaurant/all-restaurants", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: GET_ALL_RESTAURANT_SUCCESS, payload: data });
    console.log("All restaurants:", data);
  } catch (error) {
    console.log("Error while fetching restaurants", error);
    dispatch({ type: GET_ALL_RESTAURANT_FAILURE, payload: error.response?.data || error.message });
  }
};


export const getRestaurantById = ({jwt,restaurantId}) => async (dispatch) => {
  dispatch({ type: GET_RESTAURANT_BY_ID_REQUEST });

  try {
    const { data } = await api.get(`/api/restaurant/${restaurantId}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    dispatch({ type: GET_RESTAURANT_BY_ID_SUCCESS, payload: data }); // use data or data.data based on your backend
  } catch (error) {
    console.error("Error fetching restaurant by ID", error);
    dispatch({
      type: GET_RESTAURANT_BY_ID_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};


export const getRestaurantByUserId = (jwt) => async (dispatch) => {
  dispatch({ type: GET_RESTAURANT_BY_USER_ID_REQUEST });

  try {
    const { data } = await api.get("/api/admin/restaurant/user", {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    dispatch({ type: GET_RESTAURANT_BY_USER_ID_SUCCESS, payload: data });
    console.log("restaurant object",data)
  } catch (error) {
    dispatch({
      type: GET_RESTAURANT_BY_USER_ID_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const createRestaurant = (reqData) => async (dispatch) => {
  dispatch({ type: CREATE_RESTAURANT_REQUEST });

  try {
    const { data } = await api.post(
      "/api/admin/restaurant",
      reqData.body,             
      {
        headers: {
          Authorization: `Bearer ${reqData.jwt}`,
        },
      }
    );

    dispatch({ type: CREATE_RESTAURANT_SUCCESS, payload: data });
    console.log('resturant created successfully',data)
  } catch (error) {
    dispatch({
      type: CREATE_RESTAURANT_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};


export const updateRestaurant = ({restaurantId,restaurantData,jwt}) => async (dispatch) => {
  dispatch({ type: UPDATE_RESTAURANT_REQUEST });

  try {
    const { data } = await api.put(
      `/api/admin/restaurant/${restaurantId}`, // Assuming ID is passed in reqData
      restaurantData,                          // Restaurant update fields
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    dispatch({ type: UPDATE_RESTAURANT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_RESTAURANT_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const deleteRestaurant = ({restaurantId, jwt}) => async (dispatch) => {
  dispatch({ type: DELETE_RESTAURANT_REQUEST });

  try {
    const { data } = await api.delete(`/api/admin/restaurant/${restaurantId}/delete`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    dispatch({ type: DELETE_RESTAURANT_SUCCESS, payload: restaurantId });
    
  } catch (error) {
    dispatch({
      type: DELETE_RESTAURANT_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const updateRestaurantStatus = ({restaurantId, jwt}) => async (dispatch) => {
  dispatch({ type: UPDATE_RESTAURANT_STATUS_REQUEST });

  try {
    const { data } = await api.put(
      `/api/admin/restaurant/${restaurantId}/status`,
      {}, // No body needed
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    dispatch({ type: UPDATE_RESTAURANT_STATUS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_RESTAURANT_STATUS_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const createEvent = ({data, jwt, restaurantId}) => async (dispatch) => {
  dispatch({ type: CREATE_EVENTS_REQUEST });

  try {
    const response = await api.post(
      `/api/admin/events/${restaurantId}`, // ✅ path variable
      data,                                // ✅ event body
      {
        headers: {
          Authorization: `Bearer ${jwt}`,  // ✅ token header
        },
      }
    );

    dispatch({ type: CREATE_EVENTS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: CREATE_EVENTS_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};
//event actions not completed

//category actions
export const createCategory = ({category, jwt}) => async (dispatch) => {
  dispatch({ type: CREATE_CATEGORY_REQUEST });

  try {
    const { data } = await api.post(
      "/api/admin/category",
      {category},
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
          
        },
      }
    );

    dispatch({ type: CREATE_CATEGORY_SUCCESS, payload: data });
    console.log("category successfully created",data)
  } catch (error) {
    dispatch({
      type: CREATE_CATEGORY_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
    console.log("error while adding category")
  }
};


export const getRestaurantCategories = ({jwt,restaurantId}) => async (dispatch) => {
  dispatch({ type: GET_RESTAURANT_CATEGORY_REQUEST });

  try {
    const { data } = await api.get(`/api/category/restaurant/${restaurantId}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    dispatch({ type: GET_RESTAURANT_CATEGORY_SUCCESS, payload: data });
    console.log("categories feched successfully",data);
  } catch (error) {
    dispatch({
      type: GET_RESTAURANT_CATEGORY_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
    console.log("error while fetching categories")
  }
};