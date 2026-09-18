'use client';

import React, { useState } from 'react';

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    email: '',
    phone: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Register Data:', formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 space-y-6">
        
        {/* Header Form */}
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Đăng ký tài khoản
          </h2>
          <p className="text-sm text-gray-500">
            Vui lòng điền đầy đủ thông tin bên dưới
          </p>
        </div>

        {/* Form chính */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Tài khoản */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Tài khoản
            </label>
            <input
              type="text"
              name="username"
              required
              value={formData.username}
              onChange={handleChange}
              placeholder="Nhập tên tài khoản"
              className="w-full py-2 bg-transparent border-b-2 border-gray-900 focus:border-green-500 outline-none transition text-gray-800 placeholder-gray-400"
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
              className="w-full py-2 bg-transparent border-b-2 border-gray-900 focus:border-green-500 outline-none transition text-gray-800 placeholder-gray-400"
            />
          </div>

          {/* Nhập lại mật khẩu */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Nhập lại mật khẩu
            </label>
            <input
              type="password"
              name="confirmPassword"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full py-2 bg-transparent border-b-2 border-gray-900 focus:border-green-500 outline-none transition text-gray-800 placeholder-gray-400"
            />
          </div>

          {/* Họ tên */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Họ tên
            </label>
            <input
              type="text"
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Nguyễn Văn A"
              className="w-full py-2 bg-transparent border-b-2 border-gray-900 focus:border-green-500 outline-none transition text-gray-800 placeholder-gray-400"
            />
          </div>

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
              className="w-full py-2 bg-transparent border-b-2 border-gray-900 focus:border-green-500 outline-none transition text-gray-800 placeholder-gray-400"
            />
          </div>

          {/* Số điện thoại */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Số điện thoại
            </label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="0912345678"
              className="w-full py-2 bg-transparent border-b-2 border-gray-900 focus:border-green-500 outline-none transition text-gray-800 placeholder-gray-400"
            />
          </div>

          {/* Nút Đăng ký */}
          <button
            type="submit"
            className="w-full mt-4 bg-[#1dbf73] hover:bg-[#19a463] text-white font-semibold py-3 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
          >
            Đăng ký
          </button>
        </form>

        {/* Chuyển sang đăng nhập */}
        <p className="text-center text-sm text-gray-600 pt-2">
          Đã có tài khoản?{' '}
          <a href="#" className="font-semibold text-green-600 hover:underline">
            Đăng nhập ngay
          </a>
        </p>

      </div>
    </div>
  );
}