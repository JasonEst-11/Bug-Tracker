import {React,useState,useEffect} from 'react';
import {Modal,Button,Form } from 'react-bootstrap';
import axios from 'axios';

const AddTicket = ({project_id}) =>{

    //Modal control
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [title, setTitle] = useState('');
    const [Description, setDesc] = useState('');
    const [assignedmember, setAssignedMember] = useState('')
    const [status, setStatus] = useState('Backlog');
    const [priority, setPriority] = useState('Low');
    const [type, setType] = useState('Task');
    const [date, setDate] = useState('');
     
    //fetch members of current project
    const [p_members, setMembers] = useState([]);
    useEffect(()=>{
        axios.get("http://localhost:3001/api/projectmembers",{
            params:{
                Pid: project_id
            }
        }).then((response)=>{
            setMembers(response.data);
        })
    },[]);

    const saveTicket = async () =>{
        axios.post('http://localhost:3001/api/addticket',{
            title: title,
            description: Description,
            member: assignedmember,
            type: type,
            priority: priority,
            status: status,
            date: date,
            Pid: project_id
        }).then(()=>{},()=>{alert('something went wrong please try again')});

        window.location.reload();
    }
    return(
        <>
            <Button variant="primary" onClick={handleShow}>
                Add Ticket
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Ticket</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Label>Title</Form.Label>
                        <Form.Control onChange={(e)=>{setTitle(e.target.value)}} maxlength="50"/>
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={5} onChange={(e)=>{setDesc(e.target.value)}} maxlength="255"/>
                        <div className='row'>
                            <div className='col'>
                                <Form.Label>Assign to member</Form.Label>
                                <Form.Select onChange={(e)=>{setAssignedMember(e.target.value)}}>
                                    <option value="">None</option>
                                    {p_members.map((val)=>{
                                        return(
                                            <option value={val.user_id} key={val.user_id}>{val.user_id}</option>
                                        )
                                    })}
                                </Form.Select>
                            </div>
                            <div className='col'>
                                <Form.Label>Due date</Form.Label><br/>
                                <input type="date"  placeholder="yyyy-mm-dd" onChange={(e)=>{setDate(e.target.value)}}></input>
                            </div>
                        </div>
                        
                        <div className='row'>
                            <div className='col'>
                                <Form.Label>Type</Form.Label>
                                <Form.Select onChange={(e)=>{setType(e.target.value)}}>
                                    <option value="Task">Task</option>
                                    <option value="Bug">Bug</option>
                                    <option value="Feature">Feature</option>
                                    <option value="Other">Other</option>
                                </Form.Select>
                            </div>
                            <div className='col'>
                                <Form.Label>Priority</Form.Label>
                                <Form.Select onChange={(e)=>{setPriority(e.target.value)}}>
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
                                    <option value="Very High">Very High</option>
                                </Form.Select>
                            </div>
                            <div className='col'>
                                <Form.Label>Status</Form.Label>
                                <Form.Select onChange={(e)=>{setStatus(e.target.value)}}>
                                    <option value="Backlog">Backlog</option>
                                    <option value="To Do">To Do</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Done">Done</option>
                                </Form.Select>
                            </div>
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={()=>{
                        saveTicket();
                        handleClose();
                    }}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AddTicket;