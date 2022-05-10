import {React,useState} from 'react';
import {BiAddToQueue} from 'react-icons/bi';
import {Button,Modal,Form} from 'react-bootstrap';
import axios from 'axios';

const AddProject = (props) =>{
    //Modal control
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [p_name, setp_name] = useState('');
    const [p_desc, setp_desc] = useState('');

    //new project
    const nproject = async () =>{
        axios.post('http://localhost:3001/api/newproject',{
            Name: p_name,
            Desc: p_desc
        }).then((response)=>{
            axios.post("http://localhost:3001/api/roletoproj",{insertid: response.data.insertId}).then(()=>{window.location.reload();})
        },
        ()=>{
            alert('something went wrong please try again')
        });
        
    }

    return(
        <>
            <Button variant="primary" onClick={handleShow}>New Project <BiAddToQueue/></Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Project</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Project Name</Form.Label>
                            <Form.Control type="pname" onChange={(e) =>{setp_name(e.target.value)}} maxLength="20"/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={5} onChange={(e) =>{setp_desc(e.target.value)}} maxLength="255"/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={()=>{
                        nproject();
                        handleClose();
                    }}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>   
        </>
    )
}

export default AddProject;