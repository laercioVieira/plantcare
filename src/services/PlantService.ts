import axios from "axios";
import { Environment } from '../model/Environment';
import { Plant } from '../model/Plant';

const client = axios.create({
    baseURL: "http://192.168.0.14:3333"
});

class PlantService {

    constructor(){}
    
    async getPlantsEnvironments(): Promise<Environment[]> {
        const { data } = await client.get("plants_environments?_sort=title&_order=asc");
        return data;
    }
    async getPlants(page=1, limit=8): Promise<Plant[]> {
        const { data } = await client
            .get(`plants?_sort=name&_order=asc&_page=${page}&_limit=${limit}`);
        return data;
    }
}

const plantService = new PlantService();
export default plantService;