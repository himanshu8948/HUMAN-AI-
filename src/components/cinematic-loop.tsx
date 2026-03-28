"use client";

import { useState } from "react";

export function CinematicLoop() {
  const [isReady, setIsReady] = useState(false);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <video
        className={`absolute inset-0 h-full w-full scale-[1.1] object-cover object-center contrast-[1.52] brightness-[0.9] saturate-[1.18] transition-opacity duration-700 ${
          isReady ? "opacity-100" : "opacity-0"
        }`}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        onLoadedData={() => setIsReady(true)}
      >
        <source src="/blackhole-loop.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
