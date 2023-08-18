import React from 'react'
import Container from 'react-bootstrap/esm/Container';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

export default function Dashboard() {
 let { id } = useParams();
 let [data, setdata] = useState([]);
 let [task, settask] = useState([]);

 useEffect(() => {
  var token = localStorage.getItem('token');
  Promise.all([
   axios.get(`http://localhost:5001/users/dashboard/${id}`,{
     headers: { "Authorization": `${token}` }
    }),
   axios.get(`http://localhost:5001/users/all_task/${id}`, {
    headers: { "Authorization": `${token}` }
   })
  ])
   .then(function (response) {
    console.log(response[1].data.data);
    setdata(response[0].data.data);
    settask(response[1].data.data);
   })
   .catch(function (error) {
    console.log(error);
   })
 }, [id])

 const completeTask = (x) =>{
  var taskid = x;
  var token = localStorage.getItem('token');
  Promise.all([
   axios.get(`http://localhost:5001/users/${taskid}/task/1`,{
     headers: { "Authorization": `${token}` }
    }),
   axios.get(`http://localhost:5001/users/all_task/${id}`, {
    headers: { "Authorization": `${token}` }
   })
   .then(function (response) {
    console.log(response.data);
    settask(response.data.data);
   })
   .catch(function (error) {
    console.log(error);
   })
  ])
 }
 const DeleteTask = (x) =>{
  var taskid = x;
  var token = localStorage.getItem('token');
  Promise.all([
   axios.get(`http://localhost:5001/users/${taskid}/task/2`,{
     headers: { "Authorization": `${token}` }
    }),
   axios.get(`http://localhost:5001/users/all_task/${id}`, {
    headers: { "Authorization": `${token}` }
   })
   .then(function (response) {
    console.log(response.data);
    settask(response.data.data);
   })
   .catch(function (error) {
    console.log(error);
   })
  ])
 }

 return (
  <>
   <Container>
    <section className='spacer'>
     <div className="tital_name">
      {
       data.map((name,i)=>{
        return(
         <>
         <h1 className='text-capitalize'>{name.name}`s dashboard</h1>
         </>
        )
       })
      }
     </div>
    </section>
    <section>
     <Table border={2}>
      <thead>
       <tr>
        <th width={100}>No</th>
        <th width={200} className='text-center'>Task Name</th>
        <th width={200} className='text-center'>Complete</th>
        <th width={200} className='text-center'>Decline</th>
       </tr>
      </thead>
      <tbody>
       {
        task.map((val, i) => {
         return (
          <>
           <tr>
            <td>{i + 1}</td>
            <td className='text-capitalize'>{val.task_name}</td>
            <td className='button' onClick={()=>completeTask(val._id)}>Complete</td>
            <td className='button' onClick={()=>DeleteTask(val._id)}>Delete</td>
           </tr>
          </>
         )
        })
       }
      </tbody>
     </Table>
    </section>
   </Container>
  </>
 )
}
