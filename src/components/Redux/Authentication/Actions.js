import axios from "axios";
import { ADD_TO_FAVORITES_REQUEST,ADD_TO_FAVORITES_SUCCESS,ADD_TO_FAVORITES_FAILURE, GET_USER_REQUEST, LOGIN_REQUEST, LOGIN_SUCCESS, REGISTER_REQUEST, REGISTER_SUCCESS,LOGOUT, REGISTER_FAILURE, LOGIN_FAILURE, GET_USER_FAILURE, GET_USER_SUCCESS} from "./ActionTypes";
import { API_URL,api } from "../../config/api";

import { display } from "@mui/system";
export const registerUser = ({ userData, navigate }) => async (dispatch) => {
  dispatch({ type: "SIGNUP_REQUEST" });

  try {
    const res = await api.post("/auth/signup", userData); // or /api/signup based on your backend
    const { jwt, message, role } = res.data;

    if (jwt) {
      localStorage.setItem("jwt", jwt); // optional, if you want to persist it

      dispatch({ type: "REGISTER_SUCCESS", payload: { message, jwt, role } });

      if(role==="ROLE_OWNER")
          navigate("/admin");
      else 
          navigate("/")
    } else {
      dispatch({ type: "REGISTER_FAILURE", payload: message || "Signup failed" });
    }
  } catch (error) {
    dispatch({
      type: "REGISTER_FAILURE",
      payload: error.response?.data?.message || "Something went wrong",
    });
    if (error.response && error.response.status === 409) {
        alert("Email already exists. Please use another email.");
    } else {
        alert("Something went wrong. Please try again.");
    }
    console.error("Signup Error:", error);
  }
};
export const loginUser = ({ loginData, navigate }) => async (dispatch) => {
  dispatch({ type: "LOGIN_REQUEST" });

  try {
    const res = await api.post("/auth/signin", loginData);
    const { jwt, role, message } = res.data;

    if (jwt) {
      localStorage.setItem("jwt", jwt);
      dispatch({ type: "LOGIN_SUCCESS", payload: { jwt, role } });

      // dispatch(getUser(jwt)); // Optional
      if(role==="RESTAURANT_OWNER")
          navigate("/admin");
      else 
          navigate("/")
    } else {
      dispatch({ type: "LOGIN_FAILURE", payload: message || "Login failed" });
    }
  } catch (error) {
    dispatch({
      type: "LOGIN_FAILURE",
      payload: error.response?.data?.message || "Login error",
    });
    console.error("Login error:", error);
  }
};


export const getUser = (jwt) => async (dispatch) => {
  dispatch({ type: "GET_USER_REQUEST" });


  try {
    const { data } = await api.get("/api/users/profile", {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    console.log(data)

    dispatch({ type: "GET_USER_SUCCESS", payload: data });
   
  } catch (error) {
    dispatch({ type: "GET_USER_FAILURE", payload: error.message });
    console.error("User fetch error:", error);
  }
};




export const addToFavorite = (jwt, restaurantId) => async (dispatch) => {
    
    dispatch({ type: ADD_TO_FAVORITES_REQUEST });

    try {
      
  
      const { data } = await api.put(
        `/api/restaurant/${restaurantId}/add-to-favorites`,
        {}, // empty body for PUT
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
  
      dispatch({ type: ADD_TO_FAVORITES_SUCCESS, payload: data });
      console.log("successfully added to favorites");
      
    } catch (error) {
         dispatch({ type: ADD_TO_FAVORITES_FAILURE, payload: error});
         console.log("error while adding to favorites", error);
      
      
    }
};



export const logoutUser = () => (dispatch) => {
    // Remove token from localStorage
    localStorage.clear();
  
    if(localStorage.getItem("jwt")==null){
        console.log("no jwt");
    }
    dispatch({ type: LOGOUT });
};
  