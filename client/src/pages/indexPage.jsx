import Post from '../post';
import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from '../UserContext'
import './indexPage.css';

export default function IndexPage(){
    const { userInfo } = useContext(UserContext);
    return(
        <>
           <Post/>
           {userInfo?.role === "admin" && (
                <div className="text-center mt-3">
                    <Link to="/admin" className="Panel">
                        Admin Page
                    </Link>
                </div>
            )}
            {userInfo?.role === "editor" && (
                <div className="text-center mt-3">
                    <Link to="/editor" className="Panel">
                        Editor Page
                    </Link>
                </div>
            )}
        </>
    )
}