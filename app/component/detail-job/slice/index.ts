import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/services/api";
import { JobDetailResponse, TInitialState } from "@/types";
import { addAsyncCases } from "@/services/sliceExtra"; // Điều chỉnh đường dẫn tới helper của bạn

export interface BinhLuan {
  id?: number;
  maCongViec: number;
  maNguoiBinhLuan: number;
  ngayBinhLuan: string;
  noiDung: string;
  saoBinhLuan: number;
  tenNguoiBinhLuan?: string;
  avatar?: string;
}

// 1. Cấu trúc State chuẩn hóa theo các key chứa TInitialState
interface JobDetailState {
  detail: TInitialState<JobDetailResponse>;
  comments: TInitialState<BinhLuan[]>;
  postCommentStatus: TInitialState<BinhLuan | null>;
}

const initialSubState = {
  data: null,
  loading: false,
  error: null,
};

const initialState: JobDetailState = {
  detail: { ...initialSubState },
  comments: { ...initialSubState, data: [] },
  postCommentStatus: { ...initialSubState },
};

// 2. Thunks
export const fetchJobDetail = createAsyncThunk<
  JobDetailResponse,
  number | string,
  { rejectValue: string }
>("jobDetail/fetchJobDetail", async (maCongViec, { rejectWithValue }) => {
  try {
    const response = await api.get(`cong-viec/lay-cong-viec-chi-tiet/${maCongViec}`);
    return response.data.content as JobDetailResponse;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Có lỗi xảy ra khi tải chi tiết công việc"
    );
  }
});

export const fetchComments = createAsyncThunk<
  BinhLuan[],
  number | string,
  { rejectValue: string }
>("jobDetail/fetchComments", async (maCongViec, { rejectWithValue }) => {
  try {
    const response = await api.get(`binh-luan/lay-binh-luan-theo-cong-viec/${maCongViec}`);
    return response.data.content as BinhLuan[];
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Có lỗi xảy ra khi tải danh sách bình luận"
    );
  }
});

export const postComment = createAsyncThunk<
  BinhLuan,
  Omit<BinhLuan, "id">,
  { rejectValue: string }
>("jobDetail/postComment", async (commentData, { rejectWithValue, dispatch }) => {
  try {
    const response = await api.post("binh-luan", commentData);
    // Fetch lại danh sách bình luận mới sau khi đăng thành công
    dispatch(fetchComments(commentData.maCongViec));
    return response.data.content;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Không thể gửi bình luận"
    );
  }
});

// 3. Slice siêu ngắn gọn nhờ addAsyncCases
const jobDetailSlice = createSlice({
  name: "jobDetail",
  initialState,
  reducers: {
    clearJobDetail: (state) => {
      state.detail = { ...initialSubState };
      state.comments = { ...initialSubState, data: [] };
      state.postCommentStatus = { ...initialSubState };
    },
  },
  extraReducers: (builder) => {
    addAsyncCases(builder, fetchJobDetail, "detail");
    addAsyncCases(builder, fetchComments, "comments");
    addAsyncCases(builder, postComment, "postCommentStatus");
  },
});

export const { clearJobDetail } = jobDetailSlice.actions;
export default jobDetailSlice.reducer;