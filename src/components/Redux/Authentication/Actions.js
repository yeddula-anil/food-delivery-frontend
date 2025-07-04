import axios from "axios";
import { ADD_TO_FAVORITES_REQUEST, GET_USER_REQUEST, LOGIN_REQUEST, LOGIN_SUCCESS, REGISTER_REQUEST, REGISTER_SUCCESS,LOGOUT} from "./ActionTypes";
import { API_URL } from "../../config/api";
import { display } from "@mui/system";
export const registerUser=(reqData)=>async(dispatch)=>{
    dispatch({type:REGISTER_REQUEST})
    try{
        const {data}=await axios.post(`${API_URL}auth/signup`,reqData.userData)
        if(data.jwt)localStorage.setItem("jwt",data.jwt);
        if(data.role==="ROLE_RESTAURANT_OWNER"){
            reqData.navigate("/admin/restaurant")
        }
        else{
            reqData.navigate("/")
        }
        dispatch({type:REGISTER_SUCCESS,payload:data.jwt})
        console.log("register success",data)
    }
    catch(error){
        console.log(error)
    }
}

export const loginUser=(reqData)=>async(dispatch)=>{
    dispatch({type:LOGIN_REQUEST})
    try{
        const {data}=await axios.post(`${API_URL}auth/signin`,reqData.userData)
        if(data.jwt)localStorage.setItem("jwt",data.jwt);
        if(data.role==="ROLE_RESTAURANT_OWNER"){
            reqData.navigate("/admin/restaurant")
        }
        else{
            reqData.navigate("/")
        }
        dispatch({type:LOGIN_SUCCESS,payload:data.jwt})
        console.log("login success",data)
    }
    catch(error){
        console.log(error)
    }
}

export const getUser=(jwt)=>async(dipatch)=>{
    dispatch({type:GET_USER_REQUEST})
    try{
        const {data}=await api.post(/auth/signin,{
            headers:{
                Authorization:`Bearer ${jwt}`
            }
        })
        dispatch({type:LOGIN_SUCCESS,payload:data})
        console.log("userprofile",data);
    }
    catch(error){
        console.log("error",error)
    }
}


export const addToFavorite = (jwt, restaurantId) => async (dispatch) => {
    try {
      dispatch({ type: ADD_TO_FAVORITES_REQUEST });
  
      const { data } = await api.put(
        `/api/restaurants/${restaurantId}/add-to-favorite`,
        {}, // empty body for PUT
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
  
      dispatch({ type: ADD_TO_FAVORITES_SUCCESS, payload: data });
      console.log("added to favorites", data);
    } catch (error) {
      console.log("error", error);
      // Optional: handle error
      // dispatch({ type: ADD_TO_FAVORITES_FAILURE, payload: error.message });
    }
};



export const logoutUser = () => (dispatch) => {
    // Remove token from localStorage
    localStorage.removeItem("jwt");
  
    // Dispatch LOGOUT to reset Redux state
    dispatch({ type: LOGOUT });
};
  