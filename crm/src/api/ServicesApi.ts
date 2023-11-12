import { IService } from "../model/IOrder";
import { HttpService } from "../services/HttpService";

class ServicesApi extends HttpService {
    constructor() {
        super('/services');
    }

    getAll(): Promise<IService[]> {
        return this.get('');
    }
}

const servicesApi = new ServicesApi();
export default servicesApi;