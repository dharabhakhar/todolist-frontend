import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Header() {
    const handleLogOut = () => {
        localStorage.clear();
    }
    return (
        <>
            <Navbar expand="lg" className="background">
                <Container>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0 fs-5 fw-bold"
                            style={{ maxHeight: '100px' }}
                            navbarScroll>
                            <Nav.Link href="/home">Home</Nav.Link>
                            <Nav.Link href="/add_user">Add User</Nav.Link>
                            <Nav.Link href="/add_task">Add Task</Nav.Link>
                        </Nav>
                        <Button className='ms-3 btn-grad'>
                            <a href="/" onClick={handleLogOut} className='text-white'>Logout</a>
                        </Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Header;