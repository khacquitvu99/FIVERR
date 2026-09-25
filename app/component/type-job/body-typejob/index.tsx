"use client";

import React from "react";
import { useAppSelector } from "@/store/hooks";
import CategoryCard from "@/component/type-job/card-typejob"; // Nhập component vừa tạo

export default function ExploreCategorySection() {
  const { jobsByDetailType, hoveredSubCategory } = useAppSelector(
    (state) => state.jobDetailType
  );
  const { data: categories, loading, error } = jobsByDetailType;

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          {hoveredSubCategory.name
            ? `Explore ${hoveredSubCategory.name}`
            : "Explore Categories"}
        </h2>
        {hoveredSubCategory.name && (
          <p className="text-sm text-gray-500 mt-1">
            Hiển thị danh sách nhóm dịch vụ liên quan
          </p>
        )}
      </div>

      {/* UI Trạng thái */}
      {loading && <LoadingSkeleton />}
      {error && !loading && <ErrorMessage message={error} />}
      {!hoveredSubCategory.id && !loading && (
        <div className="p-12 text-center bg-gray-50 rounded-xl text-gray-500 border border-dashed border-gray-300">
          Rê chuột vào các danh mục trên menu để xem danh sách chi tiết.
        </div>
      )}

      {/* Hiển thị danh sách qua Card */}
      {!loading && categories && categories.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {categories.map((group: any) => (
            <CategoryCard key={group.id} item={group} />
          ))}
        </div>
      )}

      {!loading && categories && categories.length === 0 && (
        <div className="p-8 text-center text-gray-500">Chưa có dữ liệu.</div>
      )}
    </section>
  );
}

/* Các sub-component phụ trợ giúp code sạch hơn */
function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 animate-pulse">
      {[1, 2, 3, 4].map((n) => (
        <div key={n} className="flex flex-col gap-4">
          <div className="w-full h-48 bg-gray-200 rounded-xl"></div>
          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm">
      {message}
    </div>
  );
}