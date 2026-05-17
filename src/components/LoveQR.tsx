"use client";

import { QRCodeCanvas } from "qrcode.react";

export default function LoveQR() {
  const url =
    typeof window !== "undefined"
      ? window.location.href
      : "";

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <h2>Quét QR để mở trang này ❤️</h2>

      <QRCodeCanvas
        value={url}
        size={220}
      />

      <p>
        Mở camera điện thoại để quét
      </p>
    </div>
  );
}
// hello