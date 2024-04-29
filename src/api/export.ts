import axios from "axios";
import { Data } from "./data";
const API_URL = "https://fake-users-backend-bdf0d6c4d589.herokuapp.com";


export const getCsv = async (data: Data[]) => {
  return axios.post(API_URL + '/get/csv', {...data}, {responseType: 'blob'});
};
