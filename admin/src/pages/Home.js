import Dashboard from './Dashboard';
import Header from './Header';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
    return (
        <>
            <div>
                <Header/>
                <Dashboard/>
            </div>
        </>
    )
}