import { useEffect, useState } from "react";
import { Button, Dropdown } from "react-bootstrap"
import servicesApi from "../api/ServicesApi";
import mastersApi from "../api/MastersApi";
import { ICustomer, IMaster, IService } from "../model/IOrder";
import customersApi from "../api/CustomersApi";
import ordersApi from "../api/OrdersApi";

interface ICreateRow {
    onApply: () => void;

}

export const CreateRow = (props: ICreateRow) => {

    const [currentMaster, setMaster] = useState<IMaster | undefined>();
    const [currentService, setService] = useState<IService | undefined>();
    const [currentCustomer, setCustomer] = useState<ICustomer | undefined>();
    const [currentTime, setTime] = useState("");
    const [masters, setMasters] = useState<IMaster[]>([]);
    const [services, setServices] = useState<IService[]>([])
    const [customers, setCustomers] = useState<ICustomer[]>([])


    const fetchMasters = () => {
        mastersApi.getAll().then(result => setMasters(result));
    }

    const fetchServices = () => {
        servicesApi.getAll().then(result => setServices(result));
    }

    const fetchCustomers = () => {
        customersApi.getAll().then(result => setCustomers(result));
    }

    useEffect(() => { fetchMasters(); fetchServices(); fetchCustomers() }, []);


    const createClient = () => {
        ordersApi.create({
            masterId: currentMaster!.id,
            name: currentCustomer!.fullName,
            phone: currentCustomer!.phone,
            serviceId: currentService!.id,
            visitDate: currentTime
        }).then(() => props.onApply())
    }

    return (
        <tr>
            <td>#</td>
            <td>
                <Dropdown>
                    <Dropdown.Toggle variant="info" id="dropdown-basic">
                        Услуга{currentService && `: ${currentService.name}`}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {services.map(service => <Dropdown.Item onClick={() => setService(service)} key={service.id}>{service.name}</Dropdown.Item>)}
                    </Dropdown.Menu>
                </Dropdown>
            </td>
            <td>
                <Dropdown>
                    <Dropdown.Toggle variant="info" id="dropdown-basic">
                        Мастер{currentMaster && `: ${currentMaster.fullName}`}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {masters.map(master => <Dropdown.Item onClick={() => setMaster(master)} key={master.id}>{master.fullName}</Dropdown.Item>)}
                    </Dropdown.Menu>
                </Dropdown>
            </td>
            <td>
                <Dropdown>
                    <Dropdown.Toggle variant="info" id="dropdown-basic">
                        Клиент{currentCustomer && `: ${currentCustomer.fullName}`}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {customers.map(customer => <Dropdown.Item onClick={() => setCustomer(customer)} key={customer.id}>
                            {customer.surName} {customer.firstName} {customer.patronymic}</Dropdown.Item>)}
                    </Dropdown.Menu>
                </Dropdown>
            </td>
            <td></td>
            <td><input type="datetime-local" onChange={(event) => setTime(event.target.value)}></input></td>
            <td></td>
            <td><Button variant="success" onClick={() => { createClient(); }}>Добавить</Button></td></tr >)
}