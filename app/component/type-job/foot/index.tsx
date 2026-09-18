"use client";

import React from "react";
import Link from "next/link";

interface RelatedServicesProps {
  categoryTitle?: string;
  tags?: string[];
}

const defaultTags = [
  "Minimalist logo design",
  "Signature logo design",
  "Mascot logo design",
  "3d logo design",
  "Hand drawn logo design",
  "Vintage logo design",
  "Remove background",
  "Photo restoration",
  "Photo retouching",
  "Image resize",
  "Product label design",
  "Custom twitch overlay",
  "Custom twitch emotes",
  "Gaming logo",
  "Children book illustration",
  "Instagram design",
  "Movie poster design",
  "Box design",
  "Logo maker",
  "Logo ideas",
];

export default function RelatedServices({
  categoryTitle = "Graphics & Design",
  tags = defaultTags,
}: RelatedServicesProps) {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-10 text-center">
      {/* SECTION TITLE */}
      <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">
        Services Related To {categoryTitle}
      </h2>

      {/* TAGS LIST */}
      <div className="flex flex-wrap justify-center gap-2.5 max-w-5xl mx-auto">
        {tags.map((tag, index) => (
          <Link
            key={index}
            href={`/search?keyword=${encodeURIComponent(tag)}`}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900 text-xs md:text-sm font-medium rounded-full transition-colors duration-150 ease-in-out"
          >
            {tag}
          </Link>
        ))}
      </div>
    </section>
  );
}