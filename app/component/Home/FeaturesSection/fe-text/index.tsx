"use client";

import React from "react";

// Structure dữ liệu danh sách ưu điểm
const features = [
  {
    title: "The best for every budget",
    desc: "Find high quality services at every price point. No hourly rates, just project-based pricing.",
  },
  {
    title: "Quality work done quickly",
    desc: "Find the right freelancer to begin working on your project within minutes.",
  },
  {
    title: "Protected payments, every time",
    desc: "Always know what you'll pay upfront. Your payment isn't released until you approve the work.",
  },
  {
    title: "24/7 support",
    desc: "Questions? Our round the clock support team is available to help anytime, anywhere.",
  },
];

const FeaturesSection: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto space-y-8 py-16 px-6 md:px-12">
      {/* Tiêu đề chính */}
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight leading-tight">
        A whole world of freelance talent at your fingertips
      </h2>

      {/* Danh sách các tính năng */}
      <div className="space-y-6">
        {features.map((item, index) => (
          <div key={index} className="space-y-1">
            {/* Tiêu đề + Icon Check */}
            <div className="flex items-center gap-2.5">
              <svg
                className="w-5 h-5 text-gray-700 shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-lg font-bold text-gray-800">{item.title}</h3>
            </div>

            {/* Mô tả chi tiết */}
            <p className="text-gray-600 text-base leading-relaxed pl-7">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesSection;
