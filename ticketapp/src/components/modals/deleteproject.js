import React,{useState} from 'react';
import axios from 'axios';
import { Button,Modal } from 'react-bootstrap';
import {BiTrash} from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

const DeleteProject = ({project_id,permission}) =>{
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const nav = useNavigate();

    const btnpermission = (permission) =>{
        if(permission === 'Admin'){
            return(
                <Button variant='danger' className='m-2 p-2' onClick={handleShow}>Delete Project <BiTrash/></Button>
            )
        }else{
            return(
                <Button variant='danger' className='m-2 p-2' disabled>Delete Project <BiTrash/></Button>
            )
        }
    }
    //delete funciton
    const deleteproject =()=>{
        axios.post("http://localhost:3001/api/deletetickets",{
            Pid: project_id
        }).then(()=>{
            axios.post("http://localhost:3001/api/deletemembers",{
                Pid: project_id
            }).then(()=>{
                axios.post("http://localhost:3001/api/deleteproject",{
                    Pid: project_id
                }).then(()=>{nav('/main')})
            })
        })
    }
    return(
        <>
            {btnpermission(permission)}

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Delete Project</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this project?</Modal.Body>
                <Modal.Footer>
                <Button variant="danger" onClick={()=>{
                    deleteproject();
                    handleClose();
                    }}>
                    Yes
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    No
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default DeleteProject;