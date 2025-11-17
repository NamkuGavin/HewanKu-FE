"use client";

import { useState } from "react";

export default function ReadMoreText({ children, maxLines = 4 }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="w-full">
      <p
        className={
          isExpanded ? "text-left" : `text-left line-clamp-${maxLines}`
        }
      >
        {children}
      </p>

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-blue-600 text-sm font-medium mt-2 hover:underline"
      >
        {isExpanded ? "See less" : "See more"}
      </button>
    </div>
  );
}
