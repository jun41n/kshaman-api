import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

type SharedRecord = { service: "past-life" | "face" | "palm"; title: string; summary: string; cardImageDataUrl: string; expiresAt: string };
const API_BASE = "https://api.mytesttype.com/api";
const SHARED_COPY: Record<string, { loading: string; expired: string; notice: string }> = {
  ko: { loading: "결과 카드를 불러오는 중입니다.", expired: "결과 카드를 찾을 수 없거나 공유 기간이 끝났습니다.", notice: "MyTestType 문화·오락 목적의 결과 카드" },
  en: { loading: "Loading your result card.", expired: "This result card could not be found or its sharing period has ended.", notice: "MyTestType result card for cultural entertainment" },
  ja: { loading: "結果カードを読み込んでいます。", expired: "結果カードが見つからないか、共有期間が終了しています。", notice: "文化・娯楽目的のMyTestType結果カード" },
  es: { loading: "Cargando tu tarjeta de resultado.", expired: "No se encuentra esta tarjeta o terminó el período para compartirla.", notice: "Tarjeta de resultado de MyTestType para entretenimiento cultural" },
  "pt-BR": { loading: "Carregando seu cartão de resultado.", expired: "O cartão não foi encontrado ou o período de compartilhamento terminou.", notice: "Cartão de resultado MyTestType para entretenimento cultural" },
  fr: { loading: "Chargement de votre carte de résultat.", expired: "Cette carte est introuvable ou sa période de partage est terminée.", notice: "Carte de résultat MyTestType à visée culturelle et ludique" },
};

export default function SharedResult({ id }: { id: string }) {
  const { i18n } = useTranslation();
  const locale = i18n.language?.toLowerCase().startsWith("pt") ? "pt-BR" : i18n.language?.split("-")[0] || "ko";
  const copy = SHARED_COPY[locale] ?? SHARED_COPY.en;
  const [record, setRecord] = useState<SharedRecord | null>(null);
  const [error, setError] = useState(false);
  useEffect(() => { fetch(`${API_BASE}/share-results/${encodeURIComponent(id)}`).then(async (response) => { if (!response.ok) throw new Error("not found"); return response.json(); }).then(setRecord).catch(() => setError(true)); }, [id]);
  return <main className="paper-grain flex min-h-screen items-center justify-center bg-[#e7c785] p-5 text-[#2a1b16]">
    <section className="w-full max-w-xl border border-[#8e5a38]/35 bg-[#f5d99e] p-5 shadow-[7px_7px_0_rgba(104,59,32,.18)]">
      {record ? <><img src={record.cardImageDataUrl} alt={record.title} className="w-full border border-[#8e5a38]/30" /><h1 className="mt-5 font-serif text-2xl font-bold">{record.title}</h1><p className="mt-3 leading-7 text-[#604133]">{record.summary}</p><p className="mt-5 text-xs text-[#79594b]">{copy.notice}</p></> : <p className="p-10 text-center">{error ? copy.expired : copy.loading}</p>}
    </section>
  </main>;
}
