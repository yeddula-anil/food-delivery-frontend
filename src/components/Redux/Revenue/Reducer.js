// revenueReducer.js
import {
  GET_REVENUE_MONTHLY_REQUEST,
  GET_REVENUE_MONTHLY_SUCCESS,
  GET_REVENUE_MONTHLY_FAILURE,
  GET_REVENUE_CATEGORY_REQUEST,
  GET_REVENUE_CATEGORY_SUCCESS,
  GET_REVENUE_CATEGORY_FAILURE,
} from './ActionTypes';

const initialState = {
  monthly: {
    loading: false,
    data: [],
    error: null,
  },
  categoryWise: {
    loading: false,
    data: [],
    error: null,
  },
};

export const revenueReducer = (state = initialState, action) => {
  switch (action.type) {
    // Monthly Revenue
    case GET_REVENUE_MONTHLY_REQUEST:
      return {
        ...state,
        monthly: { loading: true, data: [], error: null },
      };
    case GET_REVENUE_MONTHLY_SUCCESS:
      return {
        ...state,
        monthly: { loading: false, data: action.payload, error: null },
      };
    case GET_REVENUE_MONTHLY_FAILURE:
      return {
        ...state,
        monthly: { loading: false, data: [], error: action.payload },
      };

    // Category-wise Revenue
    case GET_REVENUE_CATEGORY_REQUEST:
      return {
        ...state,
        categoryWise: { loading: true, data: [], error: null },
      };
    case GET_REVENUE_CATEGORY_SUCCESS:
      return {
        ...state,
        categoryWise: { loading: false, data: action.payload, error: null },
      };
    case GET_REVENUE_CATEGORY_FAILURE:
      return {
        ...state,
        categoryWise: { loading: false, data: [], error: action.payload },
      };

    default:
      return state;
  }
};
export default revenueReducer;
