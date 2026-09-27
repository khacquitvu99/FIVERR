// ==========================================
// 1. GENERIC & BASE TYPES
// ==========================================

export type TInitialState<T> = {
  loading: boolean;
  data: null | T;
  error: null | string | any;
};

// Cấu trúc Response chung cho API Cybersoft / Fiverr
export type ApiResponse<T> = {
  statusCode: number;
  content: T;
  dateTime: string;
  message?: string;
};

// ==========================================
// 2. USER & AUTH TYPES
// ==========================================

// Model User chuẩn từ API Fiverr
export interface UserInfo {
  id: number;
  name: string;
  email: string;
  password?: string;
  phone: string;
  birthday: string;
  avatar?: string;
  gender: boolean;
  role: string;
  skill: string[];
  certification: string[];
}

// Type Payload khi Đăng ký (bỏ id)
export type RegisterPayload = Omit<UserInfo, "id">;

// Type Payload khi Đăng nhập
export type LoginPayload = Pick<UserInfo, "email"> & {
  password: string;
};

// Type lưu thông tin User vào Redux (bỏ password)
export type AuthUser = Omit<UserInfo, "password">;

// Type lưu trạng thái Auth trong Redux Store
export interface AuthState {
  user: AuthUser | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

// ==========================================
// 3. CÔNG VIỆC & LOẠI CÔNG VIỆC TYPES
// ==========================================

// Type cho từng chi tiết loại công việc
export type DetailType = {
  id: number;
  tenChiTiet: string;
};

// Type cho nhóm chi tiết loại công việc
export type GroupDetailType = {
  id: number;
  tenNhom: string;
  hinhAnh: string;
  maLoaiCongviec: number;
  dsChiTietLoai: DetailType[];
};

// Type cho loại công việc chính (Root Type)
export type LoaiCongViec = {
  id: number;
  tenLoaiCongViec: string;
  dsNhomChiTietLoai: GroupDetailType[];
};

// Core Object Công việc (dùng chung cho các response chi tiết)
export type CongViec = {
  id: number;
  tenCongViec: string;
  danhGia: number;
  giaTien: number;
  nguoiTao: number;
  hinhAnh: string;
  moTa: string;
  maChiTietLoaiCongViec: number;
  moTaNgan: string;
  saoCongViec: number;
};

// Type JobItem tổng hợp (Bao gồm object CongViec và thông tin người tạo)
export type JobItem = {
  id: number;
  congViec: CongViec;
  tenLoaiCongViec: string;
  tenNhomChiTietLoai: string;
  tenChiTietLoai: string;
  tenNguoiTao: string;
  avatar: string;
};

// Alias tái sử dụng giúp đồng nhất các type
export type JobDetailResponse = JobItem;
export type TJobByDetailType = JobItem;
export type JobList = JobItem[];
export type TJobByDetailTypeList = JobItem[];

// ==========================================
// 4. THUÊ CÔNG VIỆC TYPES
// ==========================================

export type ThueCongViecPayload = {
  maCongViec: number;
  ngayThue: string;
  hoanThanh?: boolean;
};

export type ThueCongViecResponse = {
  id: number;
  maCongViec: number;
  maNguoiThue: number;
  ngayThue: string;
  hoanThanh: boolean;
};

// ==========================================
// 5. BÌNH LUẬN / COMMENT TYPES
// ==========================================

export type CommentItem = {
  id: number;
  ngayBinhLuan: string;
  noiDung: string;
  saoBinhLuan: number;
  tenNguoiBinhLuan?: string;
  avatar?: string;
  maCongViec?: number;
  maNguoiBinhLuan?: number;
};

// ==========================================
// 5. Edit/upload profile
// ==========================================
export interface UpdateUserPayload {
  id: number;
  name: string;
  email: string;
  phone: string;
  birthday: string;
  gender: boolean;
  role: string;
  skill: string[];
  certification: string[];
}
