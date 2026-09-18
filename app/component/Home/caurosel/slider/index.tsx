'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide, SwiperRef } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

const services = [
  {
    id: 1,
    title: 'Logo Design',
    desc: 'Build your brand',
    imageUrl: '/1.webp',
  },
  {
    id: 2,
    title: 'WordPress',
    desc: 'Customize your site',
    imageUrl: '/2.webp',
  },
  {
    id: 3,
    title: 'Voice Over',
    desc: 'Share your message',
    imageUrl: '/4.webp',
  },
  {
    id: 4,
    title: 'Video Explainer',
    desc: 'Engage your audience',
    imageUrl: '/5.webp',
  },
  {
    id: 5,
    title: 'Social Media',
    desc: 'Reach more customers',
    imageUrl: '/6.webp',
  },
  {
    id: 6,
    title: 'SEO',
    desc: 'Get found online',
    imageUrl: '/7.webp',
  },
];

const PopularServicesSlider: React.FC = () => {
  const swiperRef = useRef<SwiperRef>(null);

  return (
    <div className="max-w-7xl mx-auto px-6 py-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">
        Popular professional services
      </h2>

      <div className="relative group">
        <Swiper
          ref={swiperRef}
          modules={[Navigation]}
          slidesPerView={1}
          spaceBetween={16}
          loop={true}
          breakpoints={{
            480: { slidesPerView: 2, spaceBetween: 16 },
            768: { slidesPerView: 3, spaceBetween: 20 },
            1024: { slidesPerView: 4, spaceBetween: 24 },
            1280: { slidesPerView: 5, spaceBetween: 24 },
          }}
          className="mySwiper"
        >
          {services.map((service) => (
            <SwiperSlide key={service.id}>
              {/* 1. Khung Card cố định chiều cao & tỉ lệ (aspect 3/4 hoặc h-[340px]) */}
              <div className="relative w-full aspect-3/4 max-h-90 rounded-lg overflow-hidden group/card cursor-pointer shadow-md hover:shadow-xl transition-shadow duration-300">
                {/* 2. Ảnh dùng object-cover giúp xén vừa khung mà KHÔNG bị dãn/méo */}
                <Image
                  src={service.imageUrl || '/images/placeholder.png'}
                  alt={service.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 20vw"
                  className="object-cover object-center transition-transform duration-500 group-hover/card:scale-105"
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/20 to-transparent z-10 pointer-events-none" />

                {/* Nội dung Text */}
                <div className="absolute top-4 left-4 z-20 text-white space-y-1">
                  <p className="text-xs font-medium opacity-80">{service.desc}</p>
                  <h3 className="text-xl font-bold tracking-tight">{service.title}</h3>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Buttons */}
        <button
          onClick={() => swiperRef.current?.swiper.slidePrev()}
          className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 z-30
                     flex items-center justify-center w-10 h-10 bg-white 
                     border border-gray-200 rounded-full shadow-lg
                     text-gray-600 hover:text-green-500 hover:scale-110
                     transition duration-300
                     md:opacity-0 group-hover:opacity-100 disabled:opacity-30"
          aria-label="Previous service"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => swiperRef.current?.swiper.slideNext()}
          className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 z-30
                     flex items-center justify-center w-10 h-10 bg-white 
                     border border-gray-200 rounded-full shadow-lg
                     text-gray-600 hover:text-green-500 hover:scale-110
                     transition duration-300
                     md:opacity-0 group-hover:opacity-100 disabled:opacity-30"
          aria-label="Next service"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default PopularServicesSlider;