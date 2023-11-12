export interface IOrder {
    id: number;
    createdDate: string;
    customer: ICustomer;
    visitDate: string;
    status: string;
    master: IMaster;
    service: IService;
    finishStatus: string;
}

export interface ICustomer {
    id: number;
    firstName: string;
    patronymic: string;
    surName: string;
    fullName: string;
    phone: string;
}

export interface IMaster {
    id: number;
    firstName: string;
    patronymic: string;
    surName: string;
    fullName: string;
    position: string;
    startWorkDate: Date;
    photo: string;
}

export interface IService {
    id: number;
    name: string;
    description: string;
    price: number;
    photo: string;
    isPopular: boolean;
}