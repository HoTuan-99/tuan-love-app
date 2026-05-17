import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://ubdbtfkmiqldpabkvcrz.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InViZGJ0ZmttaXFsZHBhYmt2Y3J6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg5NTA4MzYsImV4cCI6MjA5NDUyNjgzNn0.K1i1njTsJZ3wA8tSvD7q3AAmcFZJcO-daqM3gqWwcLw"
);

export default async function LovePage({
  params,
}: {
  params: { id: string };
}) {
  const { data } = await supabase
    .from("love_pages")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!data) {
    return <div>Không tìm thấy 😢</div>;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#ffe4ec",
        padding: 40,
        textAlign: "center",
      }}
    >
      <h1>{data.your_name} ❤️ {data.lover_name}</h1>

      <p
        style={{
          fontSize: 24,
          marginTop: 20,
          whiteSpace: "pre-wrap",
        }}
      >
        {data.message}
      </p>

      <div
        style={{
          display: "flex",
          gap: 20,
          justifyContent: "center",
          flexWrap: "wrap",
          marginTop: 40,
        }}
      >
        {data.photos?.map((photo: string, index: number) => (
          <img
            key={index}
            src={photo}
            style={{
              width: 300,
              borderRadius: 20,
            }}
          />
        ))}
      </div>
    </div>
  );
}