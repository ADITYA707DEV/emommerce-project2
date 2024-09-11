import { combineReducers, configureStore}  from "@reduxjs/toolkit"
import { persistReducer, persistStore} from "redux-persist"
import storage from "redux-persist/lib/storage"
import idReducer from "./tokenSlice"
import cartReducer from "./cartSlice"
import cardTypeReducer from "./cardTypeSlice"
import itemReducer from "./itemSlice"
import userDataReducer from "./userDataSlice"
import filtersPriceReducer from "./filtersSlice"
import topItemsReducer from "./topItemsSlice"
import keeperDetailsReducer from "./keeperDetailsSlice"

const rootReducer = combineReducers({
    
    userToken: idReducer,
    userCart: cartReducer,
    userCardType: cardTypeReducer,
    userItem: itemReducer,
    userData:  userDataReducer,
    filtersPrice: filtersPriceReducer,
    topItems:topItemsReducer,
    keeperDetails: keeperDetailsReducer
})

const persistConfig = {
    key : "root",
    storage,
    version:1

}

const persistedReducer = persistReducer(persistConfig,rootReducer)
export const store = configureStore({

     
        reducer:persistedReducer,
       middleware: (getDefaultMiddleware)=>getDefaultMiddleware({
          serializableCheck: false,
        })
   
})

export const persistor = persistStore(store)
