import axios from "axios";
import { Data } from "./data";
const API_URL = "http://localhost:8000";


export const getCsv = async (data: Data[]) => {
  return axios.post(API_URL + '/get/csv', {...data}, {responseType: 'blob'});
};
