import { HttpService } from "../services/HttpService";

export interface ICreateOrderDto extends Record<string, string | number> {
    name: string;
    phone: string;
    masterId: number;
    serviceId: number;
    visitDate: string;
}

export interface IPatchOrderDto extends Record<string, string | number> {
    customerId: number;
    masterId: number;
    serviceId: number;
    visitDate: string;
    status: string;
    finishStatus: string;
    createdDate: string;
}


class OrdersApi extends HttpService {
    constructor() {
        super('/orders');
    }

    getAll() {
        return this.get('');
    }

    create(dto: ICreateOrderDto) {
        return this.post("", JSON.stringify(dto))
    }

    edit(dto: IPatchOrderDto, id: number) {
        return this.patch(`${id}`, JSON.stringify(dto))
    }

    remove(id: number) {
        return this.delete(`/${id}`);
    }
}

const ordersApi = new OrdersApi();

export default ordersApi;