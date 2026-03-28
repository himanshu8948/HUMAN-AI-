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

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,230,176,0.24)_0%,_rgba(0,0,0,0.02)_18%,_rgba(0,0,0,0.52)_60%,_rgba(0,0,0,0.9)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(0,0,0,0.42)_0%,_rgba(0,0,0,0.1)_24%,_rgba(0,0,0,0.28)_56%,_rgba(0,0,0,0.84)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-64 bg-[linear-gradient(180deg,_rgba(0,0,0,0)_0%,_rgba(0,0,0,0.86)_100%)]" />

      <div className="absolute inset-x-0 top-0 z-10 flex justify-center px-6 pt-8 sm:pt-10">
        <p
          className={`${duneStyle.className} max-w-4xl text-center text-[10px] font-normal tracking-[0.32em] text-stone-100/90 drop-shadow-[0_0_18px_rgba(255,232,196,0.16)] sm:text-xs md:text-sm`}
        >
          Between instinct and intelligence, where does trust begin?
        </p>
      </div>

      <div className="absolute inset-0 z-10 flex items-center justify-center px-6">
        <div className="flex max-w-4xl -translate-y-32 flex-col items-center sm:-translate-y-36">
          <h1
            className={`${duneStyle.className} text-center text-base font-bold tracking-[0.32em] text-stone-50 drop-shadow-[0_0_28px_rgba(255,232,196,0.18)] sm:text-lg md:text-xl lg:text-2xl`}
          >
            HUMAN AI RESEARCH
          </h1>

          <Link
            href="/experiment"
            className="mt-14 inline-flex self-center rounded-full border border-amber-100/35 bg-black/28 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-50 shadow-[0_18px_45px_-20px_rgba(255,232,196,0.35)] backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:border-amber-50/55 hover:bg-white/10 hover:shadow-[0_22px_55px_-18px_rgba(255,232,196,0.4)]"
          >
            Start Experiment
          </Link>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 flex justify-center px-6 pb-10 sm:pb-14">
        <p className="max-w-2xl text-center text-sm leading-8 text-stone-200/92 sm:text-base">
          You will review AI recommendations across a short set of decision
          tasks. For each task, you will decide whether to follow or override
          the recommendation. Your choices and response times will be recorded
          for research purposes.
        </p>
      </div>
    </main>
  );
}
