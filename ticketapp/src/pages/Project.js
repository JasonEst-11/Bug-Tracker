import {React,useState,useEffect} from 'react';
import axios from 'axios';
import Members from '../components/members';
import Sidebar from '../components/sidebar';
import Backlog from '../components/backlog';
import Chart from '../components/chart';
import Board from '../components/board';
import EditProject from '../components/modals/editproject';
import DeleteProject from '../components/modals/deleteproject';
import {useParams} from 'react-router-dom';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from "react-dnd-html5-backend";
import {Button} from 'react-bootstrap';
import {BiCheckCircle} from 'react-icons/bi';

const Project = () =>{
    let {projectid} = useParams('projectid');
    const [role, setrole] = useState('');
    const [projname, setprojname] = useState('');
    const [desc, setdesc] = useState('');
   

    useEffect(()=>{   
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
                            <Board status={"To Do"} projectid={projectid}/>
                            <Board status={"In Progress"} projectid={projectid}/>
                            <Board status={"Done"} projectid={projectid}/>     
                    </DndProvider>     
                </div>
                <div className='row'>
                    {/* Team members */}
                    <div className='col border rounded-3 border-1 border-secondary m-3 p-4 bg-white memberbacklog'>                                          
                        <Members project_id={projectid} permission={role}/>
                    </div>
                    {/* Backlog items */}
                    <div className='col border rounded-3 border-1 border-secondary m-3 p-4 bg-white memberbacklog'>
                        <Backlog project_id={projectid}/>
                    </div>
                </div> 
                {/* Project Stats */} 
                <div className="border rounded-3 border-1 border-secondary m-3 p-4 bg-white">
                    <Chart projectid={projectid}/>
                </div>
                <div className='m-2 p-2'>
                    <EditProject project_id={projectid} permission={role} curname={projname} curdesc={desc} setprojname={setprojname} setdesc={setdesc}/>
                    
                    <DeleteProject project_id={projectid} permission={role}/>
                </div>    
            </div>
        </div>
    );
}

export default Project;