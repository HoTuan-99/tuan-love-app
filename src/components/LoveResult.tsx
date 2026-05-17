"use client";

import { useState } from "react";
import Hero from "@/components/Hero";
import TimeCounter from "@/components/TimeCounter";
import TulipCatcher from "@/components/TulipCatcher";
import LoveQR from "@/components/LoveQR";
import DynamicParallaxTimeline from "@/components/DynamicParallaxTimeline";

export default function LoveResult({ data }: { data: any }) {
  const [gameCompleted, setGameCompleted] = useState(false);

  const photos: string[] = data.photos || [];

  return (
    <main className="min-h-screen">
      <Hero />

      <section style={{ padding: 40, textAlign: "center" }}>
        <h1>
          {data.your_name} ❤️ {data.lover_name}
        </h1>
        <p style={{ whiteSpace: "pre-wrap", fontSize: 22 }}>
          {data.message}
        </p>
      </section>

      <TimeCounter />

      <DynamicParallaxTimeline photos={photos} />

      <TulipCatcher
        onComplete={() => setGameCompleted(true)}
        gameCompleted={gameCompleted}
      />

      <LoveQR />
    </main>
  );
}