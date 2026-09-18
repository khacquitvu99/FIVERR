"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchMenuCategories,
  fetchJobsByName,
  clearSearchResults,
} from "@/component/list-job/slice";
<<<<<<< HEAD
import {
  fetchJobsByDetailType,
  setHoveredSubCategory,
} from "@/component/type-job/slice";

const suggestions = ["App", "HTML", "Website", "Logo design", "JavaScript", "Marketing", "CSS"];
=======

const suggestions = [
  "App",
  "HTML",
  "Website",
  "Logo design",
  "JavaScript",
  "Marketing",
  "CSS",
];
>>>>>>> 08908376300fac491f4357334bbd4a624a8f9d71

export default function Nav() {
  const searchParams = useSearchParams();
  const querySearch = searchParams.get("search") || "";

  const [keyword, setKeyword] = useState<string>(querySearch);
  const [isOpenSearchDropdown, setIsOpenSearchDropdown] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const router = useRouter();

<<<<<<< HEAD
=======
  // Đồng bộ ô Input với search query
>>>>>>> 08908376300fac491f4357334bbd4a624a8f9d71
  useEffect(() => {
    setKeyword(querySearch);
  }, [querySearch]);

  const { data: categories, loading: loadingCat } = useAppSelector(
    (state) => state.job.menuCategories
  );
<<<<<<< HEAD

=======
>>>>>>> 08908376300fac491f4357334bbd4a624a8f9d71
  const { data: searchResults, loading: loadingSearch } = useAppSelector(
    (state) => state.job.searchResults
  );

  useEffect(() => {
    dispatch(fetchMenuCategories());
  }, [dispatch]);

  useEffect(() => {
    if (!keyword.trim()) {
      dispatch(clearSearchResults());
      setIsOpenSearchDropdown(false);
      return;
    }

    const timer = setTimeout(() => {
      dispatch(fetchJobsByName(keyword.trim()));
    }, 300);

    return () => clearTimeout(timer);
  }, [keyword, dispatch]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOpenSearchDropdown(false);
<<<<<<< HEAD
=======

>>>>>>> 08908376300fac491f4357334bbd4a624a8f9d71
    if (!keyword.trim()) {
      router.push("/list-job");
    } else {
      router.push(`/list-job?search=${encodeURIComponent(keyword.trim())}`);
    }
  };

<<<<<<< HEAD
  // Hàm xử lý Hover vào Chi tiết loại công việc
  const handleItemHover = (id: number | string, name: string) => {
    dispatch(setHoveredSubCategory({ id, name }));
    dispatch(fetchJobsByDetailType(id));
  };

=======
>>>>>>> 08908376300fac491f4357334bbd4a624a8f9d71
  return (
    <nav className="w-full bg-gray-100 text-gray-800 border-b relative z-50">
      {/* HEADER CHÍNH */}
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-6">
        <div className="flex items-center gap-6 flex-1 max-w-2xl">
          <Link href="/">
            <span className="text-2xl font-black tracking-tighter text-gray-900 cursor-pointer">
              fiverr<span className="text-green-500">.</span>
            </span>
          </Link>

<<<<<<< HEAD
=======
          {/* Ô Tìm Kiếm */}
>>>>>>> 08908376300fac491f4357334bbd4a624a8f9d71
          <div className="relative flex-1">
            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center rounded-md overflow-hidden border border-gray-300 focus-within:border-gray-500 bg-white shadow-sm"
            >
              <div className="pl-3 text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onFocus={() => keyword.trim() && setIsOpenSearchDropdown(true)}
                onBlur={() => setTimeout(() => setIsOpenSearchDropdown(false), 200)}
                placeholder="What service are you looking for today?"
                className="w-full py-1.5 px-3 text-sm outline-none bg-transparent text-gray-800 placeholder-gray-400"
              />

              <button
                type="submit"
                className="bg-[#1dbf73] hover:bg-[#19a463] text-white font-semibold px-5 py-1.5 text-sm transition whitespace-nowrap"
              >
                Search
              </button>
            </form>

<<<<<<< HEAD
=======
            {/* Dropdown Hiển Thị Gợi Ý Tìm Kiếm */}
>>>>>>> 08908376300fac491f4357334bbd4a624a8f9d71
            {isOpenSearchDropdown && (
              <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-80 overflow-y-auto">
                {loadingSearch ? (
                  <div className="p-3 text-xs text-gray-400 text-center">Đang tìm kiếm...</div>
                ) : searchResults && searchResults.length > 0 ? (
                  <ul className="divide-y divide-gray-100">
<<<<<<< HEAD
                    {searchResults.map((item) => (
=======
                    {searchResults.map((item: any) => (
>>>>>>> 08908376300fac491f4357334bbd4a624a8f9d71
                      <li key={item.id}>
                        <Link
                          href={`/job-detail/${item.id}`}
                          onClick={() => setIsOpenSearchDropdown(false)}
                          className="p-2.5 hover:bg-gray-50 flex items-center gap-3 transition cursor-pointer"
                        >
                          <img
                            src={item.congViec?.hinhAnh || "/placeholder.png"}
                            alt={item.congViec?.tenCongViec || "job"}
                            className="w-10 h-10 object-cover rounded"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-gray-800 truncate">
                              {item.congViec?.tenCongViec}
                            </p>
                            <p className="text-[11px] text-gray-500">
                              ${item.congViec?.giaTien} • ★ {item.congViec?.saoCongViec}
                            </p>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="p-3 text-xs text-gray-500 text-center">Không tìm thấy công việc phù hợp</div>
                )}
              </div>
            )}
          </div>
        </div>

<<<<<<< HEAD
        <div className="flex items-center gap-6 text-sm font-semibold text-gray-600">
          <a href="#" className="hover:text-green-600 transition">Become a Seller</a>
          <Link href="/form-signin" className="hover:text-green-600 transition">Sign In</Link>
          <Link href="/form-login">
=======
        {/* Action Buttons */}
        <div className="flex items-center gap-6 text-sm font-semibold text-gray-600">
          <a href="#" className="hover:text-green-600 transition">Become a Seller</a>
          <Link href="./form-signin" className="hover:text-green-600 transition">Sign In</Link>
          <Link href="./form-login">
>>>>>>> 08908376300fac491f4357334bbd4a624a8f9d71
            <button className="border border-green-500 text-green-600 hover:bg-green-600 hover:text-white px-4 py-1.5 rounded font-semibold text-sm transition">
              Join
            </button>
          </Link>
        </div>
      </div>

<<<<<<< HEAD
      {/* MEGA DROPDOWN MENU */}
=======
      {/* MENU DANH MỤC (MEGA DROPDOWN) */}
>>>>>>> 08908376300fac491f4357334bbd4a624a8f9d71
      <div className="max-w-7xl mx-auto px-6 relative border-t border-gray-200">
        {loadingCat ? (
          <div className="text-xs text-gray-400 py-2.5">Đang tải danh mục...</div>
        ) : (
          <ul className="flex items-center justify-between gap-6 overflow-x-auto text-sm text-gray-600">
            {categories?.map((cat) => (
              <li key={cat.id} className="group py-2.5">
<<<<<<< HEAD
                <Link href={`/type-job?typeId=${cat.id}`}>
                  <span className="hover:text-green-600 cursor-pointer transition font-medium whitespace-nowrap group-hover:border-b-2 group-hover:border-green-500 pb-2">
                    {cat.tenLoaiCongViec}
                  </span>
                </Link>
=======
                <span className="hover:text-green-600 cursor-pointer transition font-medium whitespace-nowrap group-hover:border-b-2 group-hover:border-green-500 pb-2">
                  {cat.tenLoaiCongViec}
                </span>
>>>>>>> 08908376300fac491f4357334bbd4a624a8f9d71

                {cat.dsNhomChiTietLoai && cat.dsNhomChiTietLoai.length > 0 && (
                  <div className="absolute left-0 top-full w-full bg-[#e5e5e5] text-gray-800 shadow-xl border-t border-gray-300 opacity-0 invisible translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 ease-in-out z-50">
                    <div className="max-w-7xl mx-auto px-8 py-6 grid grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-6 max-h-112.5 overflow-y-auto">
                      {cat.dsNhomChiTietLoai.map((group) => (
                        <div key={group.id} className="space-y-3">
                          <h4 className="font-bold text-gray-900 text-sm tracking-tight">
                            {group.tenNhom}
                          </h4>
<<<<<<< HEAD
                          <ul className="space-y-2 text-xs md:text-sm text-gray-600 font-normal">
                            {group.dsChiTietLoai?.map((detail) => (
                              <li key={detail.id}>
                                <Link
                                  href={`/type-job?detailId=${detail.id}&name=${encodeURIComponent(detail.tenChiTiet)}`}
                                  onMouseEnter={() => handleItemHover(detail.id, detail.tenChiTiet)}
                                  className="hover:text-black hover:underline transition-colors block py-0.5"
=======

                          <ul className="space-y-2 text-xs md:text-sm text-gray-600 font-normal">
                            {group.dsChiTietLoai?.map((detail) => (
                              <li key={detail.id}>
                                {/* CHUYỂN HƯỚNG BẰNG CATEGORY PARAM - KHÔNG QUA Ô INPUT SEARCH */}
                                <Link
                                  href={`/list-job?category=${encodeURIComponent(detail.tenChiTiet)}&detailId=${detail.id}`}
                                  className="hover:text-black transition-colors block py-0.5"
>>>>>>> 08908376300fac491f4357334bbd4a624a8f9d71
                                >
                                  {detail.tenChiTiet}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* SUGGESTED TAGS */}
      <div className="w-full bg-gray-100 border-t border-gray-200 py-2">
        <div className="max-w-7xl mx-auto px-6 flex items-center gap-2 overflow-x-auto text-sm">
          <span className="font-bold text-gray-700 mr-1 text-xs">Suggested:</span>
          {suggestions.map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setKeyword(item);
                router.push(`/list-job?search=${encodeURIComponent(item)}`);
              }}
              className="bg-white border border-gray-300 hover:bg-gray-200 text-gray-600 text-xs font-medium px-3 py-1 rounded-md transition whitespace-nowrap shadow-sm"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}