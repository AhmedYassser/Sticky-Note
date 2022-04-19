import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router';



export default function Login(props) {

    const [user, setUser] = useState({ email: '', password: '' });
    const [error, seterror] = useState('');
    const [waiting, setWaiting] = useState(false);

    let Navigate = useNavigate();


    function getUser(e) {
        let myuser = { ...user };
        myuser[e.target.name] = e.target.value;
        setUser(myuser);
        console.log(myuser);
    }

    async function formSubmit(e) {
        e.preventDefault();
        setWaiting(true);

        let { data } = await axios.post(`http://route-egypt-api.herokuapp.com/signin`, user);
        console.log(data)
        if (data.message === 'success') {
            setWaiting(false);
            localStorage.setItem('token', data.token)
            Navigate('/home');
        } else {
            setWaiting(false);
            seterror(data.message);
        }

    }

    return (
        <>

            <div className='container1'>
                <div className='window'>
                    <div className='overlay'></div>
                    <div className='content'>
                        <div className='welcome'>Hello!</div>
                        <div className='subtitle'>Please Register</div>
                        <div className='input-fields'>
                            <form onSubmit={formSubmit}>
                                <input onChange={getUser} type='email' placeholder='Email' className='input-line full-width' name='email'></input>
                                <input onChange={getUser} type='password' placeholder='Password' className='input-line full-width' name='password'></input>
                                {error && <div className="alert alert-danger text-center">{error}</div>
                                }
                                <button className='ghost-round full-width'>{waiting ? 'Waiting...' : 'Sign In'}</button>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
