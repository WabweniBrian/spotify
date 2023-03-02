import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "../features/dataSlice";
import uiReducer from "../features/uiSlice";
import userReducer from "../features/authSlice";

export default configureStore({
  reducer: {
    ui: uiReducer,
    data: dataReducer,
    user: userReducer,
  },
});
