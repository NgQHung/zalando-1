import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import actionSlice from "./action-slice";
import homeSlice from "./home-slice";
import productSlice from "./product-slice";
import UISlice from "./UI-slice";

export const store = configureStore({
  reducer: {
    productSlice: productSlice,
    UISlice: UISlice,
    homeSlice: homeSlice,
    actionSlice: actionSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  // [thunkMiddleware]
});
applyMiddleware(thunk);

export type RootState = ReturnType<typeof store.getState>;
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
// export declare const useDispatch: <
//     AppDispatch extends Dispatch<AnyAction> = Dispatch<AnyAction>
// >() => AppDispatch;

export default store;