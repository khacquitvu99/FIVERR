"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchMenuCategories,
  fetchJobsByName,
  clearSearchResults,
} from "@/component/list-job/slice";

const suggestions = [
  "App",
  "HTML",
  "Website",
  "Logo design",
  "JavaScript",
  "Marketing",
  "CSS",
];

export default function Nav() {
  const searchParams = useSearchParams();
  const querySearch = searchParams.get("search") || "";

  const [keyword, setKeyword] = useState<string>(querySearch);
  const [isOpenSearchDropdown, setIsOpenSearchDropdown] = useState(false);
  const [activeCategory, setActiveCategory] = useState<number | string | null>(
    null
  );

  const dispatch = useAppDispatch();
  const router = useRouter();

  const searchBoxRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { menuCategories, searchResults } = useAppSelector(
    (state) => state.job
  );

  // Đồng bộ ô input với URL (back/forward, click tag gợi ý...)
  useEffect(() => {
    setKeyword(querySearch);
  }, [querySearch]);

  useEffect(() => {
    dispatch(fetchMenuCategories());
  }, [dispatch]);

  // Click ra ngoài ô tìm kiếm thì đóng dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchBoxRef.current &&
        !searchBoxRef.current.contains(e.target as Node)
      ) {
        setIsOpenSearchDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Dọn timer khi unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  // Chỉ gọi API khi NGƯỜI DÙNG gõ (không gọi khi keyword đổi do URL)
  const handleKeywordChange = (value: string) => {
    setKeyword(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (!value.trim()) {
      dispatch(clearSearchResults());
      setIsOpenSearchDropdown(false);
      return;
    }

    setIsOpenSearchDropdown(true);
    debounceRef.current = setTimeout(() => {
      dispatch(fetchJobsByName(value.trim()));
    }, 300);
  };

  const goToSearch = (term: string) => {
    const value = term.trim();
    if (debounceRef.current) clearTimeout(debounceRef.current);
    setKeyword(value);
    setIsOpenSearchDropdown(false);
    router.push(
      value ? `/list-job?search=${encodeURIComponent(value)}` : "/list-job"
    );
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    goToSearch(keyword);
  };

  // Click sub-item: đóng menu và chuyển sang trang list-job
  const handleSelectSubCategory = (id: number | string, name: string) => {
    setActiveCategory(null);
    router.push(`/list-job?detailType=${id}&name=${encodeURIComponent(name)}`);
  };

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

          {/* Ô tìm kiếm */}
          <div className="relative flex-1" ref={searchBoxRef}>
            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center rounded-md overflow-hidden border border-gray-300 focus-within:border-gray-500 bg-white shadow-sm"
            >
              <div className="pl-3 text-gray-400">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              <input
                type="text"
                value={keyword}
                onChange={(e) => handleKeywordChange(e.target.value)}
                onFocus={() => keyword.trim() && setIsOpenSearchDropdown(true)}
                onKeyDown={(e) => {
                  if (e.key === "Escape") setIsOpenSearchDropdown(false);
                }}
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

            {/* Dropdown gợi ý */}
            {isOpenSearchDropdown && (
              <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-80 overflow-y-auto">
                {searchResults.loading ? (
                  <div className="p-3 text-xs text-gray-400 text-center">
                    Searching...
                  </div>
                ) : searchResults.data && searchResults.data.length > 0 ? (
                  <>
                    <ul className="divide-y divide-gray-100">
                      {searchResults.data.slice(0, 8).map((item: any) => {
                        const job = item.congViec ?? item;
                        return (
                          <li key={item.id}>
                            <Link
                              href={`/job-detail/${job.id}`}
                              onClick={() => setIsOpenSearchDropdown(false)}
                              className="p-2.5 hover:bg-gray-50 flex items-center gap-3 transition"
                            >
                              <img
                                src={job.hinhAnh || "/placeholder.png"}
                                alt={job.tenCongViec || "job"}
                                className="w-10 h-10 object-cover rounded"
                              />
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-semibold text-gray-800 truncate">
                                  {job.tenCongViec}
                                </p>
                                <p className="text-[11px] text-gray-500">
                                  ${job.giaTien} • ★ {job.saoCongViec || 5}
                                </p>
                              </div>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                    <button
                      type="button"
                      onClick={() => goToSearch(keyword)}
                      className="w-full p-2.5 text-xs font-semibold text-green-600 hover:bg-gray-50 border-t border-gray-100"
                    >
                      See all results for &quot;{keyword.trim()}&quot;
                    </button>
                  </>
                ) : (
                  <div className="p-3 text-xs text-gray-500 text-center">
                    No matching services found
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Nút hành động */}
        <div className="flex items-center gap-6 text-sm font-semibold text-gray-600">
          <a href="#" className="hidden md:inline hover:text-green-600 transition">
            Become a Seller
          </a>
          <Link href="/form-signin" className="hover:text-green-600 transition">
            Sign In
          </Link>
          <Link href="/form-login">
            <button className="border border-green-500 text-green-600 hover:bg-green-600 hover:text-white px-4 py-1.5 rounded font-semibold text-sm transition">
              Join
            </button>
          </Link>
        </div>
      </div>

      {/* MEGA MENU */}
      <div className="max-w-7xl mx-auto px-6 relative border-t border-gray-200">
        {menuCategories.loading ? (
          <div className="text-xs text-gray-400 py-2.5">Loading categories...</div>
        ) : (
          <ul className="flex items-center justify-between gap-6 overflow-x-auto text-sm text-gray-600">
            {menuCategories.data?.map((cat: any) => {
              const isActive = activeCategory === cat.id;
              const hasGroups = cat.dsNhomChiTietLoai?.length > 0;

              return (
                <li
                  key={cat.id}
                  className="py-2.5"
                  onMouseEnter={() => setActiveCategory(cat.id)}
                  onMouseLeave={() => setActiveCategory(null)}
                >
                  <span
                    className={`cursor-pointer transition font-medium whitespace-nowrap pb-2 ${
                      isActive
                        ? "text-green-600 border-b-2 border-green-500"
                        : "hover:text-green-600"
                    }`}
                  >
                    {cat.tenLoaiCongViec}
                  </span>

                  {hasGroups && (
                    <div
                      className={`absolute left-0 top-full w-full bg-[#e5e5e5] text-gray-800 shadow-xl border-t border-gray-300 transition-all duration-300 ease-in-out z-50 ${
                        isActive
                          ? "opacity-100 visible translate-y-0 pointer-events-auto"
                          : "opacity-0 invisible translate-y-2 pointer-events-none"
                      }`}
                    >
                      <div className="max-w-7xl mx-auto px-8 py-6 grid grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-6 max-h-112.5 overflow-y-auto">
                        {cat.dsNhomChiTietLoai.map((group: any) => (
                          <div key={group.id} className="space-y-3">
                            <h4 className="font-bold text-gray-900 text-sm tracking-tight">
                              {group.tenNhom}
                            </h4>
                            <ul className="space-y-2 text-xs md:text-sm text-gray-600 font-normal">
                              {group.dsChiTietLoai?.map((detail: any) => (
                                <li key={detail.id}>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleSelectSubCategory(
                                        detail.id,
                                        detail.tenChiTiet
                                      )
                                    }
                                    className="hover:text-black hover:underline transition-colors block py-0.5 text-left w-full cursor-pointer"
                                  >
                                    {detail.tenChiTiet}
                                  </button>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* TAG GỢI Ý */}
      <div className="w-full bg-gray-100 border-t border-gray-200 py-2">
        <div className="max-w-7xl mx-auto px-6 flex items-center gap-2 overflow-x-auto text-sm">
          <span className="font-bold text-gray-700 mr-1 text-xs">Suggested:</span>
          {suggestions.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => goToSearch(item)}
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