import {React,useEffect,useState} from 'react';
import {Modal,Button,Form} from 'react-bootstrap';
import axios from 'axios';
import {BiCog} from 'react-icons/bi';
const EditProject = ({project_id,permission,curname,curdesc}) =>{

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [name, setname] = useState('');
    const [desc, setdesc] = useState('');

    useEffect(()=>{
        setname(curname);
        setdesc(curdesc);
    },[curname,curdesc]);
    
    const edit = async () =>{
        axios.post('http://localhost:3001/api/editproject',{
            name: name,
            desc: desc,
            Pid: project_id
        }).then(()=>{},()=>{alert('something went wrong please try again')});

        window.location.reload();
    }

    return(
        <>
            {permission === 'Admin'&& <Button variant='secondary'className='m-2 p-2' onClick={handleShow}>Edit Project <BiCog/></Button>}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Project</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Project Name</Form.Label>
                            <Form.Control  value={name} onChange={(e) =>{setname(e.target.value)}} maxlength="20"/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" value={desc} rows={5} onChange={(e) =>{setdesc(e.target.value)}} maxlength="255"/>
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