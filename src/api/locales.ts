import axios from "axios";

const API_URL = "http://localhost:8000/locales";

export interface Locale {
  name: string;
  locale: string;
}

export const getLocales = async () => {
  return axios.get<Locale[]>(API_URL + '/get');
};
