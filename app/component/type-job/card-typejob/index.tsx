"use client";

import React from "react";
import Link from "next/link";

interface SubCategory {
  id: number | string;
  tenChiTiet: string;
}

interface CategoryCardProps {
  item: {
    id: number | string;
    tenNhom?: string;
    tenChiTiet?: string;
    hinhAnh?: string;
    congViec?: {
      hinhAnh?: string;
      tenCongViec?: string;
    };
    dsChiTietLoai?: SubCategory[];
  };
}

export default function CategoryCard({ item }: CategoryCardProps) {
  const title = item.tenNhom || item.tenChiTiet || item.congViec?.tenCongViec;
  const image = item.hinhAnh || item.congViec?.hinhAnh || "/placeholder.png";

  return (
    <div className="flex flex-col gap-3">
      {/* Hình ảnh */}
      <div className="relative w-full h-48 rounded-xl overflow-hidden bg-[#e8f8f0]">
        <img
          src={image}
          alt={title || "category"}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Tiêu đề */}
      <h3 className="text-xl font-bold text-gray-900 mt-1">{title}</h3>

      {/* Danh sách danh mục con */}
      {item.dsChiTietLoai && item.dsChiTietLoai.length > 0 ? (
        <ul className="flex flex-col gap-2.5">
          {item.dsChiTietLoai.map((sub) => (
            <li key={sub.id}>
              <Link
                href={`/list-job/${sub.id}`}
                className="text-gray-600 hover:text-gray-900 text-base transition-colors inline-block"
              >
                {sub.tenChiTiet}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <Link
          href={`/job-detail/${item.id}`}
          className="text-gray-600 hover:text-green-600 text-sm font-medium transition-colors"
        >
          Xem chi tiết →
        </Link>
      )}
    </div>
  );
}
