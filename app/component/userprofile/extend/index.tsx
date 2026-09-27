"use client";

import React, { useState } from "react";

interface GigItem {
  id: string | number;
  title: string;
  description: string;
  rating: number;
  image: string;
}

export default function Extend() {
  const [showBanner, setShowBanner] = useState(true);

  // Dữ liệu mẫu danh sách công việc / dịch vụ (Gigs)
  const [gigs] = useState<GigItem[]>([
    {
      id: 1,
      title: "Lập trình front end với react js",
      description:
        "Các ngôn ngữ để phát triển Front End bao gồm 3 ngôn ngữ chủ đạo đó là: HTML, CSS và Javascript. Tuy nhiên, để code nhanh gọn lẹ thì ta có thể sử dụng thêm các framework hay thư viện khác như React js, angular js, vue js ...",
      rating: 4.3,
      image: "https://picsum.photos/300/180?random=1",
    },
    {
      id: 2,
      title: "Lập trình front end với react js",
      description:
        "Các ngôn ngữ để phát triển Front End bao gồm 3 ngôn ngữ chủ đạo đó là: HTML, CSS và Javascript. Tuy nhiên, để code nhanh gọn lẹ thì ta có thể sử dụng thêm các framework hay thư viện khác như React js, angular js, vue js ...",
      rating: 4.3,
      image: "https://picsum.photos/300/180?random=2",
    },
  ]);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4 p-4 bg-gray-50">
      {/* 1. Banner Quảng Cáo Bán Dịch Vụ Trên Cùng */}
      {showBanner && (
        <div className="bg-white border border-gray-200 p-4 rounded-md flex items-center justify-between shadow-xs relative">
          <div className="flex items-center gap-4">
            {/* Icon tòa nhà/công sở */}
            <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center shrink-0">
              <svg
                className="w-8 h-8 text-gray-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.008v.008H6.75V6.75zm0 3h.008v.008H6.75V9.75zm0 3h.008v.008H6.75v-.008zm0 3h.008v.008H6.75v-.008zm3.75-9h.008v.008h-.008V6.75zm0 3h.008v.008h-.008V9.75zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm3.75-9h.008v.008h-.008V6.75zm0 3h.008v.008h-.008V9.75zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-700">
                <span className="font-bold text-gray-800">
                  Buying services for work?
                </span>{" "}
                Help us tailor your experience to fit your needs.
              </p>
              <a
                href="#"
                className="text-sm font-semibold text-[#1dbf73] hover:underline flex items-center gap-1 mt-0.5"
              >
                Tell us more about your business <span>&gt;</span>
              </a>
            </div>
          </div>
          <button
            onClick={() => setShowBanner(false)}
            className="text-gray-400 hover:text-gray-600 text-sm p-1 absolute top-2 right-2 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* 2. Khung Tạo Gig Mới */}
      <div className="bg-white border border-gray-200 p-4 rounded-md flex items-center justify-between shadow-xs">
        <span className="text-sm text-gray-600 font-medium">
          It seems that you don't have any active Gigs. Get selling!
        </span>
        <button className="bg-[#1dbf73] hover:bg-[#19a463] text-white text-sm font-semibold px-4 py-2 rounded transition cursor-pointer">
          Create a New Gig
        </button>
      </div>

      {/* 3. Danh Sách Gigs / Dịch Vụ */}
      <div className="bg-white border border-gray-200 rounded-md p-4 space-y-6 shadow-xs">
        {gigs.map((gig, index) => (
          <div key={gig.id}>
            <div className="flex flex-col md:flex-row gap-4 items-start justify-between">
              {/* Ảnh Thumbnail Gig */}
              <div className="w-full md:w-52 h-32 bg-amber-100 rounded-xs overflow-hidden shrink-0 border border-gray-200">
                <img
                  src={gig.image}
                  alt={gig.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Thông Tin Chi Tiết */}
              <div className="flex-1 space-y-2">
                <h3 className="font-bold text-gray-900 text-base md:text-lg">
                  {gig.title}
                </h3>
                <div className="flex items-start gap-2">
                  <p className="text-xs text-gray-500 leading-relaxed line-clamp-3 flex-1">
                    {gig.description}
                  </p>
                  {/* Đánh Giá Đôi Cánh Sao */}
                  <div className="flex items-center gap-1 text-xs shrink-0 pt-0.5">
                    <span className="text-amber-400">★ ★ ★ ★ ★</span>
                    <span className="text-gray-600 font-semibold">
                      {gig.rating}
                    </span>
                  </div>
                </div>

                {/* Các Nút Thao Tác (View detail, Edit, X) */}
                <div className="flex items-center justify-end gap-2 pt-2">
                  <button className="px-4 py-1.5 border-2 border-black text-black text-xs font-bold rounded-xs hover:bg-gray-100 transition cursor-pointer shadow-xs">
                    View detail
                  </button>
                  <button className="px-3 py-1.5 border-2 border-black text-black text-xs font-bold rounded-xs hover:bg-gray-100 transition cursor-pointer shadow-xs">
                    Edit
                  </button>
                  <button className="px-2.5 py-1.5 border-2 border-black text-black text-xs font-bold rounded-xs hover:bg-red-50 hover:text-red-600 transition cursor-pointer shadow-xs">
                    X
                  </button>
                </div>
              </div>
            </div>

            {/* Đường gạch phân cách giữa các item */}
            {index < gigs.length - 1 && (
              <hr className="my-6 border-gray-200" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}