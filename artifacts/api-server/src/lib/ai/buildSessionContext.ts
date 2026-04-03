import type { Language, UserProfile } from "./types.js";

const GENDER_LABEL: Record<Language, Record<"female" | "male", string>> = {
  ko: { female: "여성", male: "남성" },
  en: { female: "Female", male: "Male" },
  ja: { female: "女性", male: "男性" },
  es: { female: "Femenino", male: "Masculino" },
  pt: { female: "Feminino", male: "Masculino" },
  fr: { female: "Féminin", male: "Masculin" },
};

export function buildSessionContext(profile: UserProfile): string {
  const locale = profile.locale;
  const genderLabel = GENDER_LABEL[locale]?.[profile.gender] ?? profile.gender;

  const fullName =
    locale === "ko"
      ? `${profile.lastName}${profile.firstName}`
      : `${profile.firstName} ${profile.lastName}`.trim();

  const birthDate = `${profile.birthYear}-${profile.birthMonth}-${profile.birthDay}`;
  const birthHour = profile.birthHour && profile.birthHour !== ""
    ? `${profile.birthHour}:00`
    : "unknown";

  return `
USER PROFILE FOR THIS READING:

Full Name: ${fullName}
Birth Date: ${birthDate}
Birth Hour: ${birthHour}
Gender: ${genderLabel}
Locale / Language: ${locale}
Selected Persona: ${profile.personaId}
Selected Reading: ${profile.productId}

IMPORTANT: Use this user's name naturally in your reading. Refer to their birth data as the basis of your spiritual analysis. Make the reading feel personal and specific to them — not generic.
`.trim();
}
