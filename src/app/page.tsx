import Link from "next/link";
import { Syncopate } from "next/font/google";

import { CinematicLoop } from "@/components/cinematic-loop";

const duneStyle = Syncopate({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-stone-50">
      <CinematicLoop />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,236,196,0.18)_0%,_rgba(0,0,0,0.02)_14%,_rgba(0,0,0,0.56)_58%,_rgba(0,0,0,0.92)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(0,0,0,0.48)_0%,_rgba(0,0,0,0.08)_24%,_rgba(0,0,0,0.32)_56%,_rgba(0,0,0,0.88)_100%)]" />
      <div className="absolute left-1/2 top-1/2 h-[24rem] w-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,_rgba(255,225,160,0.07)_0%,_rgba(255,225,160,0.02)_28%,_rgba(0,0,0,0)_66%)] blur-3xl animate-hero-drift" />
      <div className="absolute left-[58%] top-[31%] h-20 w-20 rounded-full bg-[radial-gradient(circle,_rgba(255,244,214,0.18)_0%,_rgba(255,244,214,0.05)_42%,_rgba(255,244,214,0)_72%)] blur-2xl" />
      <div className="absolute left-[49%] top-[33%] h-px w-[22rem] -translate-y-1/2 bg-[linear-gradient(90deg,_rgba(255,244,214,0)_0%,_rgba(255,244,214,0.12)_40%,_rgba(255,244,214,0.03)_72%,_rgba(255,244,214,0)_100%)]" />
      <div className="absolute left-[62%] top-[35%] h-9 w-9 rounded-full border border-white/10 opacity-30 blur-[1px]" />
      <div className="absolute left-[66%] top-[37%] h-3.5 w-3.5 rounded-full border border-white/10 opacity-25 blur-[0.5px]" />
      <div className="absolute inset-x-0 bottom-0 h-64 bg-[linear-gradient(180deg,_rgba(0,0,0,0)_0%,_rgba(0,0,0,0.86)_100%)]" />
      <div className="absolute inset-0 opacity-18 [background-image:radial-gradient(rgba(255,245,224,0.28)_0.6px,transparent_0.6px)] [background-size:32px_32px]" />

      <div className="absolute inset-x-0 top-0 z-10 flex justify-center px-6 pt-8 sm:pt-10">
        <p
          className={`${duneStyle.className} animate-hero-fade-up max-w-4xl text-center text-[10px] font-normal tracking-[0.32em] text-stone-100/92 drop-shadow-[0_0_20px_rgba(255,232,196,0.18)] sm:text-xs md:text-sm`}
        >
          Between instinct and intelligence, where does trust begin?
        </p>
      </div>

      <div className="absolute inset-0 z-10 flex items-center justify-center px-6">
        <div className="flex max-w-4xl -translate-y-32 flex-col items-center sm:-translate-y-36">
          <h1
            className={`${duneStyle.className} animate-hero-fade-up-delay-1 text-center text-base font-bold tracking-[0.32em] text-stone-50 drop-shadow-[0_0_34px_rgba(255,232,196,0.24)] sm:text-lg md:text-xl lg:text-2xl`}
          >
            HUMAN AI RESEARCH
          </h1>

          <Link
            href="/experiment"
            className="animate-hero-fade-up-delay-2 animate-hero-pulse mt-14 inline-flex self-center rounded-full border border-amber-100/35 bg-black/32 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-50 backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:border-amber-50/55 hover:bg-white/10 hover:shadow-[0_22px_55px_-18px_rgba(255,232,196,0.4)]"
          >
            Start Experiment
          </Link>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 flex justify-center px-6 pb-10 sm:pb-14">
        <p className="animate-hero-fade-up-delay-3 max-w-2xl text-center text-sm leading-8 text-stone-200/92 sm:text-base">
          You will review AI recommendations across a short set of decision
          tasks. For each task, you will decide whether to follow or override
          the recommendation. Your choices and response times will be recorded
          for research purposes.
        </p>
      </div>
    </main>
  );
}
