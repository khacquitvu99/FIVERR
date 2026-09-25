"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { fetchJobDetail } from "@/component/detail-job/slice";

import Slider from "@/component/detail-job/Detail-Slider";
import Pricing from "@/component/detail-job/menu-pricing";
import Content from "@/component/detail-job/content";
import About from "@/component/detail-job/about-seller";
import Comment from "@/component/detail-job/comment";

interface DetailJobBodyProps {
  jobId: string;
  data?: any;
}

export default function DetailJobBody({ jobId, data }: DetailJobBodyProps) {
  const dispatch = useDispatch<AppDispatch>();

  // 1. Cập nhật Selector trỏ đúng vào sub-state `detail` trong Redux store
  const {
    data: jobDetail,
    loading,
    error,
  } = useSelector((state: RootState) => state.jobDetail.detail);

  useEffect(() => {
    if (jobId) {
      dispatch(fetchJobDetail(jobId));
    }
  }, [jobId, dispatch]);

  // Ưu tiên dữ liệu Redux, fallback về prop data
  const rawData = jobDetail || data;

  if (loading && !rawData) {
    return (
      <div className="text-center py-12">Đang tải chi tiết công việc...</div>
    );
  }

  if (error && !rawData) {
    return (
      <div className="text-center py-12 text-red-500">
        Có lỗi xảy ra: {error}
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8 font-sans bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* CỘT TRÁI */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-8">
            <Slider data={rawData} />
            <hr className="border-gray-200" />
            <Content data={rawData} />
            <hr className="border-gray-200" />
            <About data={rawData} />
            <hr className="border-gray-200" />
            {/* Component Comment đã có jobId để tự gọi dispatch(fetchComments) */}
            <Comment maCongViec={Number(jobId)} data={rawData} />
          </div>

          {/* CỘT PHẢI - PRICING */}
          <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-6 space-y-6">
            <Pricing data={rawData} />
          </div>
        </div>
      </div>
    </div>
  );
}
