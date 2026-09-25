"use client";

import React, { useState } from "react";
import Link from "next/link";

// Giữ export này để list-job page không bị lỗi import
export type CardDataType = "search" | "menu" | "all";

interface CardProps {
  jobData: any;
  type?: CardDataType;
}

const FALLBACK_IMAGE = "/placeholder.png";
const FALLBACK_AVATAR = "https://i.pravatar.cc/150";

export default function Card({ jobData }: CardProps) {
  const [liked, setLiked] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [avatarError, setAvatarError] = useState(false);

  // API search/menu: { id, congViec: {...}, tenNguoiTao, avatar }
  // API "all": chính là object công việc
  const job = jobData?.congViec ?? jobData ?? {};
  const jobId = job.id ?? jobData?.id ?? "";
  const sellerName = jobData?.tenNguoiTao ?? job.tenNguoiTao ?? "Seller";
  const avatar = jobData?.avatar || job.avatar || FALLBACK_AVATAR;

  const rating = Number(job.saoCongViec) || 5;
  const reviews = Number(job.danhGia) || 0;
  const price = Number(job.giaTien) || 0;

  // Nếu không có jobId hợp lệ thì không render card (tránh link hỏng "/detail-job/")
  if (!jobId) return null;

  const detailHref = `/detail-job/${jobId}`;

  const handleToggleLike = (e: React.MouseEvent) => {
    // Chặn không cho click lan ra Link cha (nếu card được bọc Link)
    e.preventDefault();
    e.stopPropagation();
    setLiked((prev) => !prev);
  };

  return (
    <Link
      href={detailHref}
      className="border border-gray-200 rounded-md overflow-hidden bg-white hover:shadow-lg transition-shadow duration-200 flex flex-col justify-between h-full cursor-pointer"
    >
      <div>
        {/* Hình ảnh công việc */}
        <div className="relative w-full h-48 bg-gray-100 overflow-hidden">
          <img
            src={imgError || !job.hinhAnh ? FALLBACK_IMAGE : job.hinhAnh}
            alt={job.tenCongViec || "Job image"}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Người tạo */}
        <div className="p-4 flex items-center gap-3">
          <img
            src={avatarError ? FALLBACK_AVATAR : avatar}
            alt={sellerName}
            onError={() => setAvatarError(true)}
            className="w-8 h-8 rounded-full object-cover"
          />
          <div className="min-w-0">
            <h4 className="text-sm font-bold text-gray-900 leading-none truncate">
              {sellerName}
            </h4>
            <span className="text-xs text-amber-600 font-medium">
              Top Rated Seller
            </span>
          </div>
        </div>

        {/* Tiêu đề */}
        <div className="px-4 pb-3">
          <p
            title={job.tenCongViec}
            className="text-sm text-gray-800 line-clamp-2 min-h-10 hover:text-green-600 transition-colors font-medium"
          >
            {job.tenCongViec || "No description provided"}
          </p>
        </div>

        {/* Sao & badge */}
        <div className="px-4 flex items-center justify-between text-xs text-gray-500 mb-4">
          <div className="flex items-center gap-1 font-bold text-gray-800">
            <span className="text-black">★</span>
            <span>{rating.toFixed(1)}</span>
            <span className="text-gray-400 font-normal">({reviews})</span>
          </div>
          <span className="bg-[#023a15] text-white text-[10px] font-black px-1.5 py-0.5 rounded tracking-tighter">
            FIVERR&apos;S CHOICE
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between bg-white">
        <button
          type="button"
          onClick={handleToggleLike}
          aria-label={liked ? "Remove from favorites" : "Add to favorites"}
          aria-pressed={liked}
          className={`transition-colors ${
            liked ? "text-red-500" : "text-gray-400 hover:text-red-500"
          }`}
        >
          <svg
            className="w-5 h-5"
            fill={liked ? "currentColor" : "none"}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.684a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>

        <div className="text-right">
          <span className="text-[10px] text-gray-400 block font-bold tracking-wider uppercase">
            Starting at
          </span>
          <span className="text-lg font-bold text-gray-900">
            ${price.toLocaleString("en-US")}
          </span>
        </div>
      </div>
    </Link>
  );
}
