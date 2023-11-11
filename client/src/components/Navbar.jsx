import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/authContext';
import { toast } from 'react-toastify';
const Navbar = () => {

    const [auth, setAuth] = useAuth();


    const handleLogout = () => {
        setAuth({
        ...auth,
        user: null,
        token: ''
    })
        localStorage.removeItem('auth');
        toast.success('Logged Out Successfully');
    };
    const [activeLinks, setActiveLinks] = useState({
        home: true,
        thoughts: false,
        register: false,
        login: false,
    });
    const handleActive = (link) => {
        const updatedLinks = { ...activeLinks };
        for (const key in updatedLinks) {
            updatedLinks[key] = false;
        }
        updatedLinks[link] = true;
        setActiveLinks(updatedLinks);
    };
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="#">PostYourThoughts</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav  mb-2 mb-lg-0 ms-auto mx-5">
                        <li className="nav-item">
                            <Link className={activeLinks.home ? 'nav-link active' : 'nav-link'}
                   
                    onClick={() => handleActive('home')} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={activeLinks.thoughts ? 'nav-link active' : 'nav-link'}
                    to="/thoughts"
                    onClick={() => handleActive('thoughts')}>Thoughts</Link>
                        </li>
                        {!auth.token ? (<>
                            <li className="nav-item">
                                <Link className={activeLinks.register ? 'nav-link active' : 'nav-link'}
                    to="/register"
                    onClick={() => handleActive('register')}>Register</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={activeLinks.login ? 'nav-link active' : 'nav-link'}
                    to="/login"
                    onClick={() => handleActive('login')}>Login</Link>
                            </li>
                        </>) : (
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Hello {auth.user.username} 
                                </Link>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="/add-thoughts">Add Thoughts</Link></li>
                                    <li><Link className="dropdown-item" to="/your-thoughts">Your Thoughts</Link></li>
                                    <li><Link className="dropdown-item" onClick={() => handleLogout()}>Logout</Link></li>

                                </ul>
                            </li>
                        )}


                    </ul>

                </div>
            </div>
        </nav>

    )
}

export default Navbar