const { REACT_APP_API_ROOT, REACT_APP_YANDEX_KEY, REACT_APP_URL } = process.env;

const config = {
  APP_URL: REACT_APP_URL,
  OBJECT_TYPE_BUILDING: 1,
  OBJECT_TYPE_APARTMENT: 2,
  OBJECT_TYPE_COTTAGE: 3,
  OBJECT_TYPE_COMMERCIAL: 4,
  API_ROOT: REACT_APP_API_ROOT,
  DEFAULT_LANGUAGE: "uz",
  DEFAULT_REGION: 12,
  DEFAULT_CURRENCY: "uzs",
  API_LANGUAGES: [
    { code: "uz", title: "O'zbekcha", shortTitle: "Uz" },
    { code: "ru", title: "Русский", shortTitle: "Ру" },
    { code: "en", title: "English", shortTitle: "En" },
  ],
  API_CURRENCIES: [
    { id: 1, code: "uzs", title: "UZS" },
    { id: 2, code: "usd", title: "USD" }
  ],
  REACT_APP_YANDEX_KEY: REACT_APP_YANDEX_KEY
};

export default config;
