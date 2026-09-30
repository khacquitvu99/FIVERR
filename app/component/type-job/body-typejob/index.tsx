"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import {
  fetchChiTietLoaiCongViec,
  fetchCongViecTheoChiTietLoai,
  clearTypeJobState,
} from "@/component/type-job/slice";

import CategoryCard from "@/component/type-job/card-typejob";

export default function TypeJobBody() {
  const searchParams = useSearchParams();
  const typeId =
    searchParams.get("typeId") || searchParams.get("maLoaiCongViec") || "1";
  const typeName = searchParams.get("name") || "";

  const [selectedSubName, setSelectedSubName] = useState<string>("");

  const dispatch = useAppDispatch();

  // Đọc state từ Redux store (key jobDetailType)
  const { categories, jobsBySubDetail } = useAppSelector(
    (state) => state.jobDetailType,
  );

  // 1. Gọi API lấy nhóm và danh sách chi tiết loại khi vào trang
  useEffect(() => {
    if (typeId) {
      dispatch(fetchChiTietLoaiCongViec(typeId));
    }
    return () => {
      dispatch(clearTypeJobState());
    };
  }, [typeId, dispatch]);

  // 2. Xử lý khi bấm vào 1 Chi tiết loại công việc
  const handleSelectSubCategory = (subId: number | string, subName: string) => {
    setSelectedSubName(subName);
    dispatch(fetchCongViecTheoChiTietLoai(subId));
  };

  return (
    <div className="w-full bg-white min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        {/* Banner Title */}
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">
            Explore {typeName || "Graphics & Design"}
          </h1>
          <p className="text-gray-500 mt-2">
            Khám phá các dịch vụ và công việc thuộc danh mục này.
          </p>
        </div>

        {/* Khối 1: Danh sách Nhóm & Chi tiết loại công việc (API 1) */}
        {categories.loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 animate-pulse">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-48 bg-gray-200 rounded-xl" />
            ))}
          </div>
        ) : categories.error ? (
          <div className="p-4 bg-red-50 text-red-600 rounded-lg">
            {categories.error}
          </div>
        ) : (
          categories.data && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {categories.data?.dsNhomChiTietLoai?.map((groupItem: any) => (
                <CategoryCard
                  key={groupItem.id}
                  item={groupItem}
                  onSelectSubCategory={handleSelectSubCategory}
                  selectedSubId={jobsBySubDetail.selectedSubId}
                />
              ))}
            </div>
          )
        )}

        {/* Khối 2: Danh sách Công việc */}
        {jobsBySubDetail.selectedSubId ? (
          <div className="pt-10 border-t border-gray-200 space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Danh sách công việc cho:{" "}
              <span className="text-green-600">{selectedSubName}</span>
            </h2>

            {jobsBySubDetail.loading ? (
              /* Skeleton Loading khi đang tải jobs */
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-pulse">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-64 bg-gray-100 rounded-lg" />
                ))}
              </div>
            ) : jobsBySubDetail.error ? (
              <div className="p-4 bg-red-50 text-red-600 rounded-lg text-center">
                {jobsBySubDetail.error}
              </div>
            ) : jobsBySubDetail.data && jobsBySubDetail.data.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {jobsBySubDetail.data.map((job: any) => (
                  <div
                    key={job.id}
                    className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition bg-white"
                  >
                    <img
                      src={
                        job.congViec?.hinhAnh ||
                        job.hinhAnh ||
                        "https://picsum.photos/300/200"
                      }
                      alt={job.congViec?.tenCongViec || job.tenCongViec}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-4">
                      <h4 className="font-bold text-gray-800 line-clamp-2">
                        {job.congViec?.tenCongViec || job.tenCongViec}
                      </h4>
                      <p className="text-sm text-gray-500 mt-2">
                        Đánh giá: ⭐ {job.congViec?.danhGia || job.danhGia || 5}
                      </p>
                      <p className="text-green-600 font-bold mt-2">
                        ${job.congViec?.giaTien || job.giaTien || 50}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Thông báo khi danh mục chọn chưa có bài đăng */
              <div className="py-12 text-center bg-gray-50 rounded-xl border border-dashed border-gray-200">
                <p className="text-gray-500 font-medium">
                  Chưa có công việc nào thuộc chi tiết loại này.
                </p>
              </div>
            )}
          </div>
        ) : (
          /* GIAO DIỆN KHI CHƯA CHỌN DANH MỤC (Thay thế khoảng trắng) */
          <div className="pt-10 border-t border-gray-200">
            <div className="flex flex-col items-center justify-center py-12 px-4 bg-gray-50 rounded-2xl border border-dashed border-gray-300 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-800">
                Chọn một dịch vụ để xem danh sách công việc
              </h3>
              <p className="text-sm text-gray-500 max-w-md">
                Nhấp vào bất kỳ dịch vụ hoặc phụ mục ở khối phía trên để hiển
                thị các công việc liên quan.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
