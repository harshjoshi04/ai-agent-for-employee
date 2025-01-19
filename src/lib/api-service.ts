import axios, { AxiosResponse } from "axios";
export const APIAiAgent = async (data: string): Promise<AxiosResponse> => {
  return await axios.post("/api/ai", { prompt: data });
};

export const APIGetEmployee = async (): Promise<AxiosResponse> => {
  return await axios.get("/api/ai");
};
