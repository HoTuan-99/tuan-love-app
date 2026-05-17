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
    <main
      className="min-h-screen"
      style={{
        background: "#fff5f7",
      }}
    >
      <Hero />

      <section
        style={{
          position: "relative",
          textAlign: "center",
          padding: "60px 20px 120px",
          overflow: "hidden",
          background:
            "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.9) 0%, transparent 28%), radial-gradient(circle at 80% 25%, rgba(255,182,193,0.55) 0%, transparent 32%), linear-gradient(135deg, #fff7fa 0%, #ffe1eb 45%, #ffc6d8 100%)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            fontSize: 34,
            opacity: 0.55,
            pointerEvents: "none",
          }}
        >
          <span style={{ position: "absolute", left: "8%", top: "18%" }}>
            🌸
          </span>
          <span style={{ position: "absolute", right: "12%", top: "12%" }}>
            🌷
          </span>
          <span style={{ position: "absolute", left: "18%", bottom: "18%" }}>
            🌷
          </span>
          <span style={{ position: "absolute", right: "20%", bottom: "22%" }}>
            🌸
          </span>
        </div>

        <div
          style={{
            position: "absolute",
            left: "-5%",
            bottom: "-60px",
            width: "45%",
            height: 180,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.78)",
            filter: "blur(8px)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "absolute",
            right: "-5%",
            bottom: "-70px",
            width: "45%",
            height: 190,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.78)",
            filter: "blur(8px)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "relative",
           width: "min(98vw, 1400px)",
            height: 820,
            margin: "0 auto",
          }}
        >
          <svg
            viewBox="0 0 800 700"
            preserveAspectRatio="xMidYMid meet"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              overflow: "visible",
            }}
          >
            <defs>
              <filter id="loveHeartGlow">
                <feGaussianBlur stdDeviation="10" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <linearGradient
                id="loveHeartGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#ff8ab3" />
                <stop offset="45%" stopColor="#ff5c93" />
                <stop offset="100%" stopColor="#ff3f7f" />
              </linearGradient>
            </defs>

            <path
              d="
                M400 620
                C150 450 60 320 60 185
                C60 75 140 30 225 30
                C305 30 365 82 400 145
                C435 82 495 30 575 30
                C660 30 740 75 740 185
                C740 320 650 450 400 620
              "
              fill="rgba(255,255,255,0.12)"
              stroke="url(#loveHeartGradient)"
              strokeWidth="9"
              strokeLinecap="round"
              filter="url(#loveHeartGlow)"
            />
          </svg>

          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 clamp(35px, 9vw, 150px)",
              zIndex: 2,
            }}
          >
            <h1
              style={{
                fontSize: "clamp(34px, 5vw, 76px)",
                fontWeight: 900,
                color: "#e63946",
                margin: 0,
                lineHeight: 1.18,
                maxWidth: "850px",
                wordBreak: "break-word",
                textShadow: "0 10px 25px rgba(255,105,180,0.35)",
              }}
            >
              {data.your_name} ❤️ {data.lover_name}
            </h1>

            <p
              style={{
                whiteSpace: "pre-wrap",
                fontSize: "clamp(17px, 2vw, 25px)",
                color: "#7b8ba7",
                maxWidth: 700,
                marginTop: 24,
                lineHeight: 1.7,
              }}
            >
              {data.message}
            </p>
          </div>
        </div>
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