import { ICustomer } from "../model/IOrder";
import { HttpService } from "../services/HttpService";

class CustomersApi extends HttpService {
    constructor() {
        super('/customers');
    }

    getAll(): Promise<ICustomer[]> {
        return this.get('');
    }
}
const customersApi = new CustomersApi();
export default customersApi;