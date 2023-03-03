import {Post, PricingOptions, User} from "../../state/song-suggestion.model";
import axios from "axios";
import Config from "react-native-config";

export const fetchPricing = async () => {
  const response = await axios.get<PricingOptions>(`${Config.BACKEND_URL}/api/pricing`);
  return response.data;
};