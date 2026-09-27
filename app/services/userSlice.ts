import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInfo, UpdateUserPayload, ApiResponse, TInitialState } from "@/types";
import axiosClient from "@/services/api";

// Sửa type data thành UserInfo[] (Mảng người dùng)
const initialState: TInitialState<UserInfo[]> = {
  loading: false,
  data: [],
  error: null,
};

export class UserThunk {
  // 1. LẤY TOÀN BỘ DANH SÁCH USER (Để load lên Bảng Admin)
  static fetchUserList = createAsyncThunk<UserInfo[], void>(
    "user/fetchList",
    async (_, { rejectWithValue }) => {
      try {
        // Đúng endpoint lấy toàn bộ danh sách user của Backend Cybersoft / Fiverr
        const response = await axiosClient.get<ApiResponse<UserInfo[]>>("users");
        return response.data.content; 
      } catch (err: any) {
        return rejectWithValue(err.response?.data?.message || "Lỗi tải danh sách user");
      }
    }
  );

  // 2. CẬP NHẬT THÔNG TIN USER
  static updateUserProfile = createAsyncThunk<UserInfo, UpdateUserPayload>(
    "user/updateProfile",
    async (payload, { rejectWithValue }) => {
      try {
        const response = await axiosClient.put<ApiResponse<UserInfo>>(
          `users/${payload.id}`,
          payload
        );
        return response.data.content;
      } catch (err: any) {
        return rejectWithValue(err.response?.data?.message || "Lỗi cập nhật thông tin");
      }
    }
  );
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch List User
      .addCase(UserThunk.fetchUserList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UserThunk.fetchUserList.fulfilled, (state, action: PayloadAction<UserInfo[]>) => {
        state.loading = false;
        state.data = action.payload; // Gán mảng user thu được từ API
      })
      .addCase(UserThunk.fetchUserList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update User
      .addCase(UserThunk.updateUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(UserThunk.updateUserProfile.fulfilled, (state, action: PayloadAction<UserInfo>) => {
        state.loading = false;
        // Cập nhật lại user vừa sửa ngay trên mảng state local
        if (Array.isArray(state.data)) {
          state.data = state.data.map((u) => (u.id === action.payload.id ? action.payload : u));
        }
      })
      .addCase(UserThunk.updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default userSlice.reducer;