'use client';

import React from "react";
import Link from "next/link";
import { JobItem } from "@/types";

interface CardProps {
  jobData: JobItem | any;
}

export default function Card({ jobData }: CardProps) {
  // Lấy dữ liệu linh hoạt: Nếu có congViec (từ API search) thì lấy congViec, ngược lại lấy trực tiếp jobData (từ API get all)
  const job = jobData?.congViec || jobData;
  const jobId = jobData?.id || job?.id;

  return (
    <div className="border border-gray-200 rounded-md overflow-hidden bg-white hover:shadow-lg transition-shadow duration-200 flex flex-col justify-between">
      <div>
        {/* Hình ảnh công việc */}
        <Link href={`/job-detail/${jobId}`}>
          <div className="relative w-full h-48 bg-gray-100 overflow-hidden cursor-pointer">
            <img
              src={job?.hinhAnh || "/placeholder.png"}
              alt={job?.tenCongViec || "Job Image"}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        </Link>

        {/* Thông tin người tạo (Seller) */}
        <div className="p-4 flex items-center gap-3">
          <img
            src={jobData?.avatar || "https://i.pravatar.cc/150"}
            alt={jobData?.tenNguoiTao || "Seller"}
            className="w-8 h-8 rounded-full object-cover"
          />
          <div>
            <h4 className="text-sm font-bold text-gray-900 leading-none">
              {jobData?.tenNguoiTao || "Seller"}
            </h4>
            <span className="text-xs text-amber-600 font-medium">Top Rated Seller</span>
          </div>
        </div>

        {/* Tiêu đề công việc */}
        <div className="px-4 pb-3">
          <Link href={`/job-detail/${jobId}`}>
            <p className="text-sm text-gray-800 line-clamp-2 hover:text-green-600 cursor-pointer transition-colors font-medium">
              {job?.tenCongViec || "No description provided"}
            </p>
          </Link>
        </div>

        {/* Đánh giá & Badge */}
        <div className="px-4 flex items-center justify-between text-xs text-gray-500 mb-4">
          <div className="flex items-center gap-1 font-bold text-gray-800">
            <span className="text-black">★</span>
            <span>{job?.saoCongViec || job?.danhGia || 5}.0</span>
            <span className="text-gray-400 font-normal">
              ({job?.danhGia || 0})
            </span>
          </div>
          <span className="bg-[#023a15] text-white text-[10px] font-black px-1.5 py-0.5 rounded tracking-tighter">
            FIVERR'S CHOICE
          </span>
        </div>
      </div>

      {/* Footer Card: Tim & Giá */}
      <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between bg-white">
        <button className="text-gray-400 hover:text-red-500 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.684a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>

        <div className="text-right">
          <span className="text-[10px] text-gray-400 block font-bold tracking-wider uppercase">
            STARTING AT
          </span>
          <span className="text-lg font-bold text-gray-900">
            ${job?.giaTien || 0}
          </span>
        </div>
      </div>
    </div>
  );
}