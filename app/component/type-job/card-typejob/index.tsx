"use client";

import React from "react";
import Link from "next/link";
import { useAppSelector } from "@/store/hooks";

export default function ExploreCategorySection() {
  const { jobsByDetailType, hoveredSubCategory } = useAppSelector(
    (state) => state.jobDetailType
  );

  const { data: jobs, loading, error } = jobsByDetailType;

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-8">
      {/* Tiêu đề hiển thị theo Item đang được hover */}
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          {hoveredSubCategory.name
            ? `Explore ${hoveredSubCategory.name}`
            : "Explore Categories"}
        </h2>
        {hoveredSubCategory.name && (
          <p className="text-sm text-gray-500 mt-1">
            Hiển thị danh sách công việc liên quan
          </p>
        )}
      </div>

      {/* Trạng thái Loading */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-pulse">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="bg-gray-200 h-64 rounded-xl"></div>
          ))}
        </div>
      )}

      {/* Trạng thái Error */}
      {error && !loading && (
        <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Trạng thái chưa chọn Item nào */}
      {!hoveredSubCategory.id && !loading && (
        <div className="p-12 text-center bg-gray-50 rounded-xl text-gray-500 border border-dashed border-gray-300">
          Rê chuột vào các danh mục trên menu để xem danh sách công việc chi tiết tại đây.
        </div>
      )}

      {/* Danh sách công việc khi có dữ liệu */}
      {!loading && jobs && jobs.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {jobs.map((item) => (
            <Link
              key={item.id}
              href={`/job-detail/${item.id}`}
              className="group border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 bg-white flex flex-col"
            >
              {/* Hình ảnh công việc */}
              <div className="relative w-full h-44 bg-gray-100 overflow-hidden">
                <img
                  src={item.congViec?.hinhAnh || "/placeholder.png"}
                  alt={item.congViec?.tenCongViec || "job"}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Thông tin chi tiết */}
              <div className="p-4 flex flex-col flex-1 justify-between gap-3">
                <div className="flex items-center gap-2">
                  <img
                    src={item.avatar || "/placeholder.png"}
                    alt={item.tenNguoiTao}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <span className="text-xs font-semibold text-gray-700 truncate">
                    {item.tenNguoiTao || "Seller"}
                  </span>
                </div>

                <h3 className="text-sm font-medium text-gray-800 line-clamp-2 group-hover:text-green-600 transition-colors">
                  {item.congViec?.tenCongViec}
                </h3>

                <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs">
                  <div className="flex items-center text-amber-500 font-bold gap-1">
                    ★ <span>{item.congViec?.saoCongViec || 5}</span>
                    <span className="text-gray-400 font-normal">
                      ({item.congViec?.danhGia || 0})
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-gray-400 uppercase font-semibold block">STARTING AT</span>
                    <span className="text-base font-bold text-gray-900">
                      ${item.congViec?.giaTien}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Trạng thái không tìm thấy dữ liệu */}
      {!loading && jobs && jobs.length === 0 && (
        <div className="p-8 text-center text-gray-500">
          Chưa có công việc nào thuộc danh mục này.
        </div>
      )}
    </section>
  );
}