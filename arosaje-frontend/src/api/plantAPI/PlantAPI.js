
import {httpClient} from "../../utils/httpClient";


export const getUserPlants = async (props) => {
    return await httpClient.get('/plants/user/'+props.user);
}
export const getPlantById = async (props) => {
    return await httpClient.get('/plants/'+props.plantId);
}