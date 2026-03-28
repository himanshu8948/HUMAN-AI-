import Image from "next/image";
import Link from "next/link";

export default function CompletePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black px-6 py-10 text-stone-50">
      <Image
        src="/completion-galaxy.jpg"
        alt="Galaxy panorama background for the completion page"
        fill
        priority
        className="object-cover object-center"
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,244,214,0.1)_0%,_rgba(14,14,14,0.3)_24%,_rgba(4,4,4,0.78)_72%,_rgba(0,0,0,0.92)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(0,0,0,0.14)_0%,_rgba(0,0,0,0.26)_24%,_rgba(0,0,0,0.64)_72%,_rgba(0,0,0,0.84)_100%)]" />
      <div className="absolute left-1/2 top-1/2 h-[21rem] w-[21rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,_rgba(255,235,190,0.09)_0%,_rgba(255,235,190,0.025)_30%,_rgba(0,0,0,0)_68%)] blur-3xl animate-hero-drift" />
      <div className="absolute left-[62%] top-[28%] h-24 w-24 rounded-full bg-[radial-gradient(circle,_rgba(255,244,214,0.22)_0%,_rgba(255,244,214,0.06)_42%,_rgba(255,244,214,0)_72%)] blur-2xl" />
      <div className="absolute left-[54%] top-[30%] h-px w-[24rem] -translate-y-1/2 bg-[linear-gradient(90deg,_rgba(255,244,214,0)_0%,_rgba(255,244,214,0.15)_40%,_rgba(255,244,214,0.04)_72%,_rgba(255,244,214,0)_100%)]" />
      <div className="absolute left-[66%] top-[33%] h-10 w-10 rounded-full border border-white/10 opacity-35 blur-[1px]" />
      <div className="absolute left-[70%] top-[35%] h-4 w-4 rounded-full border border-white/10 opacity-30 blur-[0.5px]" />
      <div className="absolute inset-0 opacity-14 [background-image:radial-gradient(rgba(255,245,224,0.34)_0.7px,transparent_0.7px)] [background-size:34px_34px]" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-5xl items-center justify-center">
        <section className="animate-hero-fade-up w-full max-w-2xl rounded-[30px] border border-white/14 bg-black/64 px-7 py-11 text-center shadow-[0_34px_110px_-44px_rgba(0,0,0,0.95)] ring-1 ring-white/6 backdrop-blur-2xl sm:px-10 sm:py-14">
          <p className="animate-hero-fade-up-delay-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-stone-300">
            Experiment Complete
          </p>

          <h1 className="animate-hero-fade-up-delay-1 mt-5 text-3xl font-semibold leading-tight text-stone-50 drop-shadow-[0_0_28px_rgba(255,236,196,0.16)] sm:text-5xl">
            Thank you for participating.
          </h1>

          <p className="animate-hero-fade-up-delay-2 mx-auto mt-7 max-w-xl text-sm leading-8 text-stone-200 sm:text-base">
            Your responses for this session have been recorded successfully.
            This prototype is designed to study how people respond to AI
            recommendations under different presentation cues.
          </p>

          <p className="animate-hero-fade-up-delay-2 mx-auto mt-4 max-w-xl text-sm leading-8 text-stone-300 sm:text-[15px]">
            You may return to the landing page or begin a new session to repeat
            the experiment flow.
          </p>

          <div className="animate-hero-fade-up-delay-3 mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="rounded-full border border-white/18 bg-white/8 px-5 py-3 text-sm font-semibold text-stone-50 transition duration-300 hover:-translate-y-0.5 hover:bg-white/16"
            >
              Return Home
            </Link>
            <Link
              href="/experiment"
              className="animate-hero-pulse rounded-full border border-amber-100/40 bg-black/56 px-5 py-3 text-sm font-semibold text-amber-50 shadow-[0_20px_50px_-22px_rgba(255,232,196,0.42)] transition duration-300 hover:-translate-y-0.5 hover:border-amber-50/60 hover:bg-black/64"
            >
              Start New Session
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
