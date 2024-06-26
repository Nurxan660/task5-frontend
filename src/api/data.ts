import axios from "axios";

const API_URL = "https://fake-users-backend-bdf0d6c4d589.herokuapp.com/data";

export interface Data {
  Number: number;
  UUID: string;
  Name: string;
  Phone: string;
  Address: string;
}

export const getTableData = async (region: string,seed: number,page: number,
  size: number,errNum: number) => {
  return axios.get<Data[]>(
    API_URL +
      `/generate?region=${region}&seed=${seed}&page=${page}&size=${size}&error=${errNum}`
  );
};
