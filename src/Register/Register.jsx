import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router';

export default function Register(props) {

    const [user, setUser] = useState({ first_name: '', last_name: '', email: '', password: '', age: 0 });
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
        
        let { data } = await axios.post(`http://route-egypt-api.herokuapp.com/signup`, user);
        console.log(data)
            if (data.message === 'success') {
                setWaiting(false);
                Navigate('/login');
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
                                <input onChange={getUser} type='text' placeholder='First Name' className='input-line full-width' name='first_name'></input>
                                <input onChange={getUser} type='text' placeholder='Last Name' className='input-line full-width' name='last_name'></input>
                                <input onChange={getUser} type='email' placeholder='Email' className='input-line full-width' name='email'></input>
                                <input onChange={getUser} type='password' placeholder='Password' className='input-line full-width' name='password'></input>
                                <input onChange={getUser} type='age' placeholder='age' className='input-line full-width' name='age'></input>
                                {error && <div className="alert alert-danger text-center">{error}</div>
                                }
                                <button className='ghost-round full-width'>{waiting ? 'Waiting...' : 'Create Account'}</button>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
