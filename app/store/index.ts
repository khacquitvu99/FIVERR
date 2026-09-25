import { configureStore } from "@reduxjs/toolkit";
import jobReducer from "@/component/list-job/slice"; // File jobSlice đã chứa toàn bộ state
import jobDetailReducer from "@/component/detail-job/slice";
import authReducer from "@/services/auth-silce"; // File authSlice đã chứa toàn bộ state

export const store = configureStore({
  reducer: {
    job: jobReducer,
    jobDetail: jobDetailReducer,
    auth: authReducer,
    // Thêm các slice khác tại đây (ví dụ: user, v.v.)
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
