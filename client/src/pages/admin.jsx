import { Link } from "react-router-dom";
import './admin.css';

export default function Admin (){

    return (<div>
       <h1>Admin Panel</h1>
       <Link to="/" className="AdminPanel">Home Page</Link>
    </div>)
};