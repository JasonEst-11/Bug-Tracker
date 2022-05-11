import React, { useEffect, useState } from 'react';
import Sidebar from '../components/sidebar';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Tickets  = () =>{
    const nav = useNavigate();
    
    const [tickets, settickets] = useState([]);
    useEffect(()=>{
        axios.get("http://localhost:3001/api/ticketsbyuser").then((response)=>{
            settickets(response.data);
        })
    },[])

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
        return(
            <td>{output}</td>
        )
    }

    //calculate
    let tsum = 0;
    //Type
    var task=0,bug=0,feature=0,other=0;
    //Status
    var backlog=0,todo=0,inprogress=0,done=0;
    //Priority
    var low=0,med=0,high=0,vhigh=0;
     
    tickets.forEach(val=>{
        tsum++;
        if(val.t_type === 'Task'){
            task++;
        }else if(val.t_type === 'Bug'){
            bug++;
        }else if(val.t_type === 'Feature'){
            feature++;
        }else if(val.t_type === 'Other'){
            other++;
        }

        if(val.t_status === 'Backlog'){
            backlog++;
        }else if(val.t_status === 'To Do'){
            todo++;
        }else if(val.t_status === 'In Progress'){
            inprogress++;
        }else if(val.t_status === 'Done'){
            done++;
        }

        if(val.t_prio === 'Low'){
            low++;
        }else if(val.t_prio === 'Medium'){
            med++;
        }else if(val.t_prio === 'High'){
            high++;
        }else if(val.t_prio === 'Very High'){
            vhigh++;
        }
    })
    
    return ( 
        <div>
            <Sidebar/>
            <div className='container-fluid panel'>
                
                <div className='m-1 p-1 text-center'>
                    <h3 className='text-white'>Tickets</h3> 
                </div>         
                <div className="border rounded-3 border-1 border-secondary m-2 p-4 bg-white ">
                    <div className='row'>
                        <h4 className='text-center'>Total: {tsum}</h4>
                    </div>
                    <div className='row text-center'>
                        <div className='col text-primary'><h4>Type</h4></div>
                        <div className='col text-info'><h4>Priority</h4></div>
                        <div className='col text-success'><h4>Status</h4></div>
                    </div>
                    <div className='row text-center'>
                        <div className='col text-white bg-primary'>
                            <div className='d-flex justify-content-evenly my-2'>
                                <p>Task:{Math.round((task/tsum)*100)}%</p>
                                <p>Bug:{Math.round((bug/tsum)*100)}%</p>
                                <p>Feature:{Math.round((feature/tsum)*100)}%</p>
                                <p>Other:{Math.round((other/tsum)*100)}%</p>
                            </div>
                        </div>
                        <div className='col text-white bg-info'>
                            <div className='d-flex justify-content-evenly my-2'>
                                <p>Low:{Math.round((low/tsum)*100)}%</p>
                                <p>Medium:{Math.round((med/tsum)*100)}%</p>
                                <p>High:{Math.round((high/tsum)*100)}%</p>
                                <p>Very High:{Math.round((vhigh/tsum)*100)}%</p>
                            </div>
                        </div>
                        <div className='col text-white bg-success'>
                            <div className='d-flex justify-content-evenly my-2'>
                                <p>Backlog:{Math.round((backlog/tsum)*100)}%</p>
                                <p>To Do:{Math.round((todo/tsum)*100)}%</p>
                                <p>In Progress:{Math.round((inprogress/tsum)*100)}%</p>
                                <p>Done:{Math.round((done/tsum)*100)}%</p>
                            </div>
                        </div>
                    </div>
                    <div className='m-2 p-4 overflow-auto projectticket'>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                <th>#</th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Type</th>
                                <th>Priority</th>
                                <th>Status</th>
                                <th>Project ID</th>
                                <th>Due date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tickets.map((val)=>{
                                    return(
                                        <tr onClick={()=>{nav('/project/'+val.t_proj_id)}} key={val.t_id}>
                                            <td>{val.t_id}</td>
                                            <td>{val.t_title}</td>
                                            <td>{val.t_desc}</td>
                                            <td>{val.t_type}</td>
                                            <td>{val.t_prio}</td>
                                            <td>{val.t_status}</td>
                                            <td>{val.t_proj_id}</td>
                                            {dateconvert(val.due_date)}
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>           
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Tickets;