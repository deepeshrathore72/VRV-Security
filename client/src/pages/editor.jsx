import { Link } from "react-router-dom";

export default function Editor (){
    return (<div>
       <h1>Editor Page</h1>
       <Link to="/" className="AdminPanel">Home Page</Link>
    </div>)
};