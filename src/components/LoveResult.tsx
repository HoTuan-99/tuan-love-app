"use client";

import { useState } from "react";
import Hero from "@/components/Hero";
import TimeCounter from "@/components/TimeCounter";
import TulipCatcher from "@/components/TulipCatcher";
import LoveQR from "@/components/LoveQR";
import DynamicParallaxTimeline from "@/components/DynamicParallaxTimeline";

export default function LoveResult({ data }: { data: any }) {
  const [gameCompleted, setGameCompleted] = useState(false);

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

      <TimeCounter startDate={data.relationship_start} />

      <DynamicParallaxTimeline
        photos={data.photos || []}
        memoryDates={data.memory_dates || []}
      />

      <TulipCatcher
        onComplete={() => setGameCompleted(true)}
        gameCompleted={gameCompleted}
      />

      <LoveQR />
      <footer
  style={{
    textAlign: "center",
    padding: "50px 20px",
    background: "#fff5f7",
    color: "#e63946",
    fontSize: 18,
    fontWeight: 600,
  }}
>
  Made with ❤️ by TuanAnh
</footer>
    </main>
  );
}