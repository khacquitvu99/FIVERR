import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/services/api";

// 1. API Lấy chi tiết loại công việc (nhóm + danh mục con)
export const fetchChiTietLoaiCongViec = createAsyncThunk(
  "jobDetailType/fetchChiTietLoaiCongViec",
  async (maLoaiCongViec: number | string, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `cong-viec/lay-chi-tiet-loai-cong-viec/${maLoaiCongViec}`,
      );
      // BẮT BUỘC .data.content để lấy đúng payload
      return response.data.content;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Lỗi khi lấy danh sách loại công việc",
      );
    }
  },
);

// 2. API Lấy công việc theo chi tiết loại khi click sub-category
export const fetchCongViecTheoChiTietLoai = createAsyncThunk(
  "jobDetailType/fetchCongViecTheoChiTietLoai",
  async (maChiTietLoai: number | string, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `cong-viec/lay-cong-viec-theo-chi-tiet-loai/${maChiTietLoai}`,
      );
      return response.data.content;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Lỗi khi lấy danh sách công việc",
      );
    }
  },
);

interface JobDetailTypeState {
  categories: {
    loading: boolean;
    data: any | null; // Chứa Object tổng hoặc Mảng từ API
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
    // Handling API 1: Lay chi tiet loai
    builder
      .addCase(fetchChiTietLoaiCongViec.pending, (state) => {
        state.categories.loading = true;
        state.categories.error = null;
      })
      .addCase(fetchChiTietLoaiCongViec.fulfilled, (state, action) => {
        state.categories.loading = false;
        // Nếu API trả về mảng 1 phần tử [ { id, dsNhomChiTietLoai } ] -> Lấy thẳng phần tử [0]
        const rawContent = action.payload;
        state.categories.data = Array.isArray(rawContent)
          ? rawContent[0]
          : rawContent;
      })
      .addCase(fetchChiTietLoaiCongViec.rejected, (state, action) => {
        state.categories.loading = false;
        state.categories.error = action.payload as string;
      });

    // Handling API 2: Lay cong viec theo chi tiet loai
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
