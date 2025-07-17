import {api} from '../../config/api'
import { 
  GET_INGREDIENT_CATEGORIES_REQUEST,
  GET_INGREDIENT_CATEGORIES_SUCCESS,
  GET_INGREDIENT_CATEGORIES_FAILURE,
  CREATE_INGREDIENT_CATEGORY_REQUEST,
  CREATE_INGREDIENT_CATEGORY_SUCCESS,
  CREATE_INGREDIENT_CATEGORY_FAILURE,
  CREATE_INGREDIENT_REQUEST,
  CREATE_INGREDIENT_SUCCESS,
  CREATE_INGREDIENT_FAILURE,
  UPDATE_STOCK,
  GET_INGREDIENTS


 } from './ActionTypes';

 //get ingredients categories
 
export const getIngredientCategories = ({ id,jwt }) => async (dispatch) => {
  dispatch({ type: GET_INGREDIENT_CATEGORIES_REQUEST });

  try {
    const { data } = await api.get(
      `/api/admin/ingredients/restaurant/${restaurantId}/category`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    dispatch({ type: GET_INGREDIENT_CATEGORIES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_INGREDIENT_CATEGORIES_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

//create ingredients 
export const createIngredient = ({ data, jwt }) => async (dispatch) => {
  dispatch({ type: CREATE_INGREDIENT_REQUEST });

  try {
    const response = await api.post(
      '/api/admin/ingredients',
      data,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    dispatch({ type: CREATE_INGREDIENT_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: CREATE_INGREDIENT_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

//update stock of resturant
export const updateIngredientStock = ({ id, jwt }) => async (dispatch) => {
  try {
    await api.put(
      `/api/admin/ingredients/${id}/stock`,
      {},
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    console.log("Stock updated successfully");
  } catch (error) {
    console.error("Error updating stock:", error.response?.data?.message || error.message);
  }
};

//create ingredients category
export const createIngredientCategory = ({ jwt, data }) => async (dispatch) => {
  dispatch({ type: CREATE_INGREDIENT_CATEGORY_REQUEST });

  try {
    const response = await api.post(
      '/api/admin/ingredients/category',
      data, 
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    dispatch({ type: CREATE_INGREDIENT_CATEGORY_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: CREATE_INGREDIENT_CATEGORY_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

//get ingredients of restuarant
export const getIngredients = ({ jwt, restaurantId }) => async (dispatch) => {
  try {
    const { data } = await api.get(
      `/api/admin/ingredients/restaurant/${restaurantId}`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    dispatch({ type: "GET_INGREDIENTS", payload: data });
  } catch (error) {
    console.error("Error fetching ingredients:", error.response?.data?.message || error.message);
  }
};



