import { useEffect, useState } from "react";
import Header from "./Header";
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";

function AllTask() {
    let { id } = useParams();
    let [task, settask] = useState([]);

    useEffect(() => {
        var token = localStorage.getItem('token');
        axios.get(`http://localhost:5001/all_task/${id}`,
        {
            headers: { "Authorization": `${token}` }
        })
            .then(function (response) {
                console.log(response.data.data)
                settask(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [id])

    return (
        <>
            <Header />
            <Container>
                <section className="spacer">
                    <table className="w-50 mx-auto">
                        <thead className="text-center">
                            <tr>
                                <th>No</th>
                                <th>Task Name</th>
                                <th>Task Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                task.map((name, i) => {
                                    return (
                                        <>
                                            <tr>
                                                <td className="px-2">{i + 1}</td>
                                                <td className="px-2">{name.task_name}</td>
                                                <td className="px-2">{name.status}</td>
                                            </tr>
                                        </>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </section>
            </Container>
        </>
    )
}

export default AllTask;