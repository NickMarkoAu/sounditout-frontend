import axios from "axios";

export const validateInviteCode = async (inviteCode) => {
  try {
    console.log("Validating invite code: ", inviteCode);
    const response = await axios.get(`/api/invite/validate/${inviteCode}`);
    console.log("validate invite code response: ", response.data);
    return response.data;
  } catch (e) {
    console.log(e);
    console.log("validate invite code error: ", e.response.data);
    return e.response.data;
  }
}