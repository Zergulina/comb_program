import { configureStore } from "@reduxjs/toolkit";
import reducer from "./rootReducer";
export default configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});
