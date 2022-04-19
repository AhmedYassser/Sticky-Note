import jwt_decode from 'jwt-decode';
import React from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import img from '../one.jpg'


export default function Navbar() {

    let token = localStorage.getItem('token');

    if (token) {
        var decoded = jwt_decode(token);
    }

    let Location = useLocation();
    function logout() {
        localStorage.clear();
    }

    return (
        <>

            <div className="container-fluid d-flex justify-content-between p-2">
                <ul className={`d-flex list-unstyled text-white`}>

                    <li><img src={img} className={`logo`} alt='' /></li>
                    {token ? <li className={`mx-2 text-white nav-link`}><NavLink to='/home'>Home</NavLink></li>
                        : ''}
                </ul>
                {Location.pathname === '/home' ?
                    <ul className={`d-flex list-unstyled`}>
                        {token ? <a className={`nav-link`}> Welcome : {decoded.first_name} </a>
                            : ''}
                        <li onClick={logout} className={`mx-2 text-white nav-link`}> <Link to='/login'>Logout</Link> </li>
                    </ul>
                    :
                    <ul className={`d-flex list-unstyled`}>
                        <li className={`mx-2 text-white nav-link`}><Link to='/login'>Login</Link></li>
                        <li className={`mx-2 text-white nav-link`}><Link to='/register'>Register</Link></li>
                    </ul>
                }
            </div>


        </>
    )
}
