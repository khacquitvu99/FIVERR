import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "@/services/api";
import { TJobByDetailType } from "@/types";

export const getJobsByDetailTypeApi = (maChiTietLoai: number | string) => {
  return api.get(`cong-viec/lay-cong-viec-theo-chi-tiet-loai/${maChiTietLoai}`);
};

export const fetchJobsByDetailType = createAsyncThunk(
  "jobDetailType/fetchJobsByDetailType",
  async (maChiTietLoai: number | string, { rejectWithValue }) => {
    try {
      const response = await getJobsByDetailTypeApi(maChiTietLoai);
      return response.data.content;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Lỗi khi lấy danh sách công việc"
      );
    }
  }
);

interface JobDetailTypeState {
  jobsByDetailType: {
    loading: boolean;
    data: TJobByDetailType[] | null;
    error: string | null;
  };
  hoveredSubCategory: {
    id: number | string | null;
    name: string;
  };
}

const initialState: JobDetailTypeState = {
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

const jobDetailTypeSlice = createSlice({
  name: "jobDetailType",
  initialState,
  reducers: {
    setHoveredSubCategory: (
      state,
      action: PayloadAction<{ id: number | string; name: string }>
    ) => {
      state.hoveredSubCategory = action.payload;
    },
    clearJobsByDetailType: (state) => {
      state.jobsByDetailType = {
        loading: false,
        data: null,
        error: null,
      };
      state.hoveredSubCategory = { id: null, name: "" };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobsByDetailType.pending, (state) => {
        state.jobsByDetailType.loading = true;
        state.jobsByDetailType.error = null;
      })
      .addCase(fetchJobsByDetailType.fulfilled, (state, action) => {
        state.jobsByDetailType.loading = false;
        state.jobsByDetailType.data = action.payload;
      })
      .addCase(fetchJobsByDetailType.rejected, (state, action) => {
        state.jobsByDetailType.loading = false;
        state.jobsByDetailType.error = action.payload as string;
      });
  },
});

export const { setHoveredSubCategory, clearJobsByDetailType } =
  jobDetailTypeSlice.actions;
export default jobDetailTypeSlice.reducer;