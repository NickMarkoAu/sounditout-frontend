import {Post, PricingOptions} from "../../state/song-suggestion.model";
import axios from "axios";
import Config from "react-native-config";
import {User} from "./user.model";

export const fetchPricing = async () => {
  const response = await axios.get<PricingOptions>(`${Config.BACKEND_URL}/api/pricing`);
  return response.data;
};

export const refreshUser = async (userId: number) => {
  try {
    const response = await axios.get<User>(`/api/user/` + userId);
    return response.data;
  } catch (e) {
    console.log(e);
    console.log("load user error ", e.response.data);
    return e.response.data;
  }
}