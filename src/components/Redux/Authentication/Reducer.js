import {
    ADD_TO_FAVORITES_REQUEST,
    ADD_TO_FAVORITES_SUCCESS,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    LOGOUT,
    ADD_TO_FAVORITES_FAILURE
  } from "./ActionTypes";
  
  import { isPresentInFavorites } from "../../config/logic";
  
  const initialState = {
    user: null,
    isLoading: false,
    error: null,
    jwt: localStorage.getItem("jwt") || null,
    favorites: [],
    success: null,
    isAuthenticated: !!localStorage.getItem("jwt")
  };
  
const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case REGISTER_REQUEST:
      case LOGIN_REQUEST:
      case GET_USER_REQUEST:
      case ADD_TO_FAVORITES_REQUEST:
        return { ...state, isLoading: true, error: null, success: null };
  
      case REGISTER_SUCCESS:
      case LOGIN_SUCCESS:
        return {
          ...state,
          isLoading: false,
          jwt: action.payload,
          isAuthenticated: true,
          success: "Authentication success",
          error: null
        };
  
      case REGISTER_FAILURE:
      case LOGIN_FAILURE:
      case GET_USER_FAILURE:
      case ADD_TO_FAVORITES_FAILURE:
        return {
          ...state,
          isLoading: false,
          error: action.payload,
          success: null
        };
  
      case GET_USER_SUCCESS:
        return {
          ...state,
          isLoading: false,
          user: {
                ...action.payload,
                favorites: Array.isArray(action.payload.favorites) ? action.payload.favorites : []
          },
          success: "User loaded",
          error: null,
          favorites:  Array.isArray(action.payload.favorites) ? action.payload.favorites : []
        };

        case ADD_TO_FAVORITES_SUCCESS: {
          const alreadyExists = isPresentInFavorites(state.favorites, action.payload?.restaurantId);

          const updatedFavorites = alreadyExists
          ? state.favorites.filter(
              (item) => item.restaurantId !== action.payload.restaurantId
            )
          : [action.payload, ...state.favorites];

          return {
            ...state,
            isLoading: false,
            error: null,
            favorites: updatedFavorites,
            user: {
              ...state.user,
              favorites: updatedFavorites
           },
            success: alreadyExists ? "Removed from favorites" : "Added to favorites"
        };
      }

  
      case LOGOUT:
        return {
          ...initialState,
          jwt: null,
          isAuthenticated: false
        };
  
      default:
        return state;
    }
};
  
export default authReducer;
  