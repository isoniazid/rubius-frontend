import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { IModal } from './IModal';



export const DeleteModal = (props: IModal) => {


    return (
        <Modal show={props.show} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>Подтвердите действие</Modal.Title>
            </Modal.Header>
            <Modal.Body>Вы действительно хотите удалить запись?</Modal.Body>
            <Modal.Footer>
                <Button variant="outline-info" onClick={props.onClose}>
                    Отмена
                </Button>
                <Button variant="outline-danger" onClick={props.onAction}>
                    Удалить
                </Button>
            </Modal.Footer>
        </Modal>
    );
}