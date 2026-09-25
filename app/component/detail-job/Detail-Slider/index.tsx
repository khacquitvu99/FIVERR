"use client";

import React, { useState } from "react";

// Icon Star đánh giá
const StarIcon = () => (
  <svg className="w-4 h-4 text-amber-400 fill-amber-400" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

// Icon Trophy cho phần Repeat Buyers
const TrophyIcon = () => (
  <svg
    className="w-5 h-5 text-gray-500 shrink-0"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M5 3v4M3 5h4M6 17v4m-2 0h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
    />
  </svg>
);

interface JobHeaderProps {
  data?: any;
}

export default function JobHeader({ data }: JobHeaderProps) {
  // 1. Xử lý trường hợp API trả về Mảng hoặc Object trực tiếp
  const targetData = Array.isArray(data) ? data[0] : data;

  // 2. Bóc tách linh hoạt các object con
  const jobDetail = targetData?.congViec || targetData;
  const sellerInfo = targetData?.nguoiTao || targetData;

  const tenCongViec =
    jobDetail?.tenCongViec ||
    "I will do custom css, html, javascript, PHP coding";
  const tenNguoiTao =
    sellerInfo?.name || sellerInfo?.tenNguoiTao || "nofilrazzaq";
  const avatarNguoiTao =
    sellerInfo?.avatar ||
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80";
  const saoCongViec = jobDetail?.saoCongViec || 5;
  const danhGia = jobDetail?.danhGia || 335;
  const hinhAnh =
    jobDetail?.hinhAnh ||
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80";

  // 3. TẠO MẢNG HÌNH ẢNH (Ưu tiên ảnh API, nếu có 1 ảnh thì nhân bản để chạy slider)
  const galleryImages = [
    hinhAnh,
    jobDetail?.hinhAnh
      ? hinhAnh
      : "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    jobDetail?.hinhAnh
      ? hinhAnh
      : "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
  ];

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const handlePrev = () => {
    setActiveImageIndex((prev) =>
      prev === 0 ? galleryImages.length - 1 : prev - 1,
    );
  };

  const handleNext = () => {
    setActiveImageIndex((prev) =>
      prev === galleryImages.length - 1 ? 0 : prev + 1,
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4 text-gray-800 font-sans">
      {/* 1. BREADCRUMB */}
      {(() => {
        const targetData = Array.isArray(data) ? data[0] : data;

        // Bóc tách các trường tên loại công việc từ API CyberSoft
        const tenLoaiCongViec =
          targetData?.tenLoaiCongViec ||
          targetData?.congViec?.tenLoaiCongViec ||
          "Programming & Tech";

        const tenNhomChiTietLoai =
          targetData?.tenNhomChiTietLoai ||
          targetData?.congViec?.tenNhomChiTietLoai ||
          "Website Builders & CMS";

        const tenChiTietLoai =
          targetData?.tenChiTietLoai ||
          targetData?.congViec?.tenChiTietLoai ||
          "Full Website Creation";

        return (
          <nav className="flex items-center gap-2 text-sm text-sky-600 font-medium">
            <a href="#" className="hover:underline">
              {tenLoaiCongViec}
            </a>
            <span className="text-gray-400">&gt;</span>
            <a href="#" className="hover:underline">
              {tenNhomChiTietLoai}
            </a>
            <span className="text-gray-400">&gt;</span>
            <a href="#" className="hover:underline">
              {tenChiTietLoai}
            </a>
          </nav>
        );
      })()}

      {/* 2. JOB TITLE */}
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
        {tenCongViec}
      </h1>

      {/* 3. SELLER METADATA */}
      <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm pt-1">
        <img
          src={avatarNguoiTao}
          alt={tenNguoiTao}
          className="w-7 h-7 rounded-full object-cover border border-gray-200"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80";
          }}
        />
        <span className="font-bold text-gray-900">{tenNguoiTao}</span>

        <span className="text-amber-600 font-semibold text-xs border-l border-gray-300 pl-2">
          Top Rated Seller
        </span>

        <div className="flex items-center gap-1 border-l border-gray-300 pl-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <StarIcon key={i} />
            ))}
          </div>
          <span className="font-bold text-amber-500">{saoCongViec}</span>
          <span className="text-gray-500">({danhGia})</span>
        </div>

        <span className="text-gray-500 border-l border-gray-300 pl-2">
          4 Orders in Queue
        </span>

        <span className="bg-slate-900 text-white font-extrabold text-[10px] tracking-wider px-2 py-0.5 rounded-sm uppercase ml-1">
          Fiverr's Choice
        </span>
      </div>

      <hr className="border-gray-200 my-3" />

      {/* 4. REPEAT BUYERS BADGE */}
      <div className="flex items-center gap-2 text-xs md:text-sm text-gray-700">
        <TrophyIcon />
        <p>
          <span className="font-bold">Buyers keep returning!</span>{" "}
          <span className="text-gray-600">
            {tenNguoiTao} has an exceptional number of repeat buyers.
          </span>
        </p>
      </div>

      {/* 5. IMAGE & VIDEO CAROUSEL */}
      <div className="space-y-3 pt-2">
        <div className="relative w-full h-70 sm:h-95 md:h-112.5 bg-gray-100 rounded-lg overflow-hidden group">
          {/* Main Display Image */}
          <img
            src={galleryImages[activeImageIndex]}
            alt="Job preview"
            className="w-full h-full object-cover transition-all duration-300"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80";
            }}
          />

          {/* Nút Prev / Next */}
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            &#10094;
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            &#10095;
          </button>
        </div>

        {/* THUMBNAILS LIST */}
        <div className="flex gap-3 overflow-x-auto pb-2">
          {galleryImages.map((imgUrl, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActiveImageIndex(index)}
              className={`relative w-20 h-14 rounded overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                activeImageIndex === index
                  ? "border-emerald-500 opacity-100"
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <img
                src={imgUrl}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80";
                }}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
