import { configureStore, combineReducers } from "@reduxjs/toolkit";
import credentialsReducer from "./reducers/credentialsSlice";
import storage from "redux-persist/lib/storage";
import userInfoReducer from "./reducers/userInfoSlice";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import menuReducer from "./reducers/menuSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["credentials", "user"],
  blacklist: ["menu"],
};

const rootReducer = combineReducers({
  credentials: credentialsReducer,
  menu: menuReducer,
  user: userInfoReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof rootReducer;
