"use client";

export function CinematicLoop() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <video
        className="absolute inset-0 h-full w-full scale-[1.08] object-cover object-center contrast-[1.38] brightness-[0.95] saturate-[1.08]"
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
