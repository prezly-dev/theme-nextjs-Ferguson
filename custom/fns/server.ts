import { app } from '@/adapters/server';
import type { Locale } from '@prezly/theme-kit-nextjs';

export async function getNewsroom() {
  return app().newsroom();
}

export async function getLanguage(localeCode: Locale.Code) {
  return app().languageOrDefault(localeCode);
}

export async function getThemeSettings() {
  return app().themeSettings();
}

// company information
export async function getCompanyInformation(localeCode: Locale.Code) {
  const language = await app().languageOrDefault(localeCode);

  return language.company_information;
}


