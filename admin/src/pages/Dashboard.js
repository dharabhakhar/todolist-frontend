import Container from 'react-bootstrap/esm/Container';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Dashboard() {
    let [data, setdata] = useState([]);

    useEffect(() => {
        var token = localStorage.getItem('token');
        axios.get(`http://localhost:5001/dashboard`,
        {
            headers: { "Authorization": `${token}` }
        }
        )
            .then(function (response) {
                console.log(response.data.data);
                setdata(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [])
    return (
        <>
            <Container>
                <section className='spacer'>
                    <div className="tital_name">
                        <h1>Dashboard</h1>
                    </div>
                </section>
                <section>
                    <Table border={2}>
                        <thead>
                            <tr>
                                <th width={100}>No</th>
                                <th>Name</th>
                                <th width={200} className='text-center'>Task Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((name,i)=>{
                                    return(
                                        <>
                                        <tr>
                                            <td>{i+1}</td>
                                            <td>{name.name}</td>
                                            <td className='p-0 '>
                                            <Link to={`/task/${name._id}`} className='btn-grad py-3 mx-4 px-4'>View Detail</Link>
                                            </td>
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

export default Dashboard;