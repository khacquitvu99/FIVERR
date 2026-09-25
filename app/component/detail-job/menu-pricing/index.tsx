"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import api from "@/services/api";

interface PricingProps {
  data?: any;
}

type TabType = "basic" | "standard" | "premium";

export default function Pricing({ data }: PricingProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("standard");

  const { user } = useSelector((state: any) => state.auth || {});

  // API thường trả về mảng hoặc object chứa key congViec
  const targetData = Array.isArray(data) ? data[0] : data;
  const jobInfo = targetData?.congViec || targetData;

  const basePrice = jobInfo?.giaTien ?? 0;
  const moTaNgan = jobInfo?.moTaNgan || "30 Days Delivery 1 Revision";
  const tenCongViec = jobInfo?.tenCongViec || "Basic Web Development Package";
  const maCongViec = jobInfo?.id || targetData?.id;

  // Tính giá tiền dựa trên gói
  const priceMultiplier = {
    basic: 0.7,
    standard: 1,
    premium: 1.5,
  };
  const giaTien = Math.round(basePrice * priceMultiplier[activeTab]);

  // Cấu hình các tính năng cho từng gói
  const featuresConfig = [
    {
      label: "Design Customization",
      basic: true,
      standard: true,
      premium: true,
    },
    { label: "Content Upload", basic: false, standard: true, premium: true },
    { label: "Responsive Design", basic: true, standard: true, premium: true },
    {
      label: "Include Source Code",
      basic: false,
      standard: true,
      premium: true,
    },
    {
      label: "1 Year Free Support",
      basic: false,
      standard: false,
      premium: true,
    },
  ];

  const handleBooking = async () => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("userToken") : null;

    if (!user && !token) {
      alert("Vui lòng đăng nhập trước khi thuê công việc!");
      router.push("/form-login");
      return;
    }

    if (!maCongViec) {
      alert("Không tìm thấy mã công việc!");
      return;
    }

    try {
      setLoading(true);
      await api.post("thue-cong-viec", {
        maCongViec: Number(maCongViec),
        maNguoiThue: user?.id || 0,
        ngayThue: new Date().toISOString(),
        hoanThanh: false,
      });

      alert(`Thuê gói ${activeTab.toUpperCase()} thành công!`);
    } catch (error: any) {
      alert(error?.response?.data?.content || "Thuê công việc thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border border-gray-200 rounded-md bg-white p-6 shadow-sm">
      {/* Tabs Switcher */}
      <div className="flex border-b border-gray-200 -mx-6 -mt-6 mb-6">
        {(["basic", "standard", "premium"] as TabType[]).map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 text-center text-sm font-semibold capitalize transition-colors cursor-pointer ${
                isActive
                  ? "text-emerald-600 border-b-2 border-emerald-600"
                  : "text-gray-500 border-b-2 border-transparent hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Package Title & Price */}
      <div className="flex justify-between items-start gap-2 mb-4">
        <h3 className="font-bold text-gray-800 text-base line-clamp-2">
          Create the simple website
        </h3>
        <span className="text-2xl font-bold text-gray-900 shrink-0">
          ${giaTien}
        </span>
      </div>

      {/* Short Description */}
      <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-6 bg-gray-50 p-2.5 rounded">
        <svg
          className="w-4 h-4 text-gray-500 shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span className="text-xs text-gray-600 leading-tight">{moTaNgan}</span>
      </div>

      {/* Dynamic Features List */}
      <ul className="space-y-2.5 text-sm mb-6">
        {featuresConfig.map((item, index) => {
          const isEnabled = item[activeTab];
          return (
            <li
              key={index}
              className={`flex items-center gap-2 ${
                isEnabled
                  ? "text-gray-700"
                  : "text-gray-300 line-through select-none"
              }`}
            >
              <span
                className={`font-bold ${isEnabled ? "text-emerald-500" : "text-gray-300"}`}
              >
                {isEnabled ? "✓" : "✕"}
              </span>
              {item.label}
            </li>
          );
        })}
      </ul>

      {/* Submit Button */}
      <button
        type="button"
        onClick={handleBooking}
        disabled={loading}
        className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-4 rounded transition-colors mb-3 disabled:bg-gray-400 cursor-pointer"
      >
        {loading ? "Processing..." : `Continue ($${giaTien})`}
      </button>

      <button
        type="button"
        className="w-full text-center text-sm font-semibold text-emerald-600 hover:underline cursor-pointer"
      >
        Compare Packages
      </button>
      <div className="bg-[#f7f7f7] border border-gray-200 rounded p-6 text-center space-y-3">
        <p className="text-gray-800 font-bold text-sm">
          Do you have any special requirements?
        </p>
        <button
          type="button"
          className="px-4 py-1.5 bg-white border border-gray-600 rounded text-sm text-gray-700 font-semibold hover:bg-gray-50 transition-colors cursor-pointer"
        >
          Get a Quote
        </button>
      </div>
    </div>
  );
}
