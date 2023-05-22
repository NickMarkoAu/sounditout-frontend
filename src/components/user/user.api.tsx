import {PricingOptions} from "../../state/song-suggestion.model";
import axios from "axios";
import {User} from "./user.model";

export const fetchPricing = async () => {
  const response = await axios.get<PricingOptions>(`/api/pricing`);
  return response.data;
};

export const refreshUser = async (userId: string) => {
  try {
    const response = await axios.get<User>(`/api/user/get/` + userId);
    return response.data;
  } catch (e) {
    console.log(e);
    console.log("load user error ", e.response.data);
    return e.response.data;
  }
}