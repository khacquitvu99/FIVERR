import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { LoaiCongViec, JobItem, TInitialState } from "@/types";
import api from "@/services/api";

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
      tenCongViec
    )}`
  );
};

// -------------------------------------------------------------
// 2. INITIAL STATE & INTERFACES
// -------------------------------------------------------------

interface JobState {
  menuCategories: TInitialState<LoaiCongViec[]>;
  searchResults: TInitialState<JobItem[]>;
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
        error.response?.data?.message || "Lỗi tải danh mục menu"
      );
    }
  }
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
        error.response?.data?.message || "Lỗi tải danh sách công việc"
      );
    }
  }
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
        error.response?.data?.message || "Lỗi tìm kiếm công việc"
      );
    }
  }
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
  },
  extraReducers: (builder) => {
    builder
      // Xử lý fetchMenuCategories
      .addCase(fetchMenuCategories.pending, (state) => {
        state.menuCategories.loading = true;
        state.menuCategories.error = null;
      })
      .addCase(fetchMenuCategories.fulfilled, (state, action) => {
        state.menuCategories.loading = false;
        state.menuCategories.data = action.payload;
      })
      .addCase(fetchMenuCategories.rejected, (state, action) => {
        state.menuCategories.loading = false;
        state.menuCategories.error = action.payload as string;
      })

      // Xử lý fetchAllJobs (Lấy tất cả công việc)
      .addCase(fetchAllJobs.pending, (state) => {
        state.searchResults.loading = true;
        state.searchResults.error = null;
      })
      .addCase(fetchAllJobs.fulfilled, (state, action) => {
        state.searchResults.loading = false;
        state.searchResults.data = action.payload;
      })
      .addCase(fetchAllJobs.rejected, (state, action) => {
        state.searchResults.loading = false;
        state.searchResults.error = action.payload as string;
      })

      // Xử lý fetchJobsByName (Tìm kiếm công việc)
      .addCase(fetchJobsByName.pending, (state) => {
        state.searchResults.loading = true;
        state.searchResults.error = null;
      })
      .addCase(fetchJobsByName.fulfilled, (state, action) => {
        state.searchResults.loading = false;
        state.searchResults.data = action.payload;
      })
      .addCase(fetchJobsByName.rejected, (state, action) => {
        state.searchResults.loading = false;
        state.searchResults.error = action.payload as string;
      });
  },
});

export const { clearSearchResults } = jobSlice.actions;
export default jobSlice.reducer;