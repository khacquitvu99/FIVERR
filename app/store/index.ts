import { configureStore } from "@reduxjs/toolkit";
import jobReducer from "@/component/list-job/slice";
import jobDetailReducer from "@/component/detail-job/slice";         // Reducer chi tiết công việc
import jobDetailTypeReducer from "@/component/type-job/slice";      // Reducer loại công việc
import authReducer from "@/services/auth-slice";
import userReducer from "@/services/userSlice";

export const store = configureStore({
  reducer: {
    job: jobReducer,
    jobDetail: jobDetailReducer,
    jobDetailType: jobDetailTypeReducer, // Khai báo chính xác key jobDetailType
    auth: authReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;