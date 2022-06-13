import {BASE_API_URL} from "../common/constants";
import axios from "axios";
import {authHeader} from "./base.service";

const API_URL = BASE_API_URL + "/api/shoes"


class ShoesService {

        saveShoes(shoes) {
            return axios.post(API_URL, shoes, {headers: authHeader()});
        }

        deleteShoes(shoes) {
            return axios.delete(API_URL + '/' + shoes.id, {headers: authHeader()});
        }

        getAllShoes(){
            return axios.get(API_URL)
        }
}

export default new ShoesService();