"use client";

import { useState } from "react";
import { supabase } from "../../supabase";

const PHOTO_SLOTS = 8;

const memories = [
  {
    title: "First Date",
    date: "2023-06-29",
    description:
      "The day our story began. Coffee turned into hours of conversation, and I knew you were special.",
  },
  {
    title: "First Adventure",
    date: "2023-07-02",
    description:
      "Our first trip together! From sunrise hikes to late-night stargazing, every moment with you felt like magic.",
  },
  {
    title: "Game Nights",
    date: "2023-09-15",
    description:
      "Countless evenings of laughter, friendly competition, and creating our own little world together.",
  },
  {
    title: "Your Birthday",
    date: "2023-11-08",
    description:
      "Celebrating you was pure joy. Every smile you gave made my heart soar.",
  },
  {
    title: "New Year Together",
    date: "2024-01-01",
    description:
      "Starting the year in your arms, knowing I wanted every year to begin and end with you.",
  },
  {
    title: "First Anniversary",
    date: "2024-05-18",
    description:
      "One year of growing, learning, and loving together. Here's to forever more.",
  },
  {
    title: "Our Little Traditions",
    date: "2024-08-01",
    description:
      "From Sunday brunches to movie marathons, we've built a life full of beautiful routines.",
  },
  {
    title: "This Moment",
    date: "2026-02-14",
    description:
      "Right now, as you read this, know that you are my greatest adventure and my safest home.",
  },
];

