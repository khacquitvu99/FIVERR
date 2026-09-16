import { configureStore } from "@reduxjs/toolkit";
import jobReducer from "@/component/list-job/slice";

export const store = configureStore({
  reducer: {
    job: jobReducer,
    // Thêm các slice khác tại đây (ví dụ: auth, user, v.v.)
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Tránh lỗi warning serialization nếu có
    }),
});

// RootState và AppDispatch dùng để định nghĩa Type chuẩn cho Redux
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;