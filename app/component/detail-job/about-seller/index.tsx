"use client";

import React, { useState } from "react";

const ChevronDownIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg
    className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
      isOpen ? "rotate-180" : ""
    }`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M19 9l-7 7-7-7"
    />
  </svg>
);

const StarIcon = ({ filled = true }: { filled?: boolean }) => (
  <svg
    className={`w-4 h-4 ${filled ? "text-amber-400 fill-amber-400" : "text-gray-300"}`}
    viewBox="0 0 20 20"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

interface SellerFaqReviewsProps {
  data?: any;
  sellerData?: any;
}

export default function SellerFaqReviews({ data, sellerData }: SellerFaqReviewsProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Trích xuất thông tin người tạo công việc từ API
  const sellerInfo = sellerData || data;
  const sellerName = sellerInfo?.tenNguoiTao || sellerInfo?.nguoiTao?.name || "nofilrazzaq";
  const sellerAvatar =
    sellerInfo?.avatar ||
    sellerInfo?.nguoiTao?.avatar ||
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80";
  const ratingStars = sellerInfo?.saoCongViec || sellerInfo?.congViec?.saoCongViec || 5;
  const ratingCount = sellerInfo?.danhGia || sellerInfo?.congViec?.danhGia || 363;

  const faqList = [
    {
      question: "Do you provide regular updates on order?",
      answer: "Yes, I provide daily updates and progress reports during the project development.",
    },
    {
      question: "How do you guarantee product quality and reliability?",
      answer: "I thoroughly test all components, cross-browser compatibility, and responsiveness before delivery.",
    },
    {
      question: "Do you give post-development support?",
      answer: "Yes, I offer free support after project completion to fix any unexpected bugs.",
    },
    {
      question: "Do you convert PSD to HTML?",
      answer: "Yes, I can convert PSD, Figma, XD, or Sketch designs into clean, responsive HTML/CSS/JS code.",
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto py-6 font-sans space-y-10 text-gray-800">
      {/* 1. ABOUT THE SELLER */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900">About The Seller</h2>

        <div className="flex items-start gap-4">
          <div className="relative">
            <img
              src={sellerAvatar}
              alt="Seller avatar"
              className="w-16 h-16 rounded-full object-cover border border-gray-200"
            />
            <span className="absolute -bottom-1 -right-1 bg-amber-500 text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded-full border border-white">
              TOP RATED
            </span>
          </div>

          <div className="space-y-1">
            <h3 className="font-bold text-gray-900 text-base">{sellerName}</h3>
            <p className="text-sm text-gray-500">Web Developer</p>
            <div className="flex items-center gap-1 text-xs">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} filled={i < ratingStars} />
                ))}
              </div>
              <span className="font-bold text-amber-500">{ratingStars}</span>
              <span className="text-gray-400">({ratingCount})</span>
            </div>

            <button
              type="button"
              className="mt-2 border border-gray-800 hover:bg-gray-800 hover:text-white font-semibold text-xs px-4 py-1.5 rounded transition-colors cursor-pointer"
            >
              Contact Me
            </button>
          </div>
        </div>
      </div>

      {/* 2. FAQ */}
      <div className="space-y-3">
        <h2 className="text-lg font-bold text-gray-900">FAQ</h2>

        <div className="divide-y divide-gray-200 border-t border-b border-gray-200">
          {faqList.map((faq, idx) => (
            <div key={idx} className="py-3.5">
              <button
                type="button"
                onClick={() => toggleFaq(idx)}
                className="w-full flex justify-between items-center text-left font-semibold text-sm text-gray-700 hover:text-gray-900 cursor-pointer"
              >
                <span>{faq.question}</span>
                <ChevronDownIcon isOpen={openFaq === idx} />
              </button>
              {openFaq === idx && (
                <p className="mt-2 text-xs text-gray-500 leading-relaxed">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 3. REVIEWS & RATING BREAKDOWN */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-gray-900">{ratingCount} Reviews</h2>
            <div className="flex items-center gap-1 text-sm font-bold text-amber-500">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} filled={i < ratingStars} />
                ))}
              </div>
              <span>{ratingStars}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>Sort By</span>
            <select className="border border-gray-300 rounded px-2 py-1 font-semibold text-gray-700 focus:outline-none">
              <option>Most relevant</option>
              <option>Most recent</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs">
          <div className="space-y-2">
            {[
              { star: 5, count: ratingCount, percent: 99 },
              { star: 4, count: 2, percent: 1 },
              { star: 3, count: 0, percent: 0 },
              { star: 2, count: 0, percent: 0 },
              { star: 1, count: 0, percent: 0 },
            ].map((item) => (
              <div key={item.star} className="flex items-center gap-3">
                <span className="w-12 text-gray-600 font-semibold">
                  {item.star} Stars
                </span>
                <div className="flex-1 bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-amber-400 h-full rounded-full"
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
                <span className="w-8 text-right text-gray-400">
                  ({item.count})
                </span>
              </div>
            ))}
          </div>

          <div className="space-y-2 text-gray-500">
            <h4 className="font-bold text-gray-800 mb-3">Rating Breakdown</h4>
            {[
              { title: "Seller communication level", score: ratingStars.toString() },
              { title: "Recommend to a friend", score: ratingStars.toString() },
              { title: "Service as described", score: ratingStars.toString() },
            ].map((rating, idx) => (
              <div key={idx} className="flex justify-between items-center">
                <span>{rating.title}</span>
                <div className="flex items-center gap-1 font-bold text-gray-700">
                  <span>{rating.score}</span>
                  <StarIcon />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200 space-y-2">
          <h4 className="text-xs font-bold text-gray-800">Filters</h4>
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <span>Industry</span>
            <select className="border border-gray-300 rounded px-2 py-1 font-semibold text-gray-700 focus:outline-none">
              <option>All Industries</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
