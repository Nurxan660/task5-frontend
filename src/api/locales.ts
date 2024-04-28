import axios from "axios";

const API_URL = "https://fake-users-backend-bdf0d6c4d589.herokuapp.com";

export interface Locale {
  name: string;
  locale: string;
}

export const getLocales = async () => {
  return axios.get<Locale[]>(API_URL + '/get');
};
