import React, { useEffect, useState } from 'react';
import Ticket from './ticket';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import axios from 'axios';


const Board = (props) =>{
    
    const [data, setdata] = useState([]);
    //get tickets 
    useEffect(()=>{
        axios.get("http://localhost:3001/api/tickets",{
            params:{
                Pid: props.projectid,
                state: props.status
            }
        }).then((response)=>{setdata(response.data)})
    },[data])

    const [{canDrop,isOver}, drop] = useDrop(
        ()=>({
            accept: ItemTypes.CARD,
            drop: () => ({ name: props.status}),
            collect: (monitor) =>({
                isOver: monitor.isOver(),
                canDrop: monitor.canDrop(),
        })
    }))

    const isActive = canDrop && isOver
    let backgroundColor = '#222'
    if (isActive) {
        backgroundColor = 'green'
    } else if (canDrop) {
        backgroundColor = 'grey'
    }

    return(     
        <div className="col border rounded-3 border-1 border-secondary mx-5 my-4 p-1 bg-white" ref={drop}>
            <div className='container-fluid'>
                <h5 className='text-center p-2'>{props.status}</h5>
            </div>           
            <div className='board' style={{backgroundColor}}>
                <div className='row justify-content-center pt-3 m-1'>
                    {data.map((val)=>{
                        return(
                            <Ticket data={val} setdata={setdata} t={data} key={val.t_id}/>
                        )
                    })}
                </div>
            </div>            
        </div>      
    )
}
export default Board;