import { useState } from "react";
import { T } from "../config/i18n";
import { useApp } from "../store/appStore";
import type { UserInfo } from "../types";
import { StickyCTA } from "../components/StickyCTA";
import { LanguageSwitcher } from "../components/LanguageSwitcher";

interface Props {
  onNext: () => void;
  onBack: () => void;
}

const YEARS = Array.from({ length: 100 }, (_, i) => String(2005 - i));
const MONTHS = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0"));
const DAYS = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, "0"));
const HOURS = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0"));

export function UserInfoFormPage({ onNext, onBack }: Props) {
  const { state, setUserInfo, selectedPersona } = useApp();
  const t = T[state.currentLang];

  const [form, setForm] = useState<UserInfo>({
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
    setUserInfo(form);
    onNext();
  };

  const fromColor = selectedPersona?.colorFrom ?? "from-violet-600";
  const toColor = selectedPersona?.colorTo ?? "to-indigo-500";

  return (
    <div className="min-h-screen bg-gray-950 text-white pb-28">
      <div className="sticky top-0 z-30 px-4 py-3 flex items-center justify-between bg-gray-950/80 backdrop-blur-md border-b border-white/5">
        <button onClick={onBack} className="text-white/60 hover:text-white transition-colors text-sm flex items-center gap-1">
          ← {t.back}
        </button>
        <div className="text-center">
          <span className="text-lg">{selectedPersona?.emoji}</span>
          <span className="ml-1 text-sm font-semibold text-white/70">
            {selectedPersona?.display_name_ko}
          </span>
        </div>
        <LanguageSwitcher />
      </div>

      <div className="px-4 pt-8 pb-6 text-center">
        <div
          className={`w-16 h-16 rounded-full bg-gradient-to-br ${fromColor} ${toColor} flex items-center justify-center text-3xl mx-auto mb-4 shadow-lg`}
        >
          {selectedPersona?.emoji}
        </div>
        <h1 className="text-xl font-bold">{t.tellUsAboutYou}</h1>
      </div>

      <div className="px-4 max-w-md mx-auto space-y-5">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-white/50 mb-1 block">{t.lastName}</label>
            <input
              type="text"
              value={form.lastName}
              onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-violet-500 transition-colors text-sm"
              placeholder="김"
            />
          </div>
          <div>
            <label className="text-xs text-white/50 mb-1 block">{t.firstName}</label>
            <input
              type="text"
              value={form.firstName}
              onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-violet-500 transition-colors text-sm"
              placeholder="지수"
            />
          </div>
        </div>

        <div>
          <label className="text-xs text-white/50 mb-1 block">🎂 {t.birthYear} / {t.birthMonth} / {t.birthDay}</label>
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
          <label className="text-xs text-white/50 mb-1 block">🕐 {t.birthHour}</label>
          <select
            value={form.birthHour}
            onChange={(e) => setForm((f) => ({ ...f, birthHour: e.target.value }))}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 transition-colors text-sm"
          >
            <option value="" className="bg-gray-900">{t.hourUnknown}</option>
            {HOURS.map((h) => (
              <option key={h} value={h} className="bg-gray-900">{h}:00</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs text-white/50 mb-2 block">⚧ {t.gender}</label>
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
                {g === "female" ? t.female : t.male}
              </button>
            ))}
          </div>
        </div>
      </div>

      <StickyCTA
        label={t.next}
        onClick={handleSubmit}
        disabled={!isValid}
      />
    </div>
  );
}
