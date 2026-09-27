"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

// Import Redux types
import type { AppDispatch, RootState } from "@/store";
import type { FormRules } from "@/(pages)/validation";

// Import RegisterPayload đồng nhất từ types.ts
import type { RegisterPayload } from "@/types";

import { register, clearAuthError } from "@/services/auth-slice";
import { useForm } from "@/store/useForm";
import { PATTERNS } from "@/(pages)/validation";

// Form values dạng văn bản để người dùng gõ vào input
type RegisterFormValues = Omit<RegisterPayload, "skill" | "certification"> & {
  confirmPassword: string;
  skill: string;
  certification: string;
};

// Khai báo quy tắc Validate
const registerRules: FormRules<RegisterFormValues> = {
  name: [
    { required: true, message: "Họ tên không được để trống" },
    { minLength: 2, message: "Họ tên phải từ 2 ký tự trở lên" },
  ],
  email: [
    { required: true, message: "Email không được để trống" },
    {
      pattern: PATTERNS.EMAIL,
      message: "Email không đúng định dạng (VD: example@gmail.com)",
    },
  ],
  password: [
    { required: true, message: "Mật khẩu không được để trống" },
    {
      pattern: PATTERNS.PASSWORD,
      message:
        "Mật khẩu phải từ 6 - 12 ký tự, chứa ít nhất 1 chữ hoa và 1 chữ số",
    },
  ],
  confirmPassword: [
    { required: true, message: "Vui lòng xác nhận mật khẩu" },
    {
      validate: (value, formValues) =>
        value === formValues.password || "Mật khẩu nhập lại không khớp",
    },
  ],
  phone: [
    { required: true, message: "Số điện thoại không được để trống" },
    {
      pattern: PATTERNS.PHONE,
      message: "Số điện thoại không hợp lệ (VD: 0912345678)",
    },
  ],
  birthday: [{ required: true, message: "Vui lòng chọn ngày sinh" }],
};

export default function RegisterForm() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const { loading, error } = useSelector((state: RootState) => state.auth);

  const { formData, errors, handleChange, setFieldValue, handleSubmit } =
    useForm<RegisterFormValues>(
      {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        birthday: "",
        avatar: "",
        gender: true,
        role: "USER",
        skill: "",
        certification: "",
      },
      registerRules,
    );

  // Xử lý Submit Form
  const onRegisterSubmit = async (data: RegisterFormValues) => {
    if (error) dispatch(clearAuthError());

    // Tách chuỗi nhập từ input thành mảng string bằng dấu phẩy
    const skillArray = data.skill
      ? data.skill
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean)
      : [];
    const certArray = data.certification
      ? data.certification
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean)
      : [];

    // Chuẩn hóa payload theo đúng kiểu RegisterPayload
    const payload: RegisterPayload = {
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone,
      birthday: data.birthday,
      avatar: data.avatar || "",
      gender: data.gender,
      role: data.role || "USER",
      skill: skillArray,
      certification: certArray,
    };

    // Gọi API qua Redux
    const resultAction = await dispatch(register(payload));

    if (register.fulfilled.match(resultAction)) {
      alert("Đăng ký tài khoản thành công!");
      router.push("/form-login");
    }
  };

  return (
    <div className="w-full flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Đăng ký tài khoản
          </h2>
          <p className="text-sm text-gray-500">
            Vui lòng điền đầy đủ thông tin bên dưới
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-lg text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onRegisterSubmit)} className="space-y-5">
          {/* Họ tên */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Họ tên
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nguyễn Văn A"
              className={`w-full py-2 bg-transparent border-b-2 outline-none transition text-gray-800 placeholder-gray-400 ${
                errors.name
                  ? "border-red-500"
                  : "border-gray-300 focus:border-green-500"
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@gmail.com"
              className={`w-full py-2 bg-transparent border-b-2 outline-none transition text-gray-800 placeholder-gray-400 ${
                errors.email
                  ? "border-red-500"
                  : "border-gray-300 focus:border-green-500"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Mật khẩu */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Mật khẩu
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className={`w-full py-2 bg-transparent border-b-2 outline-none transition text-gray-800 placeholder-gray-400 ${
                errors.password
                  ? "border-red-500"
                  : "border-gray-300 focus:border-green-500"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {/* Nhập lại mật khẩu */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Nhập lại mật khẩu
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className={`w-full py-2 bg-transparent border-b-2 outline-none transition text-gray-800 placeholder-gray-400 ${
                errors.confirmPassword
                  ? "border-red-500"
                  : "border-gray-300 focus:border-green-500"
              }`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Số điện thoại */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Số điện thoại
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="0912345678"
              className={`w-full py-2 bg-transparent border-b-2 outline-none transition text-gray-800 placeholder-gray-400 ${
                errors.phone
                  ? "border-red-500"
                  : "border-gray-300 focus:border-green-500"
              }`}
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Ngày sinh & Giới tính */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Ngày sinh
              </label>
              <input
                type="date"
                name="birthday"
                value={formData.birthday}
                onChange={handleChange}
                className={`w-full py-2 bg-transparent border-b-2 outline-none transition text-gray-800 ${
                  errors.birthday
                    ? "border-red-500"
                    : "border-gray-300 focus:border-green-500"
                }`}
              />
              {errors.birthday && (
                <p className="text-red-500 text-xs mt-1">{errors.birthday}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Giới tính
              </label>
              <select
                name="gender"
                value={String(formData.gender)}
                onChange={(e) =>
                  setFieldValue("gender", e.target.value === "true")
                }
                className="w-full py-2 bg-transparent border-b-2 border-gray-300 focus:border-green-500 outline-none transition text-gray-800"
              >
                <option value="true">Nam</option>
                <option value="false">Nữ</option>
              </select>
            </div>
          </div>

          {/* Kỹ năng (Skill) */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Kỹ năng (Skill)
            </label>
            <input
              type="text"
              name="skill"
              value={formData.skill}
              onChange={handleChange}
              placeholder="VD: React, Node.js, TypeScript"
              className="w-full py-2 bg-transparent border-b-2 border-gray-300 focus:border-green-500 outline-none transition text-gray-800 placeholder-gray-400"
            />
          </div>

          {/* Chứng chỉ (Certification) */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Chứng chỉ (Certification)
            </label>
            <input
              type="text"
              name="certification"
              value={formData.certification}
              onChange={handleChange}
              placeholder="VD: AWS, Fullstack Cybersoft"
              className="w-full py-2 bg-transparent border-b-2 border-gray-300 focus:border-green-500 outline-none transition text-gray-800 placeholder-gray-400"
            />
          </div>

          {/* Nút Đăng ký */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 bg-[#1dbf73] hover:bg-[#19a463] text-white font-semibold py-3 rounded-lg transition duration-200 shadow-md hover:shadow-lg disabled:opacity-50 cursor-pointer flex items-center justify-center"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>
                Đang đăng ký...
              </span>
            ) : (
              "Đăng ký"
            )}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 pt-2">
          Đã có tài khoản?{" "}
          <Link
            href="/form-login"
            className="font-semibold text-green-600 hover:underline"
          >
            Đăng nhập ngay
          </Link>
        </p>
      </div>
    </div>
  );
}
