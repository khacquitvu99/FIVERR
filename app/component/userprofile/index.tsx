"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchUserById } from "@/services/auth-slice";
import { useRouter } from "next/navigation";
import Skill from "./skill";
import Extend from "./extend";

export default function UserCard({ userId }: { userId?: string | number }) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  // Flag kiểm tra xem component đã mount phía Client chưa (Tránh lỗi Hydration)
  const [isMounted, setIsMounted] = useState(false);

  // Lấy dữ liệu từ Redux Store
  const authState = useAppSelector((state: any) => state.auth || state.user);
  const reduxUser = authState?.user?.user || authState?.user;

  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    setLoading(true);

    dispatch(fetchUserById(userId))
      .unwrap()
      .then((data) => {
        setUserData(data);
      })
      .catch((err) => {
        console.error("Lỗi fetch user API:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch, userId]);

  const handleEditProfile = () => {
    router.push("/auth/edit-profile");
  };

  // Tránh đụng độ Hydration bằng cách trả về null hoặc Skeleton khung chứa trước khi mounted
  if (!isMounted) {
    return (
      <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-md max-w-95 w-full text-center">
        <p className="text-sm text-gray-400">Đang tải...</p>
      </div>
    );
  }

  const currentUser = userData || reduxUser;
  const displayName = currentUser?.name || "User";

  if (loading && !currentUser) {
    return (
      <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-md max-w-95 w-full text-center">
        <p className="text-sm text-green-600 animate-pulse">
          Đang tải thông tin từ máy chủ...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8 bg-gray-50 min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* CỘT TRÁI (4 cols): User Card + Component <Skill /> */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-xs flex flex-col items-center text-center">
              {/* AVATAR & ONLINE BADGE */}
              <div className="relative w-36 h-36 mx-auto mb-6">
                <div className="w-full h-full bg-[#E5E7EB] rounded-full flex items-center justify-center overflow-hidden border border-gray-200">
                  {currentUser?.avatar ? (
                    <img
                      src={currentUser.avatar}
                      alt={displayName}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = "none";
                      }}
                    />
                  ) : (
                    <span className="text-5xl font-semibold text-gray-500 select-none">
                      {displayName.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>

                {/* ONLINE BADGE */}
                <div className="absolute bottom-1 right-2 bg-white border border-[#10B981] text-[#10B981] text-[11px] font-semibold px-2.5 py-0.5 rounded-full shadow-xs flex items-center gap-1.5 select-none">
                  <span className="w-2 h-2 bg-[#10B981] rounded-full inline-block"></span>
                  <span>Online</span>
                </div>
              </div>
              {/* NAME & EDIT ICON */}
              <div className="flex items-center justify-center gap-2 mb-6">
                <h2 className="text-xl font-bold text-gray-900 tracking-tight">
                  {displayName}
                </h2>
                <button
                  onClick={handleEditProfile}
                  title="Chỉnh sửa"
                  className="text-amber-500 hover:text-amber-600 transition-colors text-lg cursor-pointer"
                >
                  ✏️
                </button>
              </div>
              {/* CONTACT INFORMATION */}
              <div className="pt-6 border-t border-gray-100 space-y-4 text-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-500">
                    <span className="text-base leading-none">👤</span>
                    <span>Email</span>
                  </div>
                  <span className="font-bold text-gray-900 truncate max-w-47.5">
                    {currentUser?.email || "Chưa cập nhật"}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-500">
                    <span className="text-base leading-none">📞</span>
                    <span>Phone</span>
                  </div>
                  <span className="font-bold text-gray-900">
                    {currentUser?.phone || currentUser?.soDT || "Chưa cập nhật"}
                  </span>
                </div>
              </div>
            </div>

            {/* Nhúng Component <Skill /> */}
            <Skill />
          </div>

          {/* CỘT PHẢI (8 cols): Nhúng Component <Extend /> */}
          <div className="lg:col-span-8">
            <Extend />
          </div>
        </div>
      </div>
    </div>
  );
}
