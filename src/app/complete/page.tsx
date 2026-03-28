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

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,244,214,0.12)_0%,_rgba(14,14,14,0.34)_34%,_rgba(4,4,4,0.74)_72%,_rgba(0,0,0,0.9)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(0,0,0,0.18)_0%,_rgba(0,0,0,0.28)_24%,_rgba(0,0,0,0.6)_72%,_rgba(0,0,0,0.82)_100%)]" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-5xl items-center justify-center">
        <section className="w-full max-w-2xl rounded-[28px] border border-white/12 bg-black/58 px-7 py-10 text-center shadow-[0_28px_90px_-40px_rgba(0,0,0,0.9)] backdrop-blur-xl sm:px-10 sm:py-12">
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-stone-300">
            Experiment Complete
          </p>

          <h1 className="mt-5 text-3xl font-semibold leading-tight text-stone-50 sm:text-4xl">
            Thank you for participating.
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-8 text-stone-200 sm:text-base">
            Your responses for this session have been recorded successfully.
            This prototype is designed to study how people respond to AI
            recommendations under different presentation cues.
          </p>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-8 text-stone-300 sm:text-[15px]">
            You may return to the landing page or begin a new session to repeat
            the experiment flow.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="rounded-full border border-white/18 bg-white/10 px-5 py-3 text-sm font-semibold text-stone-50 transition hover:bg-white/16"
            >
              Return Home
            </Link>
            <Link
              href="/experiment"
              className="rounded-full border border-amber-100/35 bg-black/48 px-5 py-3 text-sm font-semibold text-amber-50 transition hover:border-amber-50/55 hover:bg-black/58"
            >
              Start New Session
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
