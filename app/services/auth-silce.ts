import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "@/services/api";

export interface AuthUser {
  id: number;
  taiKhoan: string;
  email: string;
  hoTen?: string;
  soDT?: string;
  maNhom?: string;
  avatar?: string;
  [key: string]: any;
}

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

// Khởi tạo state từ localStorage (nếu có) để giữ đăng nhập sau khi reload trang
const getStoredUser = (): AuthUser | null => {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem("userInfo");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const getStoredToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("userToken");
};

const initialState: AuthState = {
  user: getStoredUser(),
  token: getStoredToken(),
  loading: false,
  error: null,
};

interface LoginPayload {
  taiKhoan: string;
  matKhau: string;
}

interface RegisterPayload {
  taiKhoan: string;
  matKhau: string;
  email: string;
  soDt: string;
  hoTen: string;
}

// Đăng nhập — endpoint theo chuẩn API CyberSoft
export const login = createAsyncThunk<
  { user: AuthUser; token: string },
  LoginPayload,
  { rejectValue: string }
>("auth/login", async (payload, { rejectWithValue }) => {
  try {
    const response = await api.post("api/nguoi-dung/dang-nhap", payload);
    const content = response.data.content;

    // API CyberSoft thường trả accessToken kèm trong object user
    const { accessToken, ...user } = content;

    if (typeof window !== "undefined") {
      localStorage.setItem("userToken", accessToken);
      localStorage.setItem("userInfo", JSON.stringify(user));
    }

    return { user, token: accessToken };
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.content || "Đăng nhập thất bại. Vui lòng thử lại!"
    );
  }
});

// Đăng ký tài khoản mới
export const register = createAsyncThunk<
  void,
  RegisterPayload,
  { rejectValue: string }
>("auth/register", async (payload, { rejectWithValue }) => {
  try {
    await api.post("api/nguoi-dung/dang-ky", payload);
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.content || "Đăng ký thất bại. Vui lòng thử lại!"
    );
  }
});

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
        localStorage.removeItem("userInfo");
      }
    },
    clearAuthError: (state) => {
      state.error = null;
    },
    // Cho phép cập nhật thủ công (vd sau khi sửa profile)
    setUser: (state, action: PayloadAction<AuthUser>) => {
      state.user = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("userInfo", JSON.stringify(action.payload));
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Đăng nhập thất bại.";
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Đăng ký thất bại.";
      });
  },
});

export const { logout, clearAuthError, setUser } = authSlice.actions;
export default authSlice.reducer;
