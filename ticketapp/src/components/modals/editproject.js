import {React,useEffect,useState} from 'react';
import {Modal,Button,Form} from 'react-bootstrap';
import axios from 'axios';
import {BiCog} from 'react-icons/bi';
const EditProject = (props) =>{

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [name, setname] = useState('');
    const [desc, setdesc] = useState('');

    useEffect(()=>{
        setname(props.curname);
        setdesc(props.curdesc);
    },[props.curname,props.curdesc]);
    
    const edit = async () =>{
        axios.post('http://localhost:3001/api/editproject',{
            name: name,
            desc: desc,
            Pid: props.project_id
        }).then(()=>{
            props.setprojname(name);
            props.setdesc(desc);
        },()=>{alert('something went wrong please try again')});
    }

    return(
        <>
            {props.permission === 'Admin'&& <Button variant='secondary'className='m-2 p-2' onClick={handleShow}>Edit Project <BiCog/></Button>}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Project</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Project Name</Form.Label>
                            <Form.Control  value={name} onChange={(e) =>{setname(e.target.value);}} maxLength="20"/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" value={desc} rows={5} onChange={(e) =>{setdesc(e.target.value)}} maxLength="255"/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={()=>{                        
                        edit();
                        handleClose();
                    }}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default EditProject;