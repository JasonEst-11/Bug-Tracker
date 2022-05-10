import React, {useState,useEffect} from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import Ticketdet from './modals/ticketdet';
import {IoArrowBackSharp,IoArrowForwardSharp} from 'react-icons/io5';
import AddTicket from './modals/addticket';

const Backlog = ({project_id})=>{
    //fetch backlog 
    const [backlog, setItems] = useState([]);
    useEffect(()=>{   
        axios.get("http://localhost:3001/api/backlog",{
            params:{
                Pid: project_id
            }
        }).then((response)=>{setItems(response.data)})
    },[]);

    const [pageNumber, setPageNumber] = useState(0);
    const rowperpage = 5;
    const pagesvisited = pageNumber * rowperpage;

    //addtoboard
    const addtoboard = (id) =>{
        axios.post('http://localhost:3001/api/puttoDo',{
            tid: id
        }).then(()=>{},()=>{})

        window.location.reload();
    }

    //deleteticket
    const deleteticket = (id)=>{
        axios.post('http://localhost:3001/api/deleteticket',{
            tid: id
        }).then(()=>{},()=>{})

        window.location.reload();
    } 

    const pagecount = Math.ceil(backlog.length / rowperpage);
    const changePage = ({selected}) =>{
        setPageNumber(selected);
    }

    return(
        <>
            <div className='d-flex mb-3'>
                <h5>Back Log</h5>
                <div className='ms-auto'>                   
                    <AddTicket project_id={project_id} backlog={backlog} setItems={setItems}/>
                </div>  
            </div>
            <div>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Type</th>
                        <th>Assigned to</th>
                    </tr>
                </thead>
                <tbody>
                    {backlog.slice(pagesvisited, pagesvisited+rowperpage).map((val)=>{
                        return(
                            <tr key={val.t_id}>
                                <td>{val.t_id}</td> 
                                <td>{val.t_title}</td>                
                                <td>{val.t_type}</td>
                                <td>{val.handled_by}</td>
                                <td>
                                    <div className="dropdown-container" tabIndex="-1">
                                        <div className="three-dots"></div>
                                        <div className="dropdown px-4 m-1 text-center">
                                            <Ticketdet data={val}/>
                                            <a className='row' onClick={()=>{deleteticket(val.t_id)}}>Delete</a>
                                            <a className='row' onClick={()=>{addtoboard(val.t_id)}}>To Do</a>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
            <div className='pag'>
                <ReactPaginate
                previousLabel={<IoArrowBackSharp/>}
                nextLabel={<IoArrowForwardSharp/>}
                pageCount={pagecount}
                onPageChange={changePage}
                containerClassName={"paginationBttns"}
                disabledLinkClassName={"paginationDisabled"}
                activeClassName={"paginationActive"}
                />
            </div>            
        </div>
    </>
    )
}

export default Backlog;