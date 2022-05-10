import {React,useState} from 'react';
import { Modal,Form,Button } from 'react-bootstrap';
import { Dropdown } from 'react-bootstrap';

const Ticketdet = ({data})=> {
    //Modal control
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //convert iso date format
    const dateconvert = (isodate) =>{
        let date = new Date(isodate);
        let year = date.getFullYear();
        let month = date.getMonth()+1;
        let dt = date.getDate();
        let output;
        if (dt < 10) {
        dt = '0' + dt;
        }
        if (month < 10) {
        month = '0' + month;
        output = year+'-' + month + '-'+dt;
        }
        return output;
    }

    return(
        <>
            <a className='row' onClick={handleShow}>Details</a>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Ticket Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Label>Title</Form.Label>
                        <Form.Control placeholder={data.t_title} disabled/>
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" placeholder={data.t_desc} rows={5} disabled/>
                        <div className='row'>
                            <div className='col'>
                                <Form.Label>Assign to member</Form.Label>
                                <Form.Select  disabled>
                                    <option>{data.handled_by}</option>
                                </Form.Select>                 
                            </div>
                            <div className='col'>
                                <Form.Label>Due date</Form.Label><br/>
                                <Form.Control placeholder={dateconvert(data.due_date)} disabled/>
                            </div>
                        </div>
                        
                        <div className='row'>
                            <div className='col'>
                                <Form.Label>Type</Form.Label>
                                <Form.Select  disabled>
                                    <option>{data.t_type}</option>
                                </Form.Select>                                
                            </div>
                            <div className='col'>
                                <Form.Label>Priority</Form.Label>
                                <Form.Select  disabled>
                                    <option>{data.t_prio}</option>
                                </Form.Select>                                
                            </div>
                            <div className='col'>
                                <Form.Label>Status</Form.Label>
                                <Form.Select  disabled>
                                    <option>{data.t_status}</option>
                                </Form.Select>                                
                            </div>
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default Ticketdet;