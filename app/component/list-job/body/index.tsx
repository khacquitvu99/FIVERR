"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Card from "@/component/list-job/card";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchJobsByName,
  fetchAllJobs,
  fetchJobsByDetailType,
} from "@/component/list-job/slice";

// Chuẩn hoá về mảng công việc, kể cả khi API bọc dữ liệu trong dsCongViec
const extractJobs = (content: any): any[] => {
  if (!content) return [];
  if (Array.isArray(content)) {
    if (content.length && Array.isArray(content[0]?.dsCongViec)) {
      return content.flatMap((c: any) => c.dsCongViec);
    }
    return content;
  }
  if (Array.isArray(content.dsCongViec)) return content.dsCongViec;
  return [];
};

export default function ListJobBody() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const categoryQuery = searchParams.get("category") || "";
  const detailType = searchParams.get("detailType") || ""; // ID sub-item từ Nav
  const detailName = searchParams.get("name") || ""; // Tên sub-item từ Nav

  const dispatch = useAppDispatch();

  // Quản lý trạng thái phân trang (12 items / trang)
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 12;

  // Lấy dữ liệu từ Redux Store
  const { searchResults, jobsByDetailType } = useAppSelector(
    (state) => state.job
  );

  // Có detailType thì đọc từ jobsByDetailType, ngược lại đọc từ searchResults
  const source = detailType ? jobsByDetailType : searchResults;
  const { data, loading, error } = source;
  const jobList = extractJobs(data);

  // Reset về trang 1 và fetch dữ liệu khi tham số trên URL thay đổi
  useEffect(() => {
    setCurrentPage(1);

    if (detailType) {
      dispatch(fetchJobsByDetailType(detailType));
      return;
    }

    const keyword = categoryQuery.trim() || searchQuery.trim();
    if (keyword) {
      dispatch(fetchJobsByName(keyword));
    } else {
      dispatch(fetchAllJobs());
    }
  }, [searchQuery, categoryQuery, detailType, dispatch]);

  // Tính toán dữ liệu phân trang
  const totalItems = jobList.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentJobs = jobList.slice(startIndex, startIndex + itemsPerPage);

  // Hàm chuyển trang & tự động scroll lên đầu
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Tiêu đề: ưu tiên sub-item > category > search > tất cả
  const heading = detailType ? detailName || "Services" : categoryQuery;

  return (
    <div className="w-full bg-white flex flex-col gap-6 pb-16">
      <div className="max-w-7xl mx-auto px-6 w-full">
        {/* Header hiển thị tiêu đề linh hoạt theo ngữ cảnh */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between my-4 gap-2">
          {heading ? (
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{heading}</h2>
              <p className="text-sm text-gray-500">
                Explore services related to {heading}
              </p>
            </div>
          ) : searchQuery.trim() ? (
            <h2 className="text-xl font-bold text-gray-800">
              Results for{" "}
              <span className="text-green-600">&quot;{searchQuery}&quot;</span>
            </h2>
          ) : (
            <h2 className="text-xl font-bold text-gray-800">All Services</h2>
          )}

          {!loading && totalItems > 0 && (
            <span className="text-sm font-semibold text-gray-500">
              {totalItems.toLocaleString()} services available
            </span>
          )}
        </div>

        {/* Trạng thái loading */}
        {loading && (
          <div className="text-center py-16 text-gray-500 font-medium">
            Đang tải danh sách công việc...
          </div>
        )}

        {/* Trạng thái lỗi */}
        {!loading && error && (
          <div className="text-center py-16 text-red-500 font-medium">
            {String(error)}
          </div>
        )}

        {/* Trạng thái không tìm thấy kết quả */}
        {!loading && !error && totalItems === 0 && (
          <div className="text-center py-16 text-gray-500">
            <p className="text-lg font-semibold mb-1">
              {heading || searchQuery.trim()
                ? `Không tìm thấy công việc phù hợp với từ khóa.`
                : "Hiện chưa có công việc nào."}
            </p>
            <p className="text-sm text-gray-400">
              Hãy thử lại bằng một danh mục hoặc từ khóa khác.
            </p>
          </div>
        )}

        {/* Render danh sách công việc */}
        {!loading && currentJobs.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {currentJobs.map((item: any, index: number) => (
                <Card key={item.id || index} jobData={item} />
              ))}
            </div>

            {/* Bộ điều hướng phân trang (Pagination Bar) */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="w-9 h-9 flex items-center justify-center rounded border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  &lt;
                </button>

                {Array.from({ length: totalPages }, (_, index) => {
                  const pageNum = index + 1;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`w-9 h-9 text-sm font-semibold rounded border transition ${
                        currentPage === pageNum
                          ? "bg-black text-white border-black"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="w-9 h-9 flex items-center justify-center rounded border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  &gt;
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}