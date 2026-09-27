"use client";

import React from "react";
import { useRouter } from "next/navigation";

const filterDropdowns = [
  "Category",
  "Service Options",
  "Seller Details",
  "Budget",
  "Delivery Time",
];

const suggestions = [
  "App",
  "HTML",
  "Website",
  "Logo design",
  "JavaScript",
  "Marketing",
  "CSS",
];

export default function FilterHeader() {
  const router = useRouter();

  const handleSuggestedClick = (term: string) => {
    router.push(`/list-job?search=${encodeURIComponent(term.trim())}`);
  };

  return (
    <div className="w-full bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-4 space-y-4">
        {/* TAG GỢI Ý (SUGGESTED) */}
        <div className="flex items-center gap-2 overflow-x-auto text-sm pt-2 border-t border-gray-100">
          <span className="font-bold text-gray-700 mr-1 text-xs whitespace-nowrap">
            Suggested:
          </span>
          {suggestions.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => handleSuggestedClick(item)}
              className="bg-gray-50 border border-gray-300 hover:bg-gray-200 text-gray-600 text-xs font-medium px-3 py-1 rounded-md transition whitespace-nowrap shadow-sm cursor-pointer"
            >
              {item}
            </button>
          ))}
        </div>

        {/* Filters Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Dropdown Filters */}
          <div className="flex flex-wrap items-center gap-3">
            {filterDropdowns.map((filter, idx) => (
              <button
                key={idx}
                className="border border-gray-300 hover:border-gray-400 text-gray-700 px-3.5 py-2 rounded-md text-sm font-semibold flex items-center gap-2 bg-white transition cursor-pointer"
              >
                {filter}
                <svg
                  className="w-4 h-4 text-gray-500"
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
              </button>
            ))}
          </div>

          {/* Toggle Switches */}
          <div className="flex items-center gap-6 text-sm text-gray-600 font-medium">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-9 h-5 bg-gray-300 peer-checked:bg-green-500 rounded-full relative transition after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-4"></div>
              <span>Pro services</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-9 h-5 bg-gray-300 peer-checked:bg-green-500 rounded-full relative transition after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-4"></div>
              <span>Local sellers</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-9 h-5 bg-gray-300 peer-checked:bg-green-500 rounded-full relative transition after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-4"></div>
              <span>Online sellers</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
