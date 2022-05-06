import React, { useState,useEffect} from 'react';
import axios from 'axios';
import { Table, Dropdown} from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import Ticketdet from './modals/ticketdet';
import {IoArrowBackCircle,IoArrowForwardCircle} from 'react-icons/io5';

const Backlog = ({project_id})=>{
    //fetch backlog 
    const [backlog, setItems] = useState([]);
    useEffect(()=>{   
        axios.get("http://localhost:3001/api/backlog",{
            params:{
                Pid: project_id
            }
        }).then((response)=>{
            setItems(response.data);   
        })
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

    const displaybacklog = backlog.slice(pagesvisited, pagesvisited+rowperpage).map((val)=>{
        return(
            <tr key={val.t_id}>
                <td>{val.t_id}</td> 
                <td>{val.t_title}</td>                
                <td>{val.t_type}</td>
                <td>{val.t_prio}</td>
                <td>
                    <Dropdown>
                        <Dropdown.Toggle variant='secondary'> 
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Ticketdet data={val}/>
                            <Dropdown.Item onClick={()=>{deleteticket(val.t_id)}}>Delete</Dropdown.Item>
                            <Dropdown.Item onClick={()=>{addtoboard(val.t_id)}}>To Do</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </td>
            </tr>
        )
    })

    const pagecount = Math.ceil(backlog.length / rowperpage);
    const changePage = ({selected}) =>{
        setPageNumber(selected);
    }

    return(
        <div>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Type</th>
                        <th>Priority</th>
                    </tr>
                </thead>
                <tbody>
                    {displaybacklog}
                </tbody>
            </Table>
            <div className='pag'>
                <ReactPaginate
                previousLabel={<IoArrowBackCircle/>}
                nextLabel={<IoArrowForwardCircle/>}
                pageCount={pagecount}
                onPageChange={changePage}
                containerClassName={"paginationBttns"}
                disabledLinkClassName={"paginationDisabled"}
                activeClassName={"paginationActive"}
            />
            </div>            
        </div>
    )
}

export default Backlog;