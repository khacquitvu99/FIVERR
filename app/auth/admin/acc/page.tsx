"use client";

import React, { useState } from "react";

// Interface đúng khớp với JSON Data trong ảnh
export interface UserData {
  id: number;
  name: string;
  email: string;
  password?: string;
  phone: string;
  birthday: string;
  avatar: string;
  gender: boolean; // true: Nam, false: Nữ
  role: "ADMIN" | "USER";
  skill: string[] | null;
  certification: string[] | null;
}

export default function AdminUserManagement() {
  // 1. Danh sách mẫu dựa theo định dạng JSON
  const [users, setUsers] = useState<UserData[]>([
    {
      id: 30290,
      name: "Nguyễn Văn A",
      email: "ntkm123@gmail.com",
      password: "",
      phone: "0912345678",
      birthday: "1998-05-20",
      avatar: "",
      gender: false,
      role: "USER",
      skill: ["React", "NodeJS"],
      certification: ["CyberSoft Fullstack"],
    },
    {
      id: 30291,
      name: "Trần Thị B",
      email: "btran@gmail.com",
      password: "",
      phone: "0987654321",
      birthday: "1995-10-12",
      avatar: "",
      gender: true,
      role: "ADMIN",
      skill: null,
      certification: null,
    },
  ]);

  // 2. States quản lý Modal & Form
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserData | null>(null);

  const initialFormState: Omit<UserData, "id"> = {
    name: "",
    email: "",
    password: "",
    phone: "",
    birthday: "",
    avatar: "",
    gender: true,
    role: "USER",
    skill: [],
    certification: [],
  };

  const [formData, setFormData] = useState(initialFormState);
  const [skillInput, setSkillInput] = useState("");
  const [certInput, setCertInput] = useState("");

  // Mở Modal Thêm mới
  const handleOpenAddModal = () => {
    setEditingUser(null);
    setFormData(initialFormState);
    setSkillInput("");
    setCertInput("");
    setIsModalOpen(true);
  };

  // Mở Modal Chỉnh sửa
  const handleOpenEditModal = (user: UserData) => {
    setEditingUser(user);
    setFormData({
      name: user.name || "",
      email: user.email || "",
      password: "",
      phone: user.phone || "",
      birthday: user.birthday || "",
      avatar: user.avatar || "",
      gender: user.gender ?? true,
      role: user.role || "USER",
      skill: user.skill || [],
      certification: user.certification || [],
    });
    setSkillInput(user.skill ? user.skill.join(", ") : "");
    setCertInput(user.certification ? user.certification.join(", ") : "");
    setIsModalOpen(true);
  };

  // Xử lý Xóa
  const handleDeleteUser = (id: number) => {
    if (confirm(`Bạn có chắc chắn muốn xóa người dùng #${id}?`)) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  // Xử lý Submit Form (Thêm / Sửa)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Chuyển đổi chuỗi Skill & Certification thành mảng
    const processedSkills = skillInput.trim()
      ? skillInput.split(",").map((s) => s.trim()).filter(Boolean)
      : null;
    const processedCerts = certInput.trim()
      ? certInput.split(",").map((c) => c.trim()).filter(Boolean)
      : null;

    const payload = {
      ...formData,
      skill: processedSkills,
      certification: processedCerts,
    };

    if (editingUser) {
      // Cập nhật
      setUsers(
        users.map((u) =>
          u.id === editingUser.id ? { ...u, ...payload } : u
        )
      );
    } else {
      // Tạo mới
      const newUser: UserData = {
        id: Math.floor(10000 + Math.random() * 90000), 
        ...payload,
      };
      setUsers([newUser, ...users]);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-6 bg-gray-50 min-h-screen font-sans">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-xl border border-gray-200 shadow-xs">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản Lý Người Dùng</h1>
          <p className="text-sm text-gray-500 mt-1">
            Hiển thị & quản lý danh sách user theo chuẩn JSON API
          </p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="bg-[#1dbf73] hover:bg-[#19a463] text-white font-semibold px-4 py-2.5 rounded-lg text-sm flex items-center gap-2 transition cursor-pointer shadow-xs"
        >
          <span>+</span> Thêm Người Dùng
        </button>
      </div>

      {/* BẢNG DANH SÁCH USER */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-600">
            <thead className="bg-gray-100 text-gray-700 uppercase font-semibold border-b border-gray-200">
              <tr>
                <th className="px-4 py-3.5">ID</th>
                <th className="px-4 py-3.5">Avatar</th>
                <th className="px-4 py-3.5">Họ & Tên</th>
                <th className="px-4 py-3.5">Email</th>
                <th className="px-4 py-3.5">Số điện thoại</th>
                <th className="px-4 py-3.5">Ngày sinh</th>
                <th className="px-4 py-3.5">Giới tính</th>
                <th className="px-4 py-3.5">Role</th>
                <th className="px-4 py-3.5">Kỹ năng</th>
                <th className="px-4 py-3.5 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50/80 transition">
                  <td className="px-4 py-3.5 font-semibold text-gray-900">#{user.id}</td>
                  <td className="px-4 py-3.5">
                    <div className="w-8 h-8 rounded-full bg-gray-200 border border-gray-300 flex items-center justify-center font-bold text-gray-600 overflow-hidden">
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                      ) : (
                        user.name.charAt(0).toUpperCase()
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3.5 font-semibold text-gray-800">{user.name}</td>
                  <td className="px-4 py-3.5">{user.email}</td>
                  <td className="px-4 py-3.5">{user.phone || "-"}</td>
                  <td className="px-4 py-3.5">{user.birthday || "-"}</td>
                  <td className="px-4 py-3.5">
                    <span
                      className={`px-2 py-0.5 rounded-md font-medium text-[11px] ${
                        user.gender
                          ? "bg-blue-50 text-blue-600 border border-blue-200"
                          : "bg-pink-50 text-pink-600 border border-pink-200"
                      }`}
                    >
                      {user.gender ? "Nam" : "Nữ"}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span
                      className={`px-2 py-0.5 rounded-md font-bold text-[11px] ${
                        user.role === "ADMIN"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    {user.skill && user.skill.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {user.skill.map((s, idx) => (
                          <span
                            key={idx}
                            className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.5 rounded text-[10px]"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-gray-400 italic">null</span>
                    )}
                  </td>
                  {/* THAO TÁC SỬA / XÓA */}
                  <td className="px-4 py-3.5 text-right space-x-1">
                    <button
                      onClick={() => handleOpenEditModal(user)}
                      className="px-2.5 py-1 bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200 rounded font-medium transition cursor-pointer"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="px-2.5 py-1 bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 rounded font-medium transition cursor-pointer"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL THÊM / SỬA USER */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-xl overflow-hidden max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
              <h3 className="font-bold text-gray-900 text-base">
                {editingUser ? `Chỉnh Sửa Người Dùng #${editingUser.id}` : "Thêm Người Dùng Mới"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer font-bold"
              >
                ✕
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Họ và tên (name)</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Mật khẩu (password)</label>
                  <input
                    type="password"
                    placeholder={editingUser ? "Bỏ trống nếu không muốn đổi" : "Nhập mật khẩu..."}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Số điện thoại (phone)</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Ngày sinh (birthday)</label>
                  <input
                    type="date"
                    value={formData.birthday}
                    onChange={(e) => setFormData({ ...formData, birthday: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Giới tính (gender)</label>
                  <select
                    value={formData.gender ? "true" : "false"}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value === "true" })}
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="true">Nam (true)</option>
                    <option value="false">Nữ (false)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Vai trò (role)</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value as "ADMIN" | "USER" })}
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="USER">USER</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Link Avatar (avatar)</label>
                <input
                  type="text"
                  placeholder="https://example.com/avatar.jpg"
                  value={formData.avatar}
                  onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Kỹ năng (skill) - <span className="text-gray-400 font-normal">Cách nhau bằng dấu phẩy</span>
                </label>
                <input
                  type="text"
                  placeholder="React, NextJS, Node.js"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Chứng chỉ (certification) - <span className="text-gray-400 font-normal">Cách nhau bằng dấu phẩy</span>
                </label>
                <input
                  type="text"
                  placeholder="CyberSoft Fullstack, AWS Certified"
                  value={certInput}
                  onChange={(e) => setCertInput(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-50 transition cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#1dbf73] hover:bg-[#19a463] text-white rounded-lg text-xs font-semibold transition cursor-pointer"
                >
                  {editingUser ? "Cập Nhật" : "Tạo Mới"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}