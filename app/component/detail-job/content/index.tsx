"use client";

import React from "react";

interface AboutGigProps {
  data?: any;
  programmingLanguage?: string;
  expertise?: string[];
}

export default function AboutGig({
  data,
  programmingLanguage = "PHP",
  expertise = ["Cross Browser Compatibility", "PSD to HTML", "Performance"],
}: AboutGigProps) {
  // 1. Trích xuất dữ liệu an toàn từ API CyberSoft (dạng Mảng hoặc Object)
  const targetData = Array.isArray(data) ? data[0] : data;
  const jobInfo = targetData?.congViec || targetData;

  // Lấy chuỗi mô tả từ API
  const rawDescription: string =
    jobInfo?.moTa || jobInfo?.moTaNgan || "";

  // 2. Chuyển đổi chuỗi mô tả thành Mảng các dòng (Tách theo dấu xuống dòng \n hoặc dấu chấm)
  const descriptionList = rawDescription
    ? rawDescription
        .split(/\r?\n|\./) // Tách theo xuống dòng hoặc dấu chấm
        .map((item) => item.trim())
        .filter((item) => item.length > 0)
    : [
        "Website Design & Development",
        "CRM & E-commerce Development",
        "Custom website development (Front-end & Back-end)",
        "Responsive - Mobile Friendly sites",
        "Bug Investigation and Bug fixing",
      ];

  return (
    <div className="w-full max-w-4xl mx-auto py-6 font-sans text-gray-800 space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">About This Gig</h2>

      <p className="font-bold text-amber-900 bg-amber-50/80 inline-block px-1.5 py-0.5 rounded-sm text-sm">
        Top Rated Seller with all positive reviews
      </p>

      {/* HIỂN THỊ NỘI DUNG TỪ MOTA BẮT ĐƯỢC TỪ API */}
      <div className="space-y-4 text-sm leading-relaxed text-gray-700">
        <p className="font-semibold text-gray-800">Key Features & Services Offered:</p>

        <ul className="list-disc list-inside space-y-2 pl-1 text-gray-700">
          {descriptionList.map((item, index) => (
            <li key={index} className="leading-normal">
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="pt-2">
        <p className="font-bold text-amber-900 bg-amber-100/70 inline-block px-1.5 py-0.5 rounded-sm text-sm">
          I will do the work until you are satisfied with fast and responsive
          communication.
        </p>
      </div>

      <hr className="border-gray-200 my-6" />

      {/* CHI TIẾT KỸ THUẬT */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
        <div>
          <h4 className="text-gray-400 font-semibold mb-1">
            Programming Language
          </h4>
          <p className="text-gray-700 font-medium">{programmingLanguage}</p>
        </div>

        <div>
          <h4 className="text-gray-400 font-semibold mb-1">Expertise</h4>
          <p className="text-gray-700 font-medium">{expertise.join(", ")}</p>
        </div>
      </div>
    </div>
  );
}