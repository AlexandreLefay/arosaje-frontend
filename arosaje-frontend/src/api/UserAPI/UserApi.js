import {httpClient} from "../../utils/httpClient";

export const getUserById = async (props) => {
  return  await httpClient.get('/users/'+props.userId);
}