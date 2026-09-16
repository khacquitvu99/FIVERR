"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide, SwiperRef } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

interface Testimonial {
  id: number;
  author: string;
  role: string;
  companyLogo?: string;
  quote: string;
  thumbnailUrl: string;
  videoUrl: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    author: "Kay Kim",
    role: "Co-Founder",
    companyLogo: "rooted",
    quote:
      "\"It's extremely exciting that Fiverr has freelancers from all over the world — it broadens the talent pool. One of the best things about Fiverr is that while we're sleeping, someone's working.\"",
    thumbnailUrl: "/thumbnail/thumb1.png",
    videoUrl: "/video/video1.mp4",
  },
  {
    id: 2,
    author: "Bridgette Armour",
    role: "Co-Founder",
    companyLogo: "NAADAM",
    quote:
      '"We\'ve used Fiverr for logo design, website development, animation and video editing. It allows us to scale our team up or down as needed."',
    thumbnailUrl: "/thumbnail/thumb2.png",
    videoUrl: "/video/video2.mp4",
  },
  {
    id: 3,
    author: "Bridgette Armour",
    role: "Co-Founder",
    companyLogo: "NAADAM",
    quote:
      '"We\'ve used Fiverr for logo design, website development, animation and video editing. It allows us to scale our team up or down as needed."',
    thumbnailUrl: "/thumbnail/thumb3.png",
    videoUrl: "/video/video3.mp4",
  },
  {
    id: 4,
    author: "Bridgette Armour",
    role: "Co-Founder",
    companyLogo: "NAADAM",
    quote:
      '"We\'ve used Fiverr for logo design, website development, animation and video editing. It allows us to scale our team up or down as needed."',
    thumbnailUrl: "/thumbnail/thumb4.png",
    videoUrl: "/video/video4.mp4",
  },
];

const TestimonialSlider: React.FC = () => {
  const swiperRef = useRef<SwiperRef>(null);
  const [activeVideoId, setActiveVideoId] = useState<number | null>(null);

  return (
    <div className="relative">
      <Swiper
        ref={swiperRef}
        modules={[Navigation]}
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        onSlideChange={() => setActiveVideoId(null)} // Reset video khi chuyển slide
        className="mySwiper"
      >
        {testimonials.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-white p-4 md:p-8">
              {/* Cột trái: Video / Thumbnail */}
              <div className="md:col-span-5 relative aspect-video md:aspect-4/3 rounded-lg overflow-hidden bg-black shadow-md">
                {activeVideoId === item.id ? (
                  <video
                    src={item.videoUrl}
                    controls
                    autoPlay
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <>
                    <Image
                      src={item.thumbnailUrl || "/images/placeholder.png"}
                      alt={item.author}
                      fill
                      className="object-cover"
                    />
                    <div
                      onClick={() => setActiveVideoId(item.id)}
                      className="absolute inset-0 bg-black/20 hover:bg-black/30 transition flex items-center justify-center cursor-pointer group"
                    >
                      <button
                        type="button"
                        className="w-14 h-14 bg-black/60 group-hover:scale-110 text-white rounded-full flex items-center justify-center transition duration-300 shadow-xl"
                        aria-label="Play video"
                      >
                        <svg
                          className="w-7 h-7 ml-1"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </button>
                    </div>
                  </>
                )}
              </div>

              {/* Cột phải: Thông tin & Quote */}
              <div className="md:col-span-7 space-y-4">
                {/* Tên & Công ty */}
                <div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
                  <span>
                    {item.author}, {item.role}
                  </span>
                  <span>|</span>
                  <span className="font-bold text-gray-800 text-base">
                    {item.companyLogo}
                  </span>
                </div>

                {/* Trích dẫn */}
                <blockquote className="text-xl md:text-2xl font-serif italic text-[#003912] leading-relaxed">
                  {item.quote}
                </blockquote>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Nút Prev / Next tròn màu trắng nằm 2 bên */}
      <button
        onClick={() => swiperRef.current?.swiper.slidePrev()}
        className="absolute top-1/2 -left-4 md:-left-6 -translate-y-1/2 z-20 w-10 h-10 bg-white border border-gray-200 rounded-full shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-50 transition"
        aria-label="Previous slide"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={() => swiperRef.current?.swiper.slideNext()}
        className="absolute top-1/2 -right-4 md:-right-6 -translate-y-1/2 z-20 w-10 h-10 bg-white border border-gray-200 rounded-full shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-50 transition"
        aria-label="Next slide"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
};

export default TestimonialSlider;
