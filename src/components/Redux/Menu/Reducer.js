
import * as actiontypes from './ActionTypes'
const initialState={
    menuItems:[],
    loading:false,
    error:null,
    search:[],
    message:null
}

const menuItemReducer=(state=initialState,action)=>{
    switch(action.type){
        case actiontypes.CREATE_MENU_ITEM_REQUEST:
        case actiontypes.GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST:
        case actiontypes.DELETE_MENU_ITEM_REQUEST:
        case actiontypes.SEARCH_MENU_ITEM_REQUEST:
        case actiontypes.UPDATE_MENU_ITEMS_AVAILABILITY_REQUEST:
            return{
                ...state,
                loading:true,
                error:null,
                message:null
            }
        case actiontypes.CREATE_MENU_ITEM_SUCCESS:
            return{
                ...state,
                loading:false,
                menuItems:[...state.menuItems,action.payload],
                message:"food created successfully"
            }
        case actiontypes.GET_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS:
            return{
                ...state,
                loading:false,
                menuItems:action.payload
            }
        case actiontypes.DELETE_MENU_ITEM_SUCCESS:
            return{
                ...state,
                loading:false,
                menuItems:state.menuItems.filter((item)=>item.id!==action.payload)
            }
        case actiontypes.UPDATE_MENU_ITEMS_AVAILABILITY_SUCCESS:
            console.log("updated items id",action.payload.id)
            return{
                ...state,
                loading:false,
                menuItems:state.menuItems.map((item)=>item.id===action.payload.id?actio.payload:item)

            }
        case actiontypes.SEARCH_MENU_ITEM_SUCCESS:
            return{
                ...state,
                loading:false,
                menuItems:action.payload
            }
        case actiontypes.CREATE_MENU_ITEM_FAILURE:
        case actiontypes.GET_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE:
        case actiontypes.DELETE_MENU_ITEM_FAILURE:
        case actiontypes.SEARCH_MENU_ITEM_FAILURE:
        case actiontypes.UPDATE_MENU_ITEMS_AVAILABILITY_FAILURE:
            return{
                ...state,
                loading:false,
                error:action.payload,
                message:null
            }
        default:
            return state;

            
    }
}
export default menuItemReducer