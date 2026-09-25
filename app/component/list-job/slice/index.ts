import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  LoaiCongViec,
  JobItem,
  TJobByDetailType,
  TInitialState,
} from "@/types";

import api from "@/services/api";
import { addAsyncCases } from "@/services/sliceExtra";

// -------------------------------------------------------------
// 1. API HELPER FUNCTIONS
// -------------------------------------------------------------

// Lấy danh menu loại công việc
export const getLoaiCongViecApi = () => {
  return api.get("cong-viec/lay-menu-loai-cong-viec");
};

// Lấy toàn bộ danh sách công việc
export const getAllJobsApi = () => {
  return api.get("cong-viec");
};

// Lấy danh sách công việc theo từ khóa tìm kiếm
export const getCongViecTheoTenApi = (tenCongViec: string) => {
  return api.get(
    `cong-viec/lay-danh-sach-cong-viec-theo-ten/${encodeURIComponent(
      tenCongViec,
    )}`,
  );
};

// API Lấy danh sách công việc theo chi tiết loại (MaChiTietLoai)
export const getJobsByDetailTypeApi = (MaChiTietLoai: number | string) => {
  return api.get(`cong-viec/lay-cong-viec-theo-chi-tiet-loai/${MaChiTietLoai}`);
};

// -------------------------------------------------------------
// 2. INITIAL STATE & INTERFACES
// -------------------------------------------------------------

interface JobState {
  menuCategories: TInitialState<LoaiCongViec[]>;
  searchResults: TInitialState<JobItem[]>;
  // STATE Quản lý danh sách công việc theo chi tiết loại & thông tin danh mục đang chọn
  jobsByDetailType: TInitialState<TJobByDetailType[]>;
  hoveredSubCategory: {
    id: number | string | null;
    name: string;
  };
}

const initialState: JobState = {
  menuCategories: {
    loading: false,
    data: null,
    error: null,
  },
  searchResults: {
    loading: false,
    data: null,
    error: null,
  },
  jobsByDetailType: {
    loading: false,
    data: null,
    error: null,
  },
  hoveredSubCategory: {
    id: null,
    name: "",
  },
};

// -------------------------------------------------------------
// 3. ASYNC THUNKS
// -------------------------------------------------------------

// Thunk 1: Lấy danh mục Menu
export const fetchMenuCategories = createAsyncThunk(
  "job/fetchMenuCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getLoaiCongViecApi();
      return response.data.content;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Lỗi tải danh mục menu",
      );
    }
  },
);

// Thunk 2: Lấy toàn bộ danh sách công việc
export const fetchAllJobs = createAsyncThunk(
  "job/fetchAllJobs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllJobsApi();
      return response.data.content;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Lỗi tải danh sách công việc",
      );
    }
  },
);

// Thunk 3: Tìm kiếm công việc theo tên
export const fetchJobsByName = createAsyncThunk(
  "job/fetchJobsByName",
  async (tenCongViec: string, { rejectWithValue }) => {
    try {
      const response = await getCongViecTheoTenApi(tenCongViec);
      return response.data.content;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Lỗi tìm kiếm công việc",
      );
    }
  },
);

// THUNK 4: Lấy công việc theo Chi Tiết Loại
export const fetchJobsByDetailType = createAsyncThunk(
  "job/fetchJobsByDetailType",
  async (MaChiTietLoai: number | string, { rejectWithValue }) => {
    try {
      const response = await getJobsByDetailTypeApi(MaChiTietLoai);
      return response.data.content;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Lỗi tải danh sách công việc theo danh mục",
      );
    }
  },
);

// -------------------------------------------------------------
// 4. SLICE DEFINITION
// -------------------------------------------------------------

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    clearSearchResults: (state) => {
      state.searchResults.data = null;
      state.searchResults.error = null;
      state.searchResults.loading = false;
    },
    // Lưu ID và Name của danh mục phụ người dùng đang di chuột/click
    setHoveredSubCategory: (
      state,
      action: { payload: { id: number | string; name: string } },
    ) => {
      state.hoveredSubCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder;
    // Xử lý fetchMenuCategories
    addAsyncCases(builder, fetchMenuCategories, "menuCategories");
    // Xử lý fetchAllJobs (Lấy tất cả công việc)
    addAsyncCases(builder, fetchAllJobs, "searchResults");
    // Xử lý fetchJobsByName (Tìm kiếm công việc)
    addAsyncCases(builder, fetchJobsByName, "searchResults");
    // Xử lý fetchJobsByDetailType (Lấy công việc theo chi tiết loại)
    addAsyncCases(builder, fetchJobsByDetailType, "jobsByDetailType");
  },
});

export const { clearSearchResults, setHoveredSubCategory } = jobSlice.actions;
export default jobSlice.reducer;
