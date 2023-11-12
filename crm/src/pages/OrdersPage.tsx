import { useEffect, useState } from "react";
import { Button, ButtonGroup, Dropdown, Table } from "react-bootstrap";
import OrdersApi, { IPatchOrderDto } from "../api/OrdersApi";
import { DeleteModal } from "../components/DeleteModal";
import { IMaster, IOrder, IService } from "../model/IOrder";
import { EditModal } from "../components/EditModal";
import { CreateRow } from "../components/CreateRow";



function convertDate(dateString: string): string {
    const date = new Date(dateString);
    const formattedDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
    const formattedTime = `${date.getHours()}:${date.getMinutes()}`;

    return `${formattedDate} ${formattedTime}`;
}



export const OrdersPage = () => {

    const fetchOrders = () => {
        OrdersApi.getAll().then(result => setOrders(result));
    }

    const handleDelete = (id: number | undefined) => {
        if (id === undefined) return;
        OrdersApi.delete(id.toString()).then(() => fetchOrders());
    }

    const handleEdited = (newMaster: IMaster, newService: IService, newTime: string) => {
        OrdersApi.edit({
            customerId: currentOrder!.customer.id,
            finishStatus: currentOrder!.finishStatus,
            masterId: newMaster.id,
            serviceId: newService.id,
            status: currentOrder!.status,
            visitDate: newTime,
            createdDate: currentOrder!.createdDate
        }, currentOrder!.id).then(() => fetchOrders());
    }

    const [orders, setOrders] = useState<IOrder[]>([]);
    const [showDelete, setShowDelete] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [currentOrder, setOrder] = useState<IOrder | null>(null);
    useEffect(fetchOrders, [])



    return (<>
        <EditModal show={showEdit}
            initialMaster={currentOrder?.master}
            initialService={currentOrder?.service}
            initialTime={currentOrder?.visitDate}
            onClose={() => setShowEdit(false)}
            onEdited={(newMaster: IMaster, newService: IService, newTime: string) => { handleEdited(newMaster, newService, newTime); setShowEdit(false); }} onAction={() => { }} />
        <DeleteModal show={showDelete}
            onAction={() => { handleDelete(currentOrder?.id); setShowDelete(false); }} onClose={() => setShowDelete(false)} />
        <Table hover striped>
            <thead>
                <tr><td>№</td>
                    <td>Услуга</td>
                    <td>ФИО мастера</td>
                    <td>ФИО Клиента</td>
                    <td>Дата создания</td>
                    <td>Время визита</td>
                    <td>Статус</td>
                    <td></td>
                </tr></thead>
            <tbody>
                {orders.sort((a, b) => a.id - b.id).map(order =>
                    <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.service.name}</td>
                        <td>{order.master.surName + " "}
                            {order.master.firstName + " "}
                            {order.master.patronymic}</td>
                        <td>{order.customer.surName + " "}
                            {order.customer.firstName + " "}
                            {order.customer.patronymic}</td>
                        <td>{convertDate(order.createdDate)}</td>
                        <td>{convertDate(order.visitDate)}</td>
                        <td>{order.status}</td>
                        <td>
                            <ButtonGroup>
                                <Button variant="danger"
                                    onClick={() => {
                                        setOrder(order)
                                        setShowDelete(true);
                                    }}>Удалить
                                </Button>
                                <Button variant="info" onClick={() => {
                                    setOrder(order)
                                    setShowEdit(true);
                                }}>Изменить</Button>
                            </ButtonGroup></td>

                    </tr>
                )}
                <CreateRow onApply={fetchOrders} />
            </tbody>

        </Table></>);
}