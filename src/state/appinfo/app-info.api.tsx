import {AppInfo} from "./app-info.model";
import axios from "axios";

export const getAppInfo = async () => {
  try {
    const response = await axios.get<AppInfo>(`/api/appinfo`);
    console.log("get app info response: ", response.data);
    return response.data;
  } catch (e) {
    console.log(e);
    console.log("get app info error: ", e.response.data);
    return e.response.data;
  }
}