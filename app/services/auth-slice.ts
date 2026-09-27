import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "@/services/api";
import type {
  AuthUser,
  AuthState,
  LoginPayload,
  RegisterPayload,
  UpdateUserPayload,
} from "@/types";

// --- HELPERS QUẢN LÝ LOCALSTORAGE --- //
const getStorage = <T>(key: string): T | null => {
  if (typeof window === "undefined") return null;
  try {
    const item = localStorage.getItem(key);
    return item ? (key === "user" ? JSON.parse(item) : (item as T)) : null;
  } catch {
    return null;
  }
};

const setStorage = (user: AuthUser | null, token?: string) => {
  if (typeof window === "undefined") return;

  if (user) {
    const existing = localStorage.getItem("user");
    if (existing) {
      try {
        const parsed = JSON.parse(existing);
        // Nếu localStorage đang lưu dạng lồng { user: { ... }, token: ... }
        if (parsed && typeof parsed === "object" && "user" in parsed) {
          localStorage.setItem(
            "user",
            JSON.stringify({
              ...parsed,
              user: { ...parsed.user, ...user },
            })
          );
        } else {
          // Nếu localStorage đang lưu phẳng dạng { id: ..., name: ... }
          localStorage.setItem(
            "user",
            JSON.stringify({ ...parsed, ...user })
          );
        }
      } catch {
        localStorage.setItem("user", JSON.stringify(user));
      }
    } else {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }

  if (token) {
    localStorage.setItem("userToken", token);
  }
};

// --- ASYNC THUNKS --- //

// 1. Đăng nhập
export const login = createAsyncThunk<
  { user: AuthUser; token: string },
  LoginPayload,
  { rejectValue: string }
>("auth/login", async (payload, { rejectWithValue }) => {
  try {
    const res = await api.post("auth/signin", payload);
    const { accessToken, ...user } = res.data.content || res.data;
    const token = accessToken || res.data.content?.token;

    setStorage(user, token);
    return { user, token };
  } catch (err: any) {
    return rejectWithValue(
      err?.response?.data?.content ||
        err?.response?.data ||
        "Đăng nhập thất bại.",
    );
  }
});

// 2. Đăng ký
export const register = createAsyncThunk<
  void,
  RegisterPayload,
  { rejectValue: string }
>("auth/register", async (payload, { rejectWithValue }) => {
  try {
    await api.post("auth/signup", payload);
  } catch (err: any) {
    return rejectWithValue(
      err?.response?.data?.content ||
        err?.response?.data ||
        "Đăng ký thất bại.",
    );
  }
});

// 3. Lấy thông tin người dùng theo ID
export const fetchUserById = createAsyncThunk<
  AuthUser,
  number | string,
  { rejectValue: string }
>("auth/fetchUserById", async (userId, { rejectWithValue }) => {
  try {
    const res = await api.get(`users/${userId}`);
    return res.data.content || res.data;
  } catch (err: any) {
    return rejectWithValue(
      err?.response?.data?.content || "Lấy thông tin người dùng thất bại.",
    );
  }
});

// 4. Cập nhật thông tin người dùng
export const updateUserProfile = createAsyncThunk<
  AuthUser,
  UpdateUserPayload,
  { rejectValue: string }
>("auth/updateUserProfile", async (payload, { rejectWithValue }) => {
  try {
    const response = await api.put(`users/${payload.id}`, payload);
    
    // Đảm bảo lấy đúng data trả về bất kể API bọc trong content hay trả thẳng object
    return response.data?.content ?? response.data;
  } catch (error: any) {
    // Ưu tiên lấy message từ response API nếu có
    const errorMessage =
      error.response?.data?.message ||
      error.response?.data?.content ||
      "Cập nhật thông tin thất bại!";

    return rejectWithValue(errorMessage);
  }
});

// 5. Upload Avatar
export const uploadAvatar = createAsyncThunk<
  AuthUser,
  File,
  { rejectValue: string }
>("auth/uploadAvatar", async (file, { rejectWithValue }) => {
  try {
    const formData = new FormData();
    formData.append("formFile", file);
    const res = await api.post("users/upload-avatar", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data.content || res.data;
  } catch (err: any) {
    return rejectWithValue(
      err?.response?.data?.content || "Upload avatar thất bại.",
    );
  }
});

// --- INITIAL STATE --- //
const initialState: AuthState = {
  user: getStorage<AuthUser>("user"),
  token: getStorage<string>("userToken"),
  loading: false,
  error: null,
};

// --- SLICE --- //
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("userToken");
        localStorage.removeItem("user");
      }
    },
    clearAuthError: (state) => {
      state.error = null;
    },
    setUser: (state, action: PayloadAction<AuthUser>) => {
      state.user = action.payload;
      setStorage(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // FULFILLED CASES
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        setStorage(action.payload);
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = state.user
          ? { ...state.user, ...action.payload }
          : action.payload;
        setStorage(state.user);
      })
      .addCase(uploadAvatar.fulfilled, (state, action) => {
        state.loading = false;
        state.user = state.user
          ? { ...state.user, ...action.payload }
          : action.payload;
        setStorage(state.user);
      })
      // MATCHERS (Bắt trạng thái Pending & Rejected)
      .addMatcher(
        (action) =>
          action.type.startsWith("auth/") && action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
        },
      )
      .addMatcher(
        (action) =>
          action.type.startsWith("auth/") && action.type.endsWith("/rejected"),
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.error = action.payload || "Đã xảy ra lỗi, vui lòng thử lại!";
        },
      );
  },
});

export const { logout, clearAuthError, setUser } = authSlice.actions;
export default authSlice.reducer;