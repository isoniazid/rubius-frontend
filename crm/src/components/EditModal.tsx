import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { IModal } from './IModal';
import { IMaster, IOrder, IService } from '../model/IOrder';
import { Dropdown } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import mastersApi from '../api/MastersApi';
import servicesApi from '../api/ServicesApi';


export interface IEditModal extends IModal {
    initialMaster: IMaster | undefined
    initialService: IService | undefined
    initialTime: string | undefined
    onEdited: (newMaster: IMaster, newService: IService, newTime: string) => void
}

function convertTime(timeString: string): string {
    const date = new Date(timeString);
    const convertedTime = date.toISOString();

    return convertedTime;
}

export const EditModal = (props: IEditModal) => {

    const [currentMaster, setMaster] = useState(props.initialMaster);
    const [currentService, setService] = useState(props.initialService);
    const [currentTime, setTime] = useState(props.initialTime)
    const [masters, setMasters] = useState<IMaster[]>([]);
    const [services, setServices] = useState<IService[]>([])


    const fetchMasters = () => {
        mastersApi.getAll().then(result => setMasters(result));
    }

    const fetchServices = () => {
        servicesApi.getAll().then(result => setServices(result));
    }

    useEffect(() => { fetchMasters(); fetchServices() }, [])


    const updateMaster = (newMaster: IMaster) => {
        setMaster(newMaster)
    }

    const updateService = (newService: IService) => {
        setService(newService);
    }

    const updateTime = (event: any) => {
        setTime(convertTime(event.target.value));
    }

    return (
        <Modal show={props.show} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>Редактирование записи</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Мастер: {currentMaster?.fullName}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {masters.map(master => <Dropdown.Item onClick={() => updateMaster(master)} key={master.id}>{master.fullName}</Dropdown.Item>)}
                    </Dropdown.Menu>
                </Dropdown>
                <br />
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Услуга {currentService?.name}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {services.map(service =>
                            <Dropdown.Item onClick={() => updateService(service)} key={service.id}>
                                {service.name}
                            </Dropdown.Item>)}
                    </Dropdown.Menu>
                </Dropdown>
                <br />
                <label>Дата визита:</label>
                <input type="datetime-local" placeholder={currentTime} onChange={updateTime}></input>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-info" onClick={props.onClose}>
                    Отмена
                </Button>
                <Button variant="outline-danger" onClick={() => props.onEdited(currentMaster!, currentService!, currentTime!)}>
                    Применить изменения
                </Button>
            </Modal.Footer>
        </Modal>
    );
}