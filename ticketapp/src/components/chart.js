import {React,useState,useEffect} from 'react';
import {PieChart,Pie,Tooltip} from 'recharts';
import axios from 'axios';

const Chart = ({projectid}) =>{
    const [status, setStatus] = useState({});
    const [priority, setPrio] = useState({});
    const [type, setType] = useState({});
    
    useEffect(()=>{   
        axios.get("http://localhost:3001/api/chartdata",{
            params:{
                Pid: projectid,
                column: 't_status'
            }
        }).then((response)=>{
            setStatus(response.data); 
        })
        axios.get("http://localhost:3001/api/chartdata",{
            params:{
                Pid: projectid,
                column: 't_prio'
            }
        }).then((response)=>{
            setPrio(response.data); 
        })
        axios.get("http://localhost:3001/api/chartdata",{
            params:{
                Pid: projectid,
                column: 't_type'
            }
        }).then((response)=>{
            setType(response.data); 
        })
    },[]);

    return( 
        <div className='row'>
            <div className='col border rounded-3 border-1 border-secondary m-2 p-3'>
                <h5>Ticket by Type</h5>
                <PieChart width={400} height={320}>
                    <Pie
                        data={type}
                        dataKey="value"
                        isAnimationActive={true}
                        cx={200}
                        cy={200}
                        outerRadius={80}
                        fill="#0275d8"
                        label
                    >
                    </Pie>
                    <Tooltip/>
                </PieChart>
            </div>
            
            <div className='col border rounded-3 border-1 border-secondary m-2 p-3'>
                <h5>Tickets by Priority</h5>
                <PieChart width={400} height={320}>
                    <Pie
                        data={priority}
                        dataKey="value"
                        isAnimationActive={true}
                        cx={200}
                        cy={200}
                        outerRadius={80}
                        fill="#5bc0de"
                        label
                    >
                    </Pie>            
                    <Tooltip/>
                </PieChart>
            </div>
            
            <div className='col border rounded-3 border-1 border-secondary m-2 p-3'>
                <h5>Tickets by Status</h5>
                <PieChart width={400} height={320}>
                    <Pie
                        data={status}
                        cx={200}
                        cy={200}            
                        label
                        outerRadius={80}
                        dataKey="value"
                        isAnimationActive={true}
                        fill="#5cb85c"
                    >
                    </Pie>
                    <Tooltip/>
                </PieChart> 
            </div>
        </div>      
    )
}
export default Chart;