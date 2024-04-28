function normalizeLocale(locale: string): string {
  return locale.replace(/_/g, "-");
}

function getLocaleDisplayName(locale: string): string {
  const normalizedLocale = normalizeLocale(locale);
  const localeObj = new Intl.Locale(normalizedLocale);

  const languageNames = new Intl.DisplayNames(["en"], { type: "language" });
  const language = languageNames.of(localeObj.language) || '';

  const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
  const region = localeObj.region ? regionNames.of(localeObj.region) : "";

  return region ? `${language} (${region})` : language;
}

export {getLocaleDisplayName}

