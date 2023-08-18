import { Container } from "react-bootstrap";
import Header from "./Header";
import { useState } from "react";
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function User() {
    let [email, setemail] = useState("");
    let [user_name, setuser_name] = useState("");
    let [phone_no, setphone_no] = useState("");
    let [password, setpassword] = useState("");
    let [modal, setModal] = useState(false);

    const handleClose = () => setModal(false);

    const UserName = (e) => {
        setuser_name(e.target.value);
    }
    const UserEmail = (e) => {
        setemail(e.target.value);
    }
    const UserPhone = (e) => {
        setphone_no(e.target.value);
    }
    const UserPassword = (e) => {
        setpassword(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        var token = localStorage.getItem("token");

        axios.post(`http://localhost:5001/add_user`, {
            email: email,
            name: user_name,
            phone_no: phone_no,
            password: password
        },
        {
            headers: { "Authorization": `${token}` }
        })
            .then(function (response) {
                console.log(response.data);
                if (response.data.status === "success") {
                    setModal(true);
                } else {
                    setModal(false);
                }
                setuser_name("");
                setemail("");
                setphone_no("");
                setpassword("");
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    return (
        <>
            <Header />
            <Container>
                <section className="spacer">
                    <div className="tital_name">
                        <h1>Add User</h1>
                    </div>
                </section>
                <section>
                    <form onSubmit={handleSubmit} className="border rounded border-secondary rounded-3">
                        <div className="h4 bg-primary p-3 rounded-top-3 background">Add User</div>
                        <div className="form px-3">
                            <div className="user-box">
                                <label className='fw-bold mb-2 mt-3'>Enter Name</label><br />
                                <input
                                    type="text"
                                    placeholder="Enter Name"
                                    value={user_name}
                                    onChange={UserName}
                                    className='w-100 p-2 mb-3 rounded border border-1 border-secondary' cols="30" rows="5" />
                            </div>
                            <div className="user-box">
                                <label className='fw-bold mb-2 mt-3'>Enter Email</label><br />
                                <input
                                    type="text"
                                    placeholder="Enter Email"
                                    value={email}
                                    onChange={UserEmail}
                                    className='w-100 p-2 mb-3 rounded border border-1 border-secondary' cols="30" rows="5" />
                            </div>
                            <div className="user-box">
                                <label className='fw-bold mb-2 mt-3'>Enter Phone No</label><br />
                                <input
                                    type="text"
                                    placeholder="Enter Phone No"
                                    value={phone_no}
                                    onChange={UserPhone}
                                    className='w-100 p-2 mb-3 rounded border border-1 border-secondary' cols="30" rows="5" />
                            </div>
                            <div className="user-box">
                                <label className='fw-bold mb-2 mt-3'>Enter Password</label><br />
                                <input
                                    type="text"
                                    placeholder="Enter Password"
                                    value={password}
                                    onChange={UserPassword}
                                    className='w-100 p-2 mb-3 rounded border border-1 border-secondary' cols="30" rows="5" />
                            </div>
                            <input type="submit" className="fs-5 text-white btn-grad rounded py-1 px-5 mb-4 border-0" value="Add" />
                        </div>
                    </form>
                </section>
                <div className="spacer"></div>
            </Container>
            <Modal show={modal} onHide={handleClose}>
                <Modal.Body>User added successfully</Modal.Body>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal>
        </>
    )
}

export default User