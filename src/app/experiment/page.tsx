import Image from "next/image";

import { ExperimentRunner } from "@/components/experiment-runner";

export default function ExperimentPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black px-6 py-10 text-stone-900">
      <Image
        src="/experiment-space-planet.jpg"
        alt="Static space planet background for the experiment page"
        fill
        priority
        className="object-cover object-center"
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,244,214,0.16)_0%,_rgba(10,10,10,0.18)_28%,_rgba(5,5,5,0.62)_70%,_rgba(0,0,0,0.84)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(0,0,0,0.24)_0%,_rgba(0,0,0,0.1)_18%,_rgba(0,0,0,0.54)_72%,_rgba(0,0,0,0.78)_100%)]" />

      <div className="animate-page-enter relative z-10 mx-auto flex w-full max-w-6xl flex-col">
        <ExperimentRunner />
      </div>
    </main>
  );
}
