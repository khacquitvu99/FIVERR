export type TInitialState<T> = {
  loading: boolean;
  data: null | T;
  error: null | any;
};

// 1. Type cho từng chi tiết loại công việc
export type DetailType = {
  id: number;
  tenChiTiet: string;
};

// 2. Type cho nhóm chi tiết loại công việc
export type GroupDetailType = {
  id: number;
  tenNhom: string;
  hinhAnh: string;
  maLoaiCongviec: number;
  dsChiTietLoai: DetailType[];
};

// 3. Type cho loại công việc chính (Root Type)
export type LoaiCongViec = {
  id: number;
  tenLoaiCongViec: string;
  dsNhomChiTietLoai: GroupDetailType[];
};

// Type định nghĩa cho đối tượng công việc bên trong
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

// Type định nghĩa cho toàn bộ đối tượng chính
export type JobItem = {
  id: number;
  congViec: CongViec;
  tenLoaiCongViec: string;
  tenNhomChiTietLoai: string;
  tenChiTietLoai: string;
  tenNguoiTao: string;
  avatar: string;
};

// Type dạng mảng nếu API trả về danh sách
<<<<<<< HEAD
export type JobList = JobItem[];


// 1. Type cho đối tượng công việc bên trong (congViec)
export type TCongViecDetail = {
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

// 2. Type cho đối tượng công việc hoàn chỉnh theo chi tiết loại
export type TJobByDetailType = {
  id: number;
  congViec: TCongViecDetail;
  tenLoaiCongViec: string;
  tenNhomChiTietLoai: string;
  tenChiTietLoai: string;
  tenNguoiTao: string;
  avatar: string;
};

// 3. Type cho danh sách dữ liệu trả về từ API
export type TJobByDetailTypeList = TJobByDetailType[];
=======
export type JobList = JobItem[];
>>>>>>> 08908376300fac491f4357334bbd4a624a8f9d71
