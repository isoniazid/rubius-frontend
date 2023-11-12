import { IMaster } from "../model/IOrder";
import { HttpService } from "../services/HttpService";

class MastersApi extends HttpService {
    constructor() {
        super('/staff');
    }

    getAll(): Promise<IMaster[]> {
        return this.get('');
    }
}
const mastersApi = new MastersApi();
export default mastersApi;