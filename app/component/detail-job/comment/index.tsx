"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchComments, postComment } from "@/component/detail-job/slice";
import { AppDispatch, RootState } from "@/store";

interface CommentsProps {
  maCongViec: number;
  data?: any;
}

const ITEMS_PER_PAGE = 5; // Số lượng bình luận mỗi trang

export default function Comment({ maCongViec }: CommentsProps) {
  const dispatch = useDispatch<AppDispatch>();

  // Lấy dữ liệu bình luận và trạng thái từ Redux store
  const { data: comments = [], loading: loadingComments } = useSelector(
    (state: RootState) => state.jobDetail.comments,
  );
  const { loading: isPosting } = useSelector(
    (state: RootState) => state.jobDetail.postCommentStatus,
  );

  // State quản lý phân trang & form
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [noiDung, setNoiDung] = useState<string>("");
  const [saoBinhLuan, setSaoBinhLuan] = useState<number>(5);

  useEffect(() => {
    if (maCongViec) {
      dispatch(fetchComments(maCongViec));
    }
  }, [dispatch, maCongViec]);

  // Reset về trang 1 khi danh sách bình luận thay đổi
  useEffect(() => {
    setCurrentPage(1);
  }, [comments?.length]);

  // --- LOGIC PHÂN TRANG CLIENT-SIDE ---
  const safeComments = comments || [];
  const totalComments = safeComments.length;
  const totalPages = Math.ceil(totalComments / ITEMS_PER_PAGE);

  // Cắt danh sách 5 bình luận cho trang hiện tại
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentComments = safeComments.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // --- SUBMIT BÌNH LUẬN ---
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noiDung.trim()) return;

    const userString =
      typeof window !== "undefined" ? localStorage.getItem("user") : null;
    const user = userString ? JSON.parse(userString) : null;

    dispatch(
      postComment({
        maCongViec: Number(maCongViec),
        maNguoiBinhLuan: user?.id || 0,
        ngayBinhLuan: new Date().toISOString(),
        noiDung: noiDung.trim(),
        saoBinhLuan,
      }),
    ).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        setNoiDung("");
        setCurrentPage(1); // Chuyển về trang đầu để thấy bình luận mới nhất
      }
    });
  };

  return (
    <div className="w-full py-6 space-y-6">
      <h3 className="text-xl font-bold text-black">
        Bình luận ({totalComments})
      </h3>

      {/* DANH SÁCH BÌNH LUẬN */}
      {loadingComments ? (
        <p className="text-gray-500">Đang tải bình luận...</p>
      ) : currentComments.length === 0 ? (
        <p className="text-gray-500 italic">Chưa có bình luận nào.</p>
      ) : (
        <div className="space-y-4">
          {currentComments.map((item, index) => (
            <div
              key={item.id || index}
              className="p-4 border border-gray-100 rounded-lg space-y-2 bg-gray-50/50"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {item.avatar ? (
                    <img
                      src={item.avatar}
                      alt="avatar"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-semibold">
                      {(item.tenNguoiBinhLuan || "U").charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className="font-semibold text-gray-800">
                    {item.tenNguoiBinhLuan || "Người dùng"}
                  </span>
                </div>
                <span className="text-xs text-gray-400">
                  {item.ngayBinhLuan}
                </span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                {item.noiDung}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* NÚT PHÂN TRANG RÚT GỌN */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-1.5 pt-4 flex-wrap">
          {/* Nút Trước */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 text-sm border rounded hover:bg-gray-100 hover:text-black disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Trang trước
          </button>

          {/* Trang 1 */}
          {currentPage > 3 && (
            <>
              <button
                onClick={() => handlePageChange(1)}
                className="px-3 py-1 text-sm rounded border hover:bg-gray-100 hover:text-black border-gray-200"
              >
                1
              </button>
              {currentPage > 4 && (
                <span className="px-1 text-gray-400">...</span>
              )}
            </>
          )}

          {/* Các trang xung quanh currentPage */}
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(
              (page) => page >= currentPage - 2 && page <= currentPage + 2,
            )
            .map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 text-sm rounded border transition-colors ${
                  currentPage === page
                    ? "bg-black text-white border-black font-semibold"
                    : "hover:bg-gray-100 border-gray-200 text-gray-700"
                }`}
              >
                {page}
              </button>
            ))}

          {/* Trang Cuối */}
          {currentPage < totalPages - 2 && (
            <>
              {currentPage < totalPages - 3 && (
                <span className="px-1 text-gray-400">...</span>
              )}
              <button
                onClick={() => handlePageChange(totalPages)}
                className="px-3 py-1 text-sm rounded border hover:bg-gray-100 hover:text-black border-gray-200"
              >
                {totalPages}
              </button>
            </>
          )}

          {/* Nút Sau */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 text-sm border rounded hover:bg-gray-100 hover:text-black disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Trang sau
          </button>
        </div>
      )}

      
      {/* FORM GỬI BÌNH LUẬN */}
      <form
        onSubmit={handleSubmit}
        className="space-y-3 pt-6 border-t border-gray-200"
      >
        <textarea
          rows={3}
          value={noiDung}
          onChange={(e) => setNoiDung(e.target.value)}
          placeholder="Viết bình luận của bạn..."
          className="w-full p-3 border border-gray-300 text-black rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isPosting || !noiDung.trim()}
            className="px-5 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 disabled:bg-gray-300 transition-colors"
          >
            {isPosting ? "Đang gửi..." : "Gửi bình luận"}
          </button>
        </div>
      </form>
    </div>
  );
}
