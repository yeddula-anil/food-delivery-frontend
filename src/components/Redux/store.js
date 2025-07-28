import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import authReducer from "./Authentication/Reducer";
import { thunk } from 'redux-thunk';
import restaurantReducer from "./Restaurant/Reducer";
import  menuItemReducer  from "./Menu/Reducer";
import cartReducer from "./Cart/Reducer";
import orderReducer from "./Orders/Reducer";
import restaurantOrderReducer from "./RestaurantOrders/Reducer";
import ingredientsReducer from "./Ingredients/Reducer";
import  revenueReducer  from "./Revenue/Reducer";



const rootReducer=combineReducers({
    auth:authReducer,
    restaurant:restaurantReducer,
    menu:menuItemReducer,
    cart:cartReducer,
    order:orderReducer,
    restaurantOrders:restaurantOrderReducer,
    ingredients:ingredientsReducer,
    revenue:revenueReducer
})
export const store=legacy_createStore(rootReducer,applyMiddleware(thunk));