import { useState } from "react";
import { useApp } from "../store/appStore";
import type { PartnerInfo } from "../types";
import { StickyCTA } from "../components/StickyCTA";
import { SiteNav } from "../components/SiteNav";

interface Props {
  onNext: () => void;
  onBack: () => void;
}

const YEARS = Array.from({ length: 100 }, (_, i) => String(2026 - i));
const MONTHS = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0"));
const DAYS = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, "0"));
const HOURS = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0"));

export function PartnerInfoFormPage({ onNext, onBack }: Props) {
  const { state, setPartnerInfo, selectedPersona } = useApp();
  const lang = state.currentLang;
  const isKo = lang === "ko";

  const [form, setForm] = useState<PartnerInfo>({
    lastName: "",
    firstName: "",
    birthYear: "",
    birthMonth: "",
    birthDay: "",
    birthHour: "",
    gender: null,
  });

  const isValid =
    form.lastName &&
    form.firstName &&
    form.birthYear &&
    form.birthMonth &&
    form.birthDay &&
    form.gender;

  const handleSubmit = () => {
    if (!isValid) return;
    setPartnerInfo(form);
    onNext();
  };

  const fromColor = selectedPersona?.colorFrom ?? "from-violet-600";
  const toColor = selectedPersona?.colorTo ?? "to-indigo-500";

  return (
    <div className="text-white">
      <SiteNav onBack={onBack} backLabel={isKo ? "뒤로" : "Back"} />

      <div className="px-4 pt-8 pb-6 text-center">
        <div
          className={`w-16 h-16 rounded-full bg-gradient-to-br ${fromColor} ${toColor} flex items-center justify-center text-3xl mx-auto mb-4 shadow-lg`}
        >
          💑
        </div>
        <h1 className="text-xl font-bold">
          {isKo ? "상대방 정보를 알려주세요" : "Tell me about your partner"}
        </h1>
        <p className="text-sm text-white/40 mt-2">
          {isKo
            ? "두 사람의 사주를 함께 풀어 진짜 궁합을 봅니다"
            : "I'll read both saju to reveal your true compatibility"}
        </p>
      </div>

      <div className="px-4 max-w-md mx-auto space-y-5">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-white/50 mb-1 block">
              {isKo ? "상대 성(姓)" : "Partner Last Name"}
            </label>
            <input
              type="text"
              value={form.lastName}
              onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-violet-500 transition-colors text-sm"
              placeholder={isKo ? "김" : "Smith"}
            />
          </div>
          <div>
            <label className="text-xs text-white/50 mb-1 block">
              {isKo ? "상대 이름" : "Partner First Name"}
            </label>
            <input
              type="text"
              value={form.firstName}
              onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-violet-500 transition-colors text-sm"
              placeholder={isKo ? "민준" : "Alex"}
            />
          </div>
        </div>

        <div>
          <label className="text-xs text-white/50 mb-1 block">
            🎂 {isKo ? "상대 생년월일" : "Partner Birth Date"}
          </label>
          <div className="grid grid-cols-3 gap-2">
            <select
              value={form.birthYear}
              onChange={(e) => setForm((f) => ({ ...f, birthYear: e.target.value }))}
              className="bg-white/5 border border-white/10 rounded-xl px-3 py-3 text-white focus:outline-none focus:border-violet-500 transition-colors text-sm"
            >
              <option value="" className="bg-gray-900">--</option>
              {YEARS.map((y) => (
                <option key={y} value={y} className="bg-gray-900">{y}</option>
              ))}
            </select>
            <select
              value={form.birthMonth}
              onChange={(e) => setForm((f) => ({ ...f, birthMonth: e.target.value }))}
              className="bg-white/5 border border-white/10 rounded-xl px-3 py-3 text-white focus:outline-none focus:border-violet-500 transition-colors text-sm"
            >
              <option value="" className="bg-gray-900">--</option>
              {MONTHS.map((m) => (
                <option key={m} value={m} className="bg-gray-900">{m}</option>
              ))}
            </select>
            <select
              value={form.birthDay}
              onChange={(e) => setForm((f) => ({ ...f, birthDay: e.target.value }))}
              className="bg-white/5 border border-white/10 rounded-xl px-3 py-3 text-white focus:outline-none focus:border-violet-500 transition-colors text-sm"
            >
              <option value="" className="bg-gray-900">--</option>
              {DAYS.map((d) => (
                <option key={d} value={d} className="bg-gray-900">{d}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="text-xs text-white/50 mb-1 block">
            🕐 {isKo ? "상대 출생 시간 (모르면 패스)" : "Partner Birth Hour (optional)"}
          </label>
          <select
            value={form.birthHour}
            onChange={(e) => setForm((f) => ({ ...f, birthHour: e.target.value }))}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 transition-colors text-sm"
          >
            <option value="" className="bg-gray-900">
              {isKo ? "모름 (괜찮아요)" : "Unknown (that's okay)"}
            </option>
            {HOURS.map((h) => (
              <option key={h} value={h} className="bg-gray-900">{h}:00</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs text-white/50 mb-2 block">
            ⚧ {isKo ? "상대 성별" : "Partner Gender"}
          </label>
          <div className="grid grid-cols-2 gap-3">
            {(["female", "male"] as const).map((g) => (
              <button
                key={g}
                onClick={() => setForm((f) => ({ ...f, gender: g }))}
                className={`py-3 rounded-xl border text-sm font-medium transition-all ${
                  form.gender === g
                    ? `bg-gradient-to-r ${fromColor} ${toColor} border-transparent text-white`
                    : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"
                }`}
              >
                {g === "female" ? (isKo ? "여성" : "Female") : (isKo ? "남성" : "Male")}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-violet-500/20 bg-violet-900/10 px-4 py-3">
          <p className="text-xs text-violet-200/60 leading-relaxed text-center">
            {isKo
              ? "두 사람의 연지(年支)·천간(天干) 오행을 직접 계산해\n명리학 기반 궁합을 봅니다. 생년만 있으면 충분합니다."
              : "I'll calculate both birth pillars and five-element compatibility\nbased on traditional Korean astrology (四柱)."}
          </p>
        </div>
      </div>

      <StickyCTA
        label={isKo ? "궁합 보기" : "See Compatibility"}
        onClick={handleSubmit}
        disabled={!isValid}
      />
    </div>
  );
}
