import { useEffect, useState } from "react";

type Record = { service: "past-life" | "face" | "palm"; title: string; summary: string; cardImageDataUrl: string; expiresAt: string };
const API_BASE = "https://api.mytesttype.com/api";

export default function SharedResult({ id }: { id: string }) {
  const [record, setRecord] = useState<Record | null>(null);
  const [error, setError] = useState(false);
  useEffect(() => { fetch(`${API_BASE}/share-results/${encodeURIComponent(id)}`).then(async (response) => { if (!response.ok) throw new Error("not found"); return response.json(); }).then(setRecord).catch(() => setError(true)); }, [id]);
  return <main className="paper-grain flex min-h-screen items-center justify-center bg-[#e7c785] p-5 text-[#2a1b16]">
    <section className="w-full max-w-xl border border-[#8e5a38]/35 bg-[#f5d99e] p-5 shadow-[7px_7px_0_rgba(104,59,32,.18)]">
      {record ? <><img src={record.cardImageDataUrl} alt={record.title} className="w-full border border-[#8e5a38]/30" /><h1 className="mt-5 font-serif text-2xl font-bold">{record.title}</h1><p className="mt-3 leading-7 text-[#604133]">{record.summary}</p><p className="mt-5 text-xs text-[#79594b]">MyTestType 문화·오락 목적의 결과 카드</p></> : <p className="p-10 text-center">{error ? "결과 카드를 찾을 수 없거나 공유 기간이 끝났습니다." : "결과 카드를 불러오는 중입니다."}</p>}
    </section>
  </main>;
}
