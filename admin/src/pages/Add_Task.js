import { Container } from "react-bootstrap";
import Header from "./Header";
import { useEffect, useState } from "react";
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function AddTask() {
    let [task,settask] = useState([]);
    let [userOption, setuserOption] = useState([]);
    const [select, setSelected] = useState(userOption[0]);
    let [modal, setModal] = useState(false);

    const handleClose = () => setModal(false);

    const FormData = (e) => {
        settask(e.target.value);
    }

    const handleCourseId = (e) => {
        console.log(e.target.value);
        setSelected(e.target.value);
        localStorage.setItem("select_id",e.target.value);
    }

    useEffect(() => {
        var token = localStorage.getItem("token");

        axios.get(`http://localhost:5001/dashboard`,
        {
            headers: { "Authorization": `${token}` }
        })
            .then(function (response) {
                setuserOption(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }, []);


    const handleSubmit = (e) => {
        e.preventDefault();
        var selected = localStorage.getItem("select_id");
        var token = localStorage.getItem("token");

        axios.post(`http://localhost:5001/add_task/${selected}`, {
            task_name: task,
            user_id: selected,
            status: "pending"
        },
        {
            headers: { "Authorization": `${token}` }
        })
            .then(function (response) {
                console.log(response.data);
                settask([]);
                setSelected(userOption[0]);
                if(response.data.status === "success"){
                    setModal(true);
                }else{
                    setModal(false);
                }
        localStorage.setItem("select_id",null);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    return (
        <>
            <Header />
            <Container>
                <section className='spacer'>
                        <div className="tital_name">
                            <h1>Add Task</h1>
                        </div>
                </section>
                <section>
                    <form onSubmit={handleSubmit} className="border rounded border-secondary rounded-3">
                        <div className="h4 bg-primary p-3 rounded-top-3 background">Add Task</div>
                        <div className="form px-3">
                            <div className="user-box">
                                <label className='fw-bold mb-2 mt-3'>Select user</label><br />
                                <select value={select} onChange={handleCourseId} className='mb-3 w-50 rounded'>
                                    <option value={null} id="option" className='text-center'>--- Select User ---</option>
                                    {
                                        userOption.map((user, i) => {
                                            return (
                                                <>
                                                    <option value={user._id} id={user._id}>{user.name}</option>
                                                </>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                             <div className="user-box">
                                <label className='fw-bold mb-2 mt-3'>Enter Task</label><br />

                                <input
                                    type="text"
                                    placeholder="Enter Task"
                                    value={task}
                                    onChange={FormData}
                                    className='w-100 p-2 mb-3 rounded border border-1 border-secondary' cols="30" rows="5"/>
                            </div>
                            <input type="submit" className="fs-5 text-white btn-grad rounded py-1 px-5 mb-4 border-0" value="Add" />
                        </div>
                    </form>
                </section>
            </Container>
                <Modal show={modal} onHide={handleClose}>
                    <Modal.Body>Assign task successfully</Modal.Body>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                </Modal>
        </>
    )
}

export default AddTask;