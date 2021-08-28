import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import { combineReducers } from "redux";
import accountManagementReducer from "./reducers/accountManagementReducer";
import shopDataReducer from "./reducers/shopReducer";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const reducers = combineReducers({
  user: userReducer,
  accountdata: accountManagementReducer,
  shopdata: shopDataReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
});

export default store;