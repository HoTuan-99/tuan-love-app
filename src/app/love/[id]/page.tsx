import { createClient } from "@supabase/supabase-js";
import LoveResult from "@/components/LoveResult";

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

  return <LoveResult data={data} />;
}