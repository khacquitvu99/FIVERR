"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { Dropdown, Avatar } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
} from "@ant-design/icons";

import { RootState, AppDispatch } from "@/store";
import { logout } from "@/services/auth-slice";

export default function UserNav() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  // Lấy dữ liệu user từ Redux (Xử lý fallback trường hợp user bị bọc nested)
  const authState = useSelector((state: RootState) => state.auth) as any;
  const user = authState?.user?.user || authState?.user;

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  const isAdmin = user?.role === "ADMIN" || user?.role === "ADMINISTRATOR";

  // Lấy tên hiển thị linh hoạt theo các trường phổ biến từ API
  const displayName =
    user?.name ||
    user?.hoTen ||
    user?.displayName ||
    user?.username ||
    user?.email?.split("@")[0] ||
    "User";

  const userMenuItems = [
    {
      key: "profile",
      label: <Link href="/userprofile">Thông tin cá nhân</Link>,
      icon: <UserOutlined />,
    },
    {
      key: "manager",
      label: isAdmin ? (
        <Link href="/admin">Manager</Link>
      ) : (
        <span>Manager</span>
      ),
      icon: <SettingOutlined />,
      disabled: !isAdmin,
    },
    {
      type: "divider" as const,
    },
    {
      key: "logout",
      label: "Đăng xuất",
      icon: <LogoutOutlined />,
      danger: true,
      onClick: handleLogout,
    },
  ];

  if (!isMounted) {
    return (
      <div className="flex items-center gap-4">
        <span className="w-20 h-5 bg-gray-200/20 animate-pulse rounded" />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <Link
        href="/become-a-seller"
        className="text-white hover:text-green-400 font-medium transition-colors hidden md:inline-block"
      >
        Become a Seller
      </Link>

      {user ? (
        <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" arrow>
          <div className="flex items-center gap-2 cursor-pointer py-1 px-2 rounded-full hover:bg-white/10 transition-colors">
            <Avatar
              src={user.avatar || user.hinhAnh}
              icon={!(user.avatar || user.hinhAnh) && <UserOutlined />}
              className="bg-green-600 border border-white shrink-0"
            >
              {displayName.charAt(0).toUpperCase()}
            </Avatar>

            {/* Hiển thị tên người dùng */}
            <span className="text-white font-medium text-sm max-w-30 truncate inline-block">
              {displayName}
            </span>
          </div>
        </Dropdown>
      ) : (
        <>
          <Link
            href="/form-sigin"
            className="text-white hover:text-green-400 font-medium transition-colors"
          >
            Sign In
          </Link>

          <Link
            href="/form-login"
            className="text-white border border-white px-4 py-1.5 rounded hover:bg-green-600 hover:border-green-600 font-medium transition-all"
          >
            Join
          </Link>
        </>
      )}
    </div>
  );
}
