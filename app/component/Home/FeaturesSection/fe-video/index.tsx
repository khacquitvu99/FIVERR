'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface VideoCardProps {
  title?: string;
  subtitle?: string;
  thumbnailUrl?: string;
  videoUrl?: string; // Thêm prop đường dẫn video (.mp4 hoặc link youtube/embed)
}

const VideoCard: React.FC<VideoCardProps> = ({
  title = 'Video Title',
  subtitle = 'Video Subtitle',
  thumbnailUrl = '/thumbnail/thumbnail.jpg', // Link ảnh thumbnail
  videoUrl = '/video/video.mp4', // Link video demo
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="relative w-full aspect-3/4 max-h-90 rounded-lg overflow-hidden group cursor-pointer shadow-md hover:shadow-xl transition-shadow duration-300 bg-black">
      {isPlaying ? (
        /* 1. Hiển thị Video phát trực tiếp khi bấm Play */
        <video
          src={videoUrl}
          controls
          autoPlay
          className="w-full h-full object-cover"
        />
      ) : (
        /* 2. Hiển thị Thumbnail + Nut Play khi chưa bấm */
        <>
          {/* Ảnh Thumbnail */}
          <Image
            src={thumbnailUrl}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 20vw"
            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />

          {/* Layer Text ở góc trên */}
          <div className="absolute top-4 left-4 z-20 text-white pointer-events-none">
            <p className="text-xs font-medium opacity-80">{subtitle}</p>
            <h3 className="text-xl font-bold tracking-tight">{title}</h3>
          </div>

          {/* Overlay mờ + Nút Play */}
          <div 
            onClick={() => setIsPlaying(true)}
            className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition duration-300 flex items-center justify-center z-10"
          >
            <button
              type="button"
              className="w-16 h-16 bg-black/60 hover:bg-black/80 group-hover:scale-110 text-white rounded-full flex items-center justify-center transition duration-300 shadow-xl border border-white/20"
              aria-label="Play video"
            >
              <svg
                className="w-8 h-8 ml-1"
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
  );
};

export default VideoCard;