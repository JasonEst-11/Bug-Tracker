import axios from 'axios';
import React, { useState } from 'react';
import { Modal,Button,Form } from 'react-bootstrap';

const Passchange = ()=>{
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [newpass,setnewpass] = useState('');

    const passchange = ()=>{
        axios.post("http://localhost:3001/api/passchange",{
            newpass: newpass
        }).then(()=>{alert("Password Change successfull!")})
    }
    return(
        <>
            <Button variant="warning" onClick={handleShow}>
            Change Password
            </Button>
            <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Change Password</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control onChange={(e) =>{setnewpass(e.target.value)}} maxlength="30"/>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={()=>{
                    handleClose();
                    passchange();
                }}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
        </>
    )
}
export default Passchange;