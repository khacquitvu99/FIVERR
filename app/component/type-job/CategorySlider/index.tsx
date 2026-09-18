"use client";

import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

// Import CSS của Swiper
import "swiper/css";
import "swiper/css/navigation";

// -------------------------------------------------------------
// DỮ LIỆU MẪU (DATA)
// -------------------------------------------------------------

// 1. Danh sách menu danh mục
const menuCategories = [
  "Graphics & Design",
  "Digital Marketing",
  "Writing & Translation",
  "Video & Animation",
  "Music & Audio",
  "Programming & Tech",
  "Business & AI Services",
];

// 2. Banner chính
const heroSlides = [
  {
    id: 1,
    title: "Graphics & Design",
    subtitle: "Designs to make you stand out.",
    bgClass: "bg-[#0a4228]",
  },
  {
    id: 2,
    title: "Digital Marketing",
    subtitle: "Build your brand. Grow your business.",
    bgClass: "bg-[#003912]",
  },
  {
    id: 3,
    title: "Writing & Translation",
    subtitle: "Get your message across, in any language.",
    bgClass: "bg-[#0e3223]",
  },
  {
    id: 4,
    title: "Video & Animation",
    subtitle: "Bring your story to life with custom video.",
    bgClass: "bg-[#103d27]",
  },
  {
    id: 5,
    title: "Music & Audio",
    subtitle: "Don't miss a beat. Get custom music & audio.",
    bgClass: "bg-[#0c3821]",
  },
  {
    id: 6,
    title: "Programming & Tech",
    subtitle: "Develop your software, app, or website.",
    bgClass: "bg-[#062c1a]",
  },
  {
    id: 7,
    title: "Business & AI Services",
    subtitle: "Scale your business with expert AI solutions.",
    bgClass: "bg-[#08482b]",
  },
];

// 3. Các dịch vụ phổ biến
const popularServices = [
  {
    id: 1,
    title: "Minimalist Logo Design",
    icon: (
      <div className="w-8 h-8 rounded-lg bg-gray-900 text-white flex items-center justify-center font-bold text-sm shrink-0">
        A
      </div>
    ),
  },
  {
    id: 2,
    title: "Architecture & Interior Design",
    icon: (
      <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-500 flex items-center justify-center text-lg shrink-0">
        🏠
      </div>
    ),
  },
  {
    id: 3,
    title: "Image Editing",
    icon: (
      <div className="w-8 h-8 rounded-lg bg-gray-900 text-yellow-400 flex items-center justify-center text-lg shrink-0">
        🪄
      </div>
    ),
  },
  {
    id: 4,
    title: "NFT Art",
    icon: (
      <div className="w-8 h-8 rounded-lg bg-gray-800 text-white flex items-center justify-center text-lg shrink-0">
        🐵
      </div>
    ),
  },
  {
    id: 5,
    title: "T-Shirts & Merchandise",
    icon: (
      <div className="w-8 h-8 rounded-lg bg-gray-900 text-white flex items-center justify-center text-lg shrink-0">
        👕
      </div>
    ),
  },
  {
    id: 6,
    title: "Social Media Design",
    icon: (
      <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center text-lg shrink-0">
        🎨
      </div>
    ),
  },
];

// -------------------------------------------------------------
// MAIN COMPONENT
// -------------------------------------------------------------

export default function CategorySlider() {
  const [activeCategory, setActiveCategory] = useState<string>("Graphics & Design");
  const popularSwiperRef = useRef<SwiperType | null>(null);

  return (
    <div className="w-full bg-white pb-8">
      <div className="max-w-7xl mx-auto px-4 mt-6 space-y-8">
        {/* 2. HERO SLIDER BANNER (Ảnh 1 - Phần Trên) */}
        <div className="relative rounded-xl overflow-hidden shadow-sm">
          <Swiper
            modules={[Navigation, Autoplay]}
            navigation
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            loop={true}
            className="fiverr-hero-slider"
          >
            {heroSlides.map((slide) => (
              <SwiperSlide key={slide.id}>
                <div
                  className={`relative min-h-50 md:min-h-60 ${slide.bgClass} text-white flex items-center justify-center px-6 py-8 overflow-hidden rounded-xl`}
                >
                  <div className="text-center z-10 max-w-xl mx-auto space-y-3">
                    <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                      {slide.title}
                    </h2>
                    <p className="text-sm md:text-base font-light opacity-90">
                      {slide.subtitle}
                    </p>
                    <button className="mt-1 inline-flex items-center gap-2 border border-white/80 hover:bg-white hover:text-gray-900 transition-all text-white font-semibold text-xs md:text-sm px-4 py-1.5 rounded-md">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
                      </svg>
                      How Fiverr Works
                    </button>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-green-500/20 rounded-full blur-xl pointer-events-none" />
                  <div className="absolute -top-6 -right-6 w-32 h-32 bg-orange-500/20 rounded-full blur-xl pointer-events-none" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* 3. MOST POPULAR SERVICES SECTION (Ảnh 1 - Phần Dưới & Ảnh 3) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg md:text-xl font-bold text-gray-800">
              Most popular in {activeCategory}
            </h3>

            {/* Sub-slider navigation controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => popularSwiperRef.current?.slidePrev()}
                className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-xs text-gray-600 hover:bg-gray-100 hover:border-gray-400 transition shadow-sm"
                aria-label="Previous"
              >
                &#10094;
              </button>
              <button
                onClick={() => popularSwiperRef.current?.slideNext()}
                className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-xs text-gray-600 hover:bg-gray-100 hover:border-gray-400 transition shadow-sm"
                aria-label="Next"
              >
                &#10095;
              </button>
            </div>
          </div>

          <Swiper
            modules={[Navigation]}
            onBeforeInit={(swiper) => {
              popularSwiperRef.current = swiper;
            }}
            spaceBetween={12}
            slidesPerView={1.2}
            breakpoints={{
              480: { slidesPerView: 2.2 },
              768: { slidesPerView: 3.2 },
              1024: { slidesPerView: 4.2 },
              1280: { slidesPerView: 5 },
            }}
            className="py-1"
          >
            {popularServices.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="flex items-center gap-3 p-2.5 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition cursor-pointer group">
                  {item.icon}
                  <span className="text-xs font-semibold text-gray-800 group-hover:text-green-600 transition truncate flex-1">
                    {item.title}
                  </span>
                  <span className="text-gray-400 group-hover:translate-x-1 group-hover:text-green-600 transition text-xs pr-1">
                    &rarr;
                  </span>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}