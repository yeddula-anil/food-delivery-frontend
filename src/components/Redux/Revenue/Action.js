// revenueActions.js
import axios from 'axios';
import {
  GET_REVENUE_MONTHLY_REQUEST,
  GET_REVENUE_MONTHLY_SUCCESS,
  GET_REVENUE_MONTHLY_FAILURE,
  GET_REVENUE_CATEGORY_REQUEST,
  GET_REVENUE_CATEGORY_SUCCESS,
  GET_REVENUE_CATEGORY_FAILURE,
} from './ActionTypes';
import {api} from '../../config/api'

// Replace with your backend endpoint


export const getRevenueMonthly = (jwt) => async (dispatch) => {
  dispatch({ type: GET_REVENUE_MONTHLY_REQUEST });
  try {
    const { data } = await api.get(`api/admin/revenue/monthly`,{
        headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
       
    );
    dispatch({ type: GET_REVENUE_MONTHLY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_REVENUE_MONTHLY_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const getRevenueByCategoryWise = (jwt) => async (dispatch) => {
  dispatch({ type: GET_REVENUE_CATEGORY_REQUEST });
  try {
    const { data } = await api.get("api/admin/restaurant/category-revenue",{
        headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
    dispatch({ type: GET_REVENUE_CATEGORY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_REVENUE_CATEGORY_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};