function formatDate(date: string) {
  if (!date) return "Chưa chọn ngày";
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function CreatePage() {
  const [yourName, setYourName] = useState("");
  const [loverName, setLoverName] = useState("");
  const [message, setMessage] = useState("");
  const [relationshipStart, setRelationshipStart] = useState("");
  const [memoryDates, setMemoryDates] = useState<string[]>(
    memories.map((m) => m.date)
  );
  const [photos, setPhotos] = useState<(File | null)[]>(
    Array(PHOTO_SLOTS).fill(null)
  );
  const [previews, setPreviews] = useState<string[]>(
    Array(PHOTO_SLOTS).fill("")
  );
  const [loading, setLoading] = useState(false);

  function handleSelectPhoto(index: number, file: File | null) {
    const newPhotos = [...photos];
    const newPreviews = [...previews];

    newPhotos[index] = file;
    newPreviews[index] = file ? URL.createObjectURL(file) : "";

    setPhotos(newPhotos);
    setPreviews(newPreviews);
  }

  function handleMemoryDateChange(index: number, value: string) {
    const newDates = [...memoryDates];
    newDates[index] = value;
    setMemoryDates(newDates);
  }

  async function handleUpload() {
    if (!yourName || !loverName) {
      alert("Hãy nhập tên của bạn và tên người yêu");
      return;
    }

    if (!relationshipStart) {
      alert("Hãy chọn ngày bắt đầu yêu");
      return;
    }

    const selectedPhotos = photos.filter(Boolean) as File[];

    if (selectedPhotos.length === 0) {
      alert("Hãy chọn ít nhất 1 ảnh");
      return;
    }

    setLoading(true);

    const uploadedUrls: string[] = [];

    for (const file of selectedPhotos) {
      const fileName = `${crypto.randomUUID()}-${file.name}`;

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

    const { error } = await supabase.from("love_pages").insert({
      id,
      your_name: yourName,
      lover_name: loverName,
      message,
      photos: uploadedUrls,
      relationship_start: relationshipStart,
      memory_dates: memoryDates,
    });

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    window.location.href = `${window.location.origin}/love/${id}`;
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #fff5f7 0%, #ffe8ed 50%, #fff5f7 100%)",
        fontFamily: "sans-serif",
        color: "#2b2d42",
      }}
    >
      <section
        style={{
          maxWidth: 720,
          margin: "0 auto",
          padding: "50px 20px",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "clamp(40px, 7vw, 72px)",
            color: "#e63946",
            marginBottom: 24,
          }}
        >
          Tạo trang tình yêu ❤️
        </h1>

        <input
          placeholder="Tên của bạn"
          value={yourName}
          onChange={(e) => setYourName(e.target.value)}
          style={inputStyle}
        />

        <input
          placeholder="Tên người yêu"
          value={loverName}
          onChange={(e) => setLoverName(e.target.value)}
          style={inputStyle}
        />

        <textarea
          placeholder="Lời nhắn yêu thương ❤️"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{
            ...inputStyle,
            height: 120,
          }}
        />

        <div style={{ textAlign: "left", marginBottom: 16 }}>
          <p
            style={{
              marginBottom: 8,
              fontWeight: "bold",
              color: "#ff4f8b",
            }}
          >
            Ngày bắt đầu yêu 💕
          </p>

          <input
            type="datetime-local"
            value={relationshipStart}
            onChange={(e) => setRelationshipStart(e.target.value)}
            style={inputStyle}
          />
        </div>
      </section>

      <section style={{ padding: "40px 20px 80px" }}>
        <div style={{ textAlign: "center", marginBottom: 70 }}>
          <h2
            style={{
              fontSize: "clamp(32px, 5vw, 52px)",
              color: "#e63946",
              marginBottom: 12,
            }}
          >
            Chọn ảnh cho từng khung 📸
          </h2>

          <p style={{ color: "#8d99ae", fontSize: 18 }}>
            Chọn ảnh và ngày tháng ngay tại vị trí sẽ xuất hiện trong trang tình yêu
          </p>
        </div>

        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: 0,
              bottom: 0,
              width: 3,
              background:
                "linear-gradient(180deg, transparent, #ff6b9d, transparent)",
              transform: "translateX(-50%)",
            }}
          />

          {Array.from({ length: PHOTO_SLOTS }).map((_, index) => {
            const isEven = index % 2 === 0;
            const memory = memories[index];

            return (
              <div
                key={index}
                style={{
                  position: "relative",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 60,
                  alignItems: "center",
                  marginBottom: 90,
                }}
              >
                <div
                  style={{
                    order: isEven ? 1 : 2,
                    background: "white",
                    borderRadius: 24,
                    padding: 14,
                    boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
                  }}
                >
                  <label
                    style={{
                      display: "block",
                      width: "100%",
                      height: 400,
                      borderRadius: 16,
                      background: "#ffe4ec",
                      border: "3px dashed #ff9eb5",
                      overflow: "hidden",
                      cursor: "pointer",
                      position: "relative",
                    }}
                  >
                    {previews[index] ? (
                      <img
                        src={previews[index]}
                        alt={`Memory ${index + 1}`}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexDirection: "column",
                          color: "#ff4f8b",
                          fontWeight: "bold",
                          fontSize: 18,
                        }}
                      >
                        <div style={{ fontSize: 48, marginBottom: 12 }}>📷</div>
                        <div>Chọn ảnh cho Memory {index + 1}</div>
                        <div
                          style={{
                            fontSize: 14,
                            color: "#8d99ae",
                            marginTop: 8,
                          }}
                        >
                          Bấm vào khung này để chọn ảnh
                        </div>
                      </div>
                    )}

                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={(e) =>
                        handleSelectPhoto(index, e.target.files?.[0] || null)
                      }
                    />
                  </label>
                </div>

                <div
                  style={{
                    order: isEven ? 2 : 1,
                    background: "white",
                    borderRadius: 28,
                    padding: 42,
                    boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
                  }}
                >
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "10px 22px",
                      borderRadius: 999,
                      background: "#ffdde7",
                      color: "#e63946",
                      fontWeight: 700,
                      marginBottom: 16,
                    }}
                  >
                    📅 {formatDate(memoryDates[index])}
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <p
                      style={{
                        marginBottom: 8,
                        fontWeight: "bold",
                        color: "#ff4f8b",
                      }}
                    >
                      Chọn ngày cho Memory {index + 1}
                    </p>

                    <input
                      type="date"
                      value={memoryDates[index]}
                      onChange={(e) =>
                        handleMemoryDateChange(index, e.target.value)
                      }
                      style={{
                        width: "100%",
                        padding: 12,
                        borderRadius: 12,
                        border: "2px solid #ffb6c1",
                        fontSize: 16,
                        color: "#ff4f8b",
                        background: "white",
                      }}
                    />
                  </div>

                  <h3
                    style={{
                      fontSize: 34,
                      color: "#e63946",
                      marginBottom: 18,
                    }}
                  >
                    {memory.title}
                  </h3>

                  <p
                    style={{
                      fontSize: 19,
                      lineHeight: 1.8,
                      color: "#8d99ae",
                    }}
                  >
                    {memory.description}
                  </p>
                </div>

                <div
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: "white",
                    border: "6px solid #ff6b9d",
                    transform: "translate(-50%, -50%)",
                    zIndex: 2,
                  }}
                />

                <div
                  style={{
                    position: "absolute",
                    top: 12,
                    left: isEven ? "46%" : "unset",
                    right: isEven ? "unset" : "46%",
                    fontSize: 42,
                    zIndex: 3,
                  }}
                >
                  💕
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ textAlign: "center", marginTop: 30 }}>
          <button
            onClick={handleUpload}
            disabled={loading}
            style={{
              padding: "18px 42px",
              borderRadius: 999,
              border: "none",
              background: "linear-gradient(135deg, #e63946, #ff6b9d)",
              color: "white",
              fontSize: 20,
              fontWeight: "bold",
              cursor: "pointer",
              opacity: loading ? 0.7 : 1,
              boxShadow: "0 15px 40px rgba(230,57,70,0.35)",
            }}
          >
            {loading ? "Đang tạo..." : "Tạo trang tình yêu + QR ❤️"}
          </button>
        </div>
      </section>
    </main>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: 14,
  marginBottom: 12,
  borderRadius: 12,
  border: "1px solid #ddd",
  fontSize: 16,
  background: "white",
};