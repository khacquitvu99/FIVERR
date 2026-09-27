'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { LoginPayload } from "@/types";
import { login, clearAuthError } from '@/services/auth-slice';

export default function LoginForm() {
  const router = useRouter();

  // Sửa lỗi: Truyền trực tiếp AppDispatch vào generic của useDispatch
  const dispatch = useDispatch<AppDispatch>();

  // Lấy state từ Redux auth slice
  const { user, loading, error } = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState<LoginPayload>({
    email: '',
    password: '',
  });

  // Tự động chuyển hướng nếu người dùng đã đăng nhập
  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  // Xóa thông báo lỗi khi component unmount
  useEffect(() => {
    return () => {
      dispatch(clearAuthError());
    };
  }, [dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (error) dispatch(clearAuthError());
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const resultAction = await dispatch(login(formData));

    if (login.fulfilled.match(resultAction)) {
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 space-y-6">
        
        {/* Header Form */}
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Đăng nhập
          </h2>
          <p className="text-sm text-gray-500">
            Chào mừng bạn quay trở lại! Vui lòng điền thông tin bên dưới
          </p>
        </div>

        {/* Thông báo lỗi từ API */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-lg text-center">
            {error}
          </div>
        )}

        {/* Form chính */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="example@gmail.com"
              className="w-full py-2 bg-transparent border-b-2 border-gray-300 focus:border-green-500 outline-none transition text-gray-800 placeholder-gray-400"
            />
          </div>

          {/* Mật khẩu */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Mật khẩu
            </label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full py-2 bg-transparent border-b-2 border-gray-300 focus:border-green-500 outline-none transition text-gray-800 placeholder-gray-400"
            />
          </div>

          {/* Nút Đăng nhập */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 bg-[#1dbf73] hover:bg-[#19a463] text-white font-semibold py-3 rounded-lg transition duration-200 shadow-md hover:shadow-lg disabled:opacity-50 cursor-pointer flex items-center justify-center"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Đang xử lý...
              </span>
            ) : (
              'Đăng nhập'
            )}
          </button>
        </form>

        {/* Chuyển sang đăng ký */}
        <p className="text-center text-sm text-gray-600 pt-2">
          Chưa có tài khoản?{' '}
          <Link
            href="/form-sigin"
            className="font-semibold text-green-600 hover:underline"
          >
            Đăng ký ngay
          </Link>
        </p>

      </div>
    </div>
  );
}