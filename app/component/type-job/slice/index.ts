import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/services/api";

// 1. API Lấy nhóm chi tiết loại công việc & chi tiết loại công việc theo MaLoaiCongViec
export const fetchChiTietLoaiCongViec = createAsyncThunk(
  "jobDetailType/fetchChiTietLoaiCongViec",
  async (maLoaiCongViec: number | string, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `cong-viec/lay-chi-tiet-loai-cong-viec/${maLoaiCongViec}`
      );
      return response.data.content;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Lỗi khi lấy danh sách loại công việc"
      );
    }
  }
);

// 2. API Lấy danh sách công việc theo MaChiTietLoai khi người dùng bấm vào 1 chi tiết loại
export const fetchCongViecTheoChiTietLoai = createAsyncThunk(
  "jobDetailType/fetchCongViecTheoChiTietLoai",
  async (maChiTietLoai: number | string, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `cong-viec/lay-cong-viec-theo-chi-tiet-loai/${maChiTietLoai}`
      );
      return response.data.content;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Lỗi khi lấy danh sách công việc"
      );
    }
  }
);

interface JobDetailTypeState {
  categories: {
    loading: boolean;
    data: any[] | null;
    error: string | null;
  };
  jobsBySubDetail: {
    loading: boolean;
    data: any[] | null;
    error: string | null;
    selectedSubId: number | string | null;
  };
}

const initialState: JobDetailTypeState = {
  categories: {
    loading: false,
    data: null,
    error: null,
  },
  jobsBySubDetail: {
    loading: false,
    data: null,
    error: null,
    selectedSubId: null,
  },
};

const jobDetailTypeSlice = createSlice({
  name: "jobDetailType",
  initialState,
  reducers: {
    clearTypeJobState: (state) => {
      state.categories = { loading: false, data: null, error: null };
      state.jobsBySubDetail = {
        loading: false,
        data: null,
        error: null,
        selectedSubId: null,
      };
    },
  },
  extraReducers: (builder) => {
    // Xử lý API 1: Lay chi tiet loai cong viec
    builder
      .addCase(fetchChiTietLoaiCongViec.pending, (state) => {
        state.categories.loading = true;
        state.categories.error = null;
      })
      .addCase(fetchChiTietLoaiCongViec.fulfilled, (state, action) => {
        state.categories.loading = false;
        state.categories.data = action.payload;
      })
      .addCase(fetchChiTietLoaiCongViec.rejected, (state, action) => {
        state.categories.loading = false;
        state.categories.error = action.payload as string;
      });

    // Xử lý API 2: Lay cong viec theo chi tiet loai
    builder
      .addCase(fetchCongViecTheoChiTietLoai.pending, (state, action) => {
        state.jobsBySubDetail.loading = true;
        state.jobsBySubDetail.error = null;
        state.jobsBySubDetail.selectedSubId = action.meta.arg;
      })
      .addCase(fetchCongViecTheoChiTietLoai.fulfilled, (state, action) => {
        state.jobsBySubDetail.loading = false;
        state.jobsBySubDetail.data = action.payload;
      })
      .addCase(fetchCongViecTheoChiTietLoai.rejected, (state, action) => {
        state.jobsBySubDetail.loading = false;
        state.jobsBySubDetail.error = action.payload as string;
      });
  },
});

export const { clearTypeJobState } = jobDetailTypeSlice.actions;
export default jobDetailTypeSlice.reducer;