import {React,useState,useEffect} from 'react';
import Members from '../components/members';
import Sidebar from '../components/sidebar';
import {useParams} from 'react-router-dom';
import Backlog from '../components/backlog';
import AddTicket from '../components/modals/addticket';
import AddMember from '../components/modals/addmember';
import Board from '../components/board';
import axios from 'axios';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from "react-dnd-html5-backend";
import Chart from '../components/chart';
import {Button} from 'react-bootstrap';
import EditProject from '../components/modals/editproject';
import DeleteProject from '../components/modals/deleteproject';

const Project = () =>{
    let {projectid} = useParams('projectid');
    const [todo, setTodo] = useState([]);
    const [inprog, setInprog] = useState([]);
    const [done, setDone] = useState([]);
    const [role, setrole] = useState('');
    const [projname, setprojname] = useState('');
    const [desc, setdesc] = useState('');
   

    useEffect(()=>{   
        //fetch tickets
        axios.get("http://localhost:3001/api/tickets",{
            params:{
                Pid: projectid,
                state: "To Do"
            }
        }).then((response)=>{
            setTodo(response.data); 
        })
        axios.get("http://localhost:3001/api/tickets",{
            params:{
                Pid: projectid,
                state: "In Progress"
            }
        }).then((response)=>{
            setInprog(response.data); 
        })
        axios.get("http://localhost:3001/api/tickets",{
            params:{
                Pid: projectid,
                state: "Done"
            }
        }).then((response)=>{
            setDone(response.data); 
        })
        //Get project details and user role
        axios.get("http://localhost:3001/api/role",{
            params:{
                Pid: projectid
            }
        }).then((response)=>{
            setrole(response.data[0].role);
            setprojname(response.data[0].proj_name);
            setdesc(response.data[0].proj_desc)
        })
    },[]);

    //Resolve tickets
    const resolve =()=>{
        alert("")
    }
    
    return ( 
        <div>
            <Sidebar/>
            <div className='container-fluid panel'>
                <div className='d-flex'>
                    <h1 className='text-white m-3'>{projname}</h1>
                    <p className='text-white mx-auto m-4'>{desc}</p>    
                </div>                
                {/* Kanban board */}
                <div className="row">
                    <DndProvider backend={HTML5Backend}>
                            <Board status={"To Do"}  data={todo}/>
                            <Board status={"In Progress"} data={inprog}/>
                            <Board status={"Done"} data={done}/>               
                    </DndProvider>     
                </div>
                <div className='row'>
                    {/* Team members */}
                    <div className='col border rounded-3 border-1 border-secondary m-3 p-4 bg-white memberbacklog'>
                        <div className='d-flex mb-3'>
                            <h5>Contributors</h5> 
                            <div className='ms-auto'>
                                <AddMember project_id={projectid} permission={role}/>
                            </div>         
                        </div>                                              
                        <Members project_id={projectid} permission={role}/>
                    </div>
                    {/* Backlog items */}
                    <div className='col border rounded-3 border-1 border-secondary m-3 p-4 bg-white memberbacklog'>
                        <div className='d-flex mb-3'>
                            <h5>Back Log</h5>
                            <div className='ms-auto'>                   
                                <AddTicket project_id={projectid}/>
                                {
                                    role === "Admin"? 
                                     <Button variant='warning' className='mx-2' onClick={resolve}>Resolve Done</Button>
                                     : 
                                     <Button variant='warning' className='mx-2' disabled>Resolve Done</Button>
                                }
                            </div>  
                        </div>                  
                        <Backlog project_id={projectid}/>
                    </div>
                </div> 
                {/* Project Stats */} 
                <div className="border rounded-3 border-1 border-secondary m-3 p-4 bg-white">
                    <Chart projectid={projectid}/>
                </div>
                <div className='m-2 p-2'>
                    <EditProject project_id={projectid} permission={role} curname={projname} curdesc={desc}/>
                    <DeleteProject project_id={projectid} permission={role}/>
                </div>    
            </div>
        </div>
    );
}

export default Project;