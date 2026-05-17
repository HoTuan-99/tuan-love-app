"use client";

import { useState } from "react";
import { supabase } from "../supabase";

export default function Home() {
  const [yourName, setYourName] = useState("");
  const [loverName, setLoverName] = useState("");
  const [message, setMessage] = useState("");
  const [photos, setPhotos] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleUpload() {
    if (!photos || photos.length === 0) {
      alert("Hãy chọn ảnh");
      return;
    }

    setLoading(true);

    const uploadedUrls: string[] = [];

    for (const file of Array.from(photos)) {
      const fileName = `${Date.now()}-${file.name}`;

      const { error } = await supabase.storage
        .from("love-photos")
        .upload(fileName, file);

      if (error) {
        alert(error.message);
        setLoading(false);
        return;
      }

      const { data } = supabase.storage
        .from("love-photos")
        .getPublicUrl(fileName);

      uploadedUrls.push(data.publicUrl);
    }

    const id = crypto.randomUUID();

    await supabase.from("love_pages").insert({
      id,
      your_name: yourName,
      lover_name: loverName,
      message,
      photos: uploadedUrls,
    });

    const finalUrl = `${window.location.origin}/love/${id}`;

    alert("Đã tạo xong ❤️");

    window.location.href = finalUrl;
  }

  return (
    <div
      style={{
        maxWidth: 500,
        margin: "40px auto",
        padding: 20,
        fontFamily: "sans-serif",
      }}
    >
      <h1>Tạo trang tình yêu ❤️</h1>

      <input
        placeholder="Tên của bạn"
        value={yourName}
        onChange={(e) => setYourName(e.target.value)}
        style={{
          width: "100%",
          padding: 12,
          marginBottom: 12,
        }}
      />

      <input
        placeholder="Tên người yêu"
        value={loverName}
        onChange={(e) => setLoverName(e.target.value)}
        style={{
          width: "100%",
          padding: 12,
          marginBottom: 12,
        }}
      />

      <textarea
        placeholder="Lời nhắn yêu thương ❤️"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{
          width: "100%",
          padding: 12,
          marginBottom: 12,
          height: 120,
        }}
      />

      <input
        type="file"
        multiple
        onChange={(e) => setPhotos(e.target.files)}
      />

      <br />
      <br />

      <button
        onClick={handleUpload}
        style={{
          padding: "14px 24px",
          borderRadius: 12,
          border: "none",
          background: "hotpink",
          color: "white",
          fontSize: 18,
          cursor: "pointer",
        }}
      >
        {loading ? "Đang tạo..." : "Tạo trang tình yêu ❤️"}
      </button>
    </div>
  );
}