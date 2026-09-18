"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function FiverrHero() {
  const [keyword, setKeyword] = useState<string>("");
  const router = useRouter();

  // Xử lý sự kiện khi Submit ô tìm kiếm
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword.trim()) return;

    router.push(`/list-job?search=${encodeURIComponent(keyword.trim())}`);
  };

  // Xử lý sự kiện khi click vào các Popular tag
  const handleTagClick = (tag: string) => {
    router.push(`/list-job?search=${encodeURIComponent(tag)}`);
  };

  return (
    <section className="bg-white">
      <div className="container mx-auto bg-[#8f2b0f] text-white">
        <div className="max-w-7xl mx-auto px-6 py-4 md:py-6 flex flex-col justify-between min-h-80 md:min-h-95">
          {/* 1. Header Navigation */}
          <header className="flex items-center justify-between mb-4">
            <Link href="/" className="text-2xl font-black tracking-tighter text-white cursor-pointer">
              fiverr<span className="text-green-500">.</span>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <Link href="#" className="hover:opacity-80 transition">
                Become a Seller
              </Link>
              <Link href="/form-signin" className="hover:opacity-80 transition">
                Sign In
              </Link>
              <Link
                href="/form-login"
                className="border border-white px-4 py-1.5 rounded hover:bg-white hover:text-[#8f2b0f] transition duration-200"
              >
                Join
              </Link>
            </nav>
          </header>

          {/* 2. Main Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center my-auto">
            {/* Vùng văn bản & Tìm kiếm (Bên trái) */}
            <div className="md:col-span-7 space-y-4 z-10">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
                Find the perfect{" "}
                <span className="italic font-serif font-normal">freelance</span>{" "}
                <br />
                services for your business
              </h1>

              {/* Ô tìm kiếm dạng Form có thể Enter hoặc Click Search */}
              <form
                onSubmit={handleSearchSubmit}
                className="flex w-full max-w-lg bg-white rounded overflow-hidden shadow-md"
              >
                <div className="flex items-center pl-3 text-gray-400">
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
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder='Try "building mobile app"'
                  className="w-full py-2 px-3 text-gray-800 placeholder-gray-400 focus:outline-none text-xs md:text-sm"
                />
                <button
                  type="submit"
                  className="bg-[#1dbf73] hover:bg-[#19a463] text-white px-5 font-semibold text-xs md:text-sm transition duration-200 whitespace-nowrap"
                >
                  Search
                </button>
              </form>

              {/* Thẻ gợi ý từ khóa */}
              <div className="flex items-center space-x-2 text-xs flex-wrap gap-y-1.5 pt-1">
                <span className="font-semibold text-gray-200">Popular:</span>
                {[
                  "Website Design",
                  "WordPress",
                  "Logo Design",
                  "Dropshipping",
                ].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleTagClick(tag)}
                    className="border border-white/40 px-2.5 py-0.5 rounded-full hover:bg-white/20 transition cursor-pointer"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Vùng Hình ảnh & Đánh giá (Bên phải) */}
            <div className="md:col-span-5 relative flex justify-end items-end h-full">
              <div className="relative">
                <img
                  src="/NO-BACGROUND.png"
                  alt="Gabrielle Video Editor"
                  className="w-full max-w-xs md:max-w-sm object-contain"
                />
                <div className="absolute bottom-2 right-2 text-right text-[10px] md:text-xs">
                  <div className="text-yellow-400 text-xs">★★★★★</div>
                  <p className="font-semibold text-white">
                    Gabrielle, Video Editor
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}