import {React,useState} from 'react';
import {Modal,Button,Form} from 'react-bootstrap';
import axios from 'axios';
const AddMember = ({project_id,permission}) =>{

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [memId, setMemId] = useState('');

    const addmember = async () =>{
        axios.post('http://localhost:3001/api/addmember',{
            Uid: memId,
            Pid: project_id
        }).then(()=>{},()=>{alert('something went wrong please try again')});

        window.location.reload();
    }

    return(
        <>
            {permission === 'Admin'&& <Button onClick={handleShow}>Add Member</Button>}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Member</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>User Email</Form.Label>
                            <Form.Control onChange={(e) =>{setMemId(e.target.value)}} maxlength="50"/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={()=>{
                        handleClose();
                        addmember();
                    }}>
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default AddMember;