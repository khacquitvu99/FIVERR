import React from "react";

const categories = [
  {
    name: "Graphics & Design",
    icon: (
      <svg
        className="w-12 h-12"
        fill="none"
        viewBox="0 0 40 40"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          stroke="#222325"
          d="M16 11l-4 4m0 0l-4-4m4 4V3m12 8l-4 4m0 0l-4-4m4 4V3"
        />
        <circle cx="20" cy="28" r="8" stroke="#1dbf73" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    name: "Digital Marketing",
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 40 40">
        <rect
          x="6"
          y="8"
          width="28"
          height="20"
          rx="2"
          stroke="#222325"
          strokeWidth="1.5"
        />
        <path
          d="M16 32h8m-4-4v4"
          stroke="#222325"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="20" cy="18" r="4" stroke="#1dbf73" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    name: "Writing & Translation",
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 40 40">
        <path d="M10 8h20v24H10z" stroke="#222325" strokeWidth="1.5" />
        <path
          d="M14 14h12m-12 6h8"
          stroke="#1dbf73"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    name: "Video & Animation",
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 40 40">
        <rect
          x="6"
          y="10"
          width="28"
          height="20"
          rx="2"
          stroke="#222325"
          strokeWidth="1.5"
        />
        <path d="M17 16l8 4-8 4v-8z" fill="#1dbf73" />
      </svg>
    ),
  },
  {
    name: "Music & Audio",
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 40 40">
        <path
          d="M16 26a3 3 0 100-6 3 3 0 000 6zm10-4a3 3 0 100-6 3 3 0 000 6z"
          stroke="#1dbf73"
          strokeWidth="1.5"
        />
        <path
          d="M19 23V10l10-2v13"
          stroke="#222325"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    name: "Programming & Tech",
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 40 40">
        <rect
          x="6"
          y="10"
          width="28"
          height="20"
          rx="2"
          stroke="#222325"
          strokeWidth="1.5"
        />
        <path
          d="M14 18l-3 2 3 2m12-4l3 2-3 2m-8 1l2-6"
          stroke="#1dbf73"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    name: "Business",
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 40 40">
        <rect
          x="8"
          y="14"
          width="24"
          height="18"
          rx="2"
          stroke="#222325"
          strokeWidth="1.5"
        />
        <path
          d="M15 14v-4a2 2 0 012-2h6a2 2 0 012 2v4"
          stroke="#1dbf73"
          strokeWidth="1.5"
        />
      </svg>
    ),
  },
  {
    name: "Lifestyle",
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 40 40">
        <path
          d="M12 28a8 8 0 1016 0V12H12v16z"
          stroke="#222325"
          strokeWidth="1.5"
        />
        <path
          d="M28 16h3a3 3 0 013 3v2a3 3 0 01-3 3h-3"
          stroke="#1dbf73"
          strokeWidth="1.5"
        />
      </svg>
    ),
  },
  {
    name: "Data",
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 40 40">
        <path
          d="M10 28v-6m10 6V12m10 16v-10"
          stroke="#1dbf73"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M6 32h28"
          stroke="#222325"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

export default function MarketplaceCategories() {
  return (
    <div className="mx-auto px-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-10">
        Explore the marketplace
      </h2>

      {/* Responsive Grid: 2 cột trên điện thoại, 5 cột trên máy tính */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
        {categories.map((cat, index) => (
          <a
            key={index}
            href="#"
            className="group flex flex-col items-center text-center space-y-3 p-4 rounded-lg transition duration-200"
          >
            {/* Box chứa Icon */}
            <div className="relative flex items-center justify-center">
              {cat.icon}
              {/* Thanh gạch chân xanh ngắn xuất hiện khi Hover */}
              <div className="absolute -bottom-2 w-0 h-0.5 bg-[#1dbf73] transition-all duration-300 group-hover:w-12" />
            </div>

            {/* Tên Danh mục */}
            <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
              {cat.name}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
