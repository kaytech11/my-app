


// src/redux/store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import ecommerceReducer from "../features/ecommerceSlice"; // ✅ use default export
import {FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER,} from "redux-persist";
import authReducer from "../features/authSlice"; // ✅ use default export


// 1️⃣ Combine reducers (even if you only have one slice now)
const rootReducer = combineReducers({
  ecommerce: ecommerceReducer,
  auth: authReducer,
  
});

// 2️⃣ Wrap the root reducer with persistReducer
const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// 3️⃣ Create store with proper middleware
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// 4️⃣ Persistor
export const persistor = persistStore(store);





