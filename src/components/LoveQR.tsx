"use client";

import { QRCodeCanvas } from "qrcode.react";

export default function LoveQR() {
  const url = typeof window !== "undefined" ? window.location.href : "";

  return (
    <div style={{ textAlign: "center", padding: "80px 20px" }}>
      <h2 style={{ fontSize: 34, color: "#ff4f87", marginBottom: 35 }}>
        Quét QR để mở trang này ❤️
      </h2>

      <div
        style={{
          position: "relative",
          width: 390,
          height: 360,
          margin: "0 auto",
        }}
      >
        <svg
          viewBox="0 0 390 360"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            filter: "drop-shadow(0 0 22px rgba(255,105,180,0.45))",
          }}
        >
          <path
            d="M195 330 C65 230 20 155 20 85 C20 35 60 15 105 15 C150 15 180 45 195 75 C210 45 240 15 285 15 C330 15 370 35 370 85 C370 155 325 230 195 330Z"
            fill="rgba(255,255,255,0.65)"
            stroke="#ff5c93"
            strokeWidth="8"
          />
        </svg>

        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "48%",
            transform: "translate(-50%, -50%)",
            background: "white",
            padding: 18,
            borderRadius: 28,
            boxShadow: "0 15px 40px rgba(255,105,180,0.28)",
          }}
        >
          <QRCodeCanvas
            value={url}
            size={210}
            bgColor="#ffffff"
            fgColor="#ff4f87"
            level="H"
          />
        </div>
      </div>

      <div
  style={{
    marginTop: 28,
    display: "flex",
    justifyContent: "center",
    gap: 14,
    flexWrap: "wrap",
  }}
>
  <button
    onClick={() => {
      navigator.clipboard.writeText(url);
      alert("Đã copy link ❤️");
    }}
    style={{
      padding: "14px 24px",
      borderRadius: 999,
      border: "none",
      background: "#ff4f87",
      color: "white",
      fontSize: 16,
      fontWeight: 700,
      cursor: "pointer",
      boxShadow: "0 8px 20px rgba(255,79,135,0.35)",
    }}
  >
    🔗 Copy Link
  </button>

  <button
    onClick={async () => {
      if (navigator.share) {
        await navigator.share({
          title: "Our Love Story ❤️",
          text: "Mở trang tình yêu của chúng mình 💕",
          url,
        });
      } else {
        navigator.clipboard.writeText(url);
        alert("Thiết bị không hỗ trợ chia sẻ. Đã copy link ❤️");
      }
    }}
    style={{
      padding: "14px 24px",
      borderRadius: 999,
      border: "2px solid #ff4f87",
      background: "white",
      color: "#ff4f87",
      fontSize: 16,
      fontWeight: 700,
      cursor: "pointer",
    }}
  >
    💌 Chia sẻ
  </button>
</div>

<p
  style={{
    marginTop: 18,
    color: "#7b8ba7",
    fontSize: 17,
  }}
>
  Gửi link hoặc quét QR để mở trang 💕
</p>
    </div>
  );
}