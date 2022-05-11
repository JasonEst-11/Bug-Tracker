import {React , useEffect, useState}from 'react';
import Sidebar from '../components/sidebar';
import {Table} from 'react-bootstrap';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import AddProject from '../components/modals/addproject';

const Projects  = () =>{
    const [search, setsearch] = useState("");
    const [projects, setprojects] = useState([]);
    const nav = useNavigate();
    
    //Load projects
    useEffect(()=>{
        axios.get("http://localhost:3001/api/projects").then(response=>{
                setprojects(response.data);
        })
    },[]);

    return ( 
        <div>
            <Sidebar/>
            <div className='container-fluid panel'>
                <div className='m-1 p-1 text-center'>
                    <h3 className='text-white'>Projects</h3> 
                </div>  
                <div className="col border rounded-3 border-1 border-secondary m-2 p-4 bg-white">
                    <div className="d-flex mb-3">
                        <input className='mx-2' type="text" placeholder="Search..." onChange={e=>{setsearch(e.target.value)}}/>
                        <div className="ms-auto p-2">
                            <AddProject projects={projects} setprojects={setprojects}/>
                        </div>
                        
                    </div>
                    <div className='col projectticket overflow-auto' >
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Role</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projects.filter((val)=>{
                                    if(search === ""){
                                        return val;
                                    }else if(val.proj_name.toLowerCase().includes(search.toLocaleLowerCase())){
                                        return val
                                    }
                                    return null;
                                }).map((val)=>{
                                    return(
                                    <tr onClick={()=>{nav('/project/'+val.proj_id)}} key={val.proj_id}>
                                        <td>{val.proj_id}</td>
                                        <td>{val.proj_name}</td>
                                        <td>{val.proj_desc}</td>
                                        <td>{val.role}</td>
                                    </tr>);
                                })}
                            </tbody>
                        </Table>
                    </div>        
                </div>
            </div>
        </div>
    );
}

export default Projects;