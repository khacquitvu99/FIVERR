"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchUserById,
  uploadAvatar,
  updateUserProfile,
  setUser,
} from "@/services/auth-slice";

export default function EditProfilePage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const authState = useAppSelector((state: any) => state.auth || state.user);

  // Lấy object user chuẩn từ Redux
  const user =
    authState?.user?.content || authState?.user?.user || authState?.user;

  const loading = authState?.loading;

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    birthday: "",
    gender: "Nam",
    skills: "",
    certification: "",
  });

  const [previewAvatar, setPreviewAvatar] = useState<string>("");

  // 1. Tự động lấy ID và fetch dữ liệu tươi nhất khi load trang
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    let userId = user?.id || user?.idUser;

    if (!userId && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        userId = parsedUser?.id || parsedUser?.idUser || parsedUser?.user?.id;
      } catch (error) {
        console.error("Lỗi parse LocalStorage user:", error);
      }
    }

    if (userId) {
      dispatch(fetchUserById(userId));
    }
  }, [dispatch]);

  // 2. Điền dữ liệu user vào Form khi Redux State cập nhật
  useEffect(() => {
    if (user) {
      const currentAvatar = user.avatar || "";
      const userId = user.id || user.idUser || "";
      const userEmail = user.email || user.Email || user.emailAddress || "";
      const userPhone = user.phone || user.soDT || user.soDt || "";

      setFormData({
        id: String(userId),
        name: user.name || "",
        email: userEmail,
        phone: userPhone,
        birthday: user.birthday || user.ngaySinh || "",
        gender:
          user.gender === true ||
          user.gender === "true" ||
          user.gender === "Nam"
            ? "Nam"
            : "Nữ",
        skills: Array.isArray(user.skills || user.skill)
          ? (user.skills || user.skill).join(", ")
          : user.skills || user.skill || "",
        certification: Array.isArray(user.certification)
          ? user.certification.join(", ")
          : user.certification || "",
      });
      setPreviewAvatar(currentAvatar);
    }
  }, [user]);

  // 3. Xử lý Cập nhật thông tin theo khóa ID
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userId = formData.id || user?.id || user?.idUser;

    if (!userId) {
      alert("Không tìm thấy ID tài khoản! Vui lòng đăng nhập lại.");
      return;
    }

    try {
      const payload = {
        id: userId,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        birthday: formData.birthday,
        gender: formData.gender === "Nam",
        role: user?.role || "USER",
        skill:
          typeof formData.skills === "string"
            ? formData.skills
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean)
            : formData.skills || [],
        certification:
          typeof formData.certification === "string"
            ? formData.certification
                .split(",")
                .map((c) => c.trim())
                .filter(Boolean)
            : formData.certification || [],
      };

      await dispatch(updateUserProfile(payload)).unwrap();

      const freshUserData = await dispatch(fetchUserById(userId)).unwrap();

      if (freshUserData) {
        dispatch(setUser(freshUserData));
      }

      alert("Cập nhật thông tin thành công!");
      router.push("/userprofile");
    } catch (error: any) {
      console.error("Lỗi cập nhật profile:", error);
      alert(typeof error === "string" ? error : "Có lỗi xảy ra khi cập nhật!");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTriggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Vui lòng chọn file hình ảnh hợp lệ (.jpg, .png, .jpeg)");
        return;
      }
      const localPreview = URL.createObjectURL(file);
      setPreviewAvatar(localPreview);

      try {
        await dispatch(uploadAvatar(file)).unwrap();
        const userId = formData.id || user?.id || user?.idUser;
        if (userId) {
          const freshUserData = await dispatch(fetchUserById(userId)).unwrap();
          if (freshUserData) {
            dispatch(setUser(freshUserData));
          }
        }
      } catch (err) {
        console.error("Upload avatar thất bại:", err);
      }
    }
  };

  return (
    <div className="w-full bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Input File Ẩn */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      <div className="max-w-xl w-full space-y-6 bg-white p-8 rounded-2xl shadow-sm border text-black border-gray-200">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
            Chỉnh sửa thông tin cá nhân
          </h2>
          <p className="mt-1 text-xs text-gray-500">
            Cập nhật thông tin tài khoản của bạn
          </p>
        </div>

        {/* Upload & Preview Avatar */}
        <div className="flex flex-col items-center gap-3 pt-2">
          <div
            className="relative group cursor-pointer"
            onClick={handleTriggerFileSelect}
          >
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-green-500 bg-gray-100 flex items-center justify-center text-gray-400 text-2xl font-bold shadow-xs">
              {previewAvatar ? (
                <img
                  src={previewAvatar}
                  alt="Avatar Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span>{formData.name?.charAt(0)?.toUpperCase() || "U"}</span>
              )}
            </div>
            <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
              Đổi ảnh
            </div>
          </div>
          <button
            type="button"
            onClick={handleTriggerFileSelect}
            className="text-xs text-green-600 font-semibold hover:underline cursor-pointer"
          >
            Tải ảnh mới lên
          </button>
        </div>

        {/* Form Chỉnh sửa Profile */}
        <form className="space-y-4 pt-2" onSubmit={handleSubmit}>
          {/* 1. Trường ID (Disabled) */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              ID Tài khoản
            </label>
            <input
              type="text"
              name="id"
              disabled
              value={formData.id}
              placeholder="Chưa có ID"
              className="w-full px-3 py-2 border border-gray-200 bg-gray-100 rounded-lg text-sm text-gray-700 cursor-not-allowed font-medium"
            />
          </div>

          {/* 2. Họ và tên */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Họ và tên
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Nhập họ và tên"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            />
          </div>

          {/* 3. Địa chỉ Email*/}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Địa chỉ Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Chưa có thông tin email"
              className="w-full px-3 py-2 border border-gray-300 bg-white rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            />
          </div>

          {/* 4. Số điện thoại */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Số điện thoại
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Nhập số điện thoại"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            />
          </div>

          {/* 5. Ngày sinh & Giới tính */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Ngày sinh
              </label>
              <input
                type="date"
                name="birthday"
                value={formData.birthday}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Giới tính
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition bg-white"
              >
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
              </select>
            </div>
          </div>

          {/* 6. Kỹ năng */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Kỹ năng (Skills)
            </label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="VD: React, Node.js, TypeScript"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            />
          </div>

          {/* 7. Chứng chỉ */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Chứng chỉ (Certifications)
            </label>
            <input
              type="text"
              name="certification"
              value={formData.certification}
              onChange={handleChange}
              placeholder="VD: AWS, Fullstack Cybersoft"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            />
          </div>

          {/* Nút thao tác */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="w-1/2 py-2.5 px-4 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={loading}
              className="w-1/2 py-2.5 px-4 bg-[#1dbf73] hover:bg-[#19a463] text-white rounded-lg text-sm font-semibold transition shadow-xs disabled:opacity-50 cursor-pointer"
            >
              {loading ? "Đang lưu..." : "Lưu thay đổi"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
