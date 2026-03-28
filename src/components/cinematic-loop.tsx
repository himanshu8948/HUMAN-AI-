"use client";

export function CinematicLoop() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <video
        className="absolute inset-0 h-full w-full scale-[1.1] object-cover object-center contrast-[1.52] brightness-[0.9] saturate-[1.18]"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      >
        <source src="/blackhole-loop.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
