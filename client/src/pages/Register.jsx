import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = () => {

    const [user, setUser] = useState({
        username: '',
        email: '',
        password: ''
    });

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        if (user.username.length < 3) {
            toast.error('Name should be at least 3 characters long');
            return;
        }

        if (user.password.length < 6) {
            toast.error('Password should be at least 6 characters long');
            return;
        }

        const emailRegex = /^\S+@\S+\.\S+$/;

        if (!emailRegex.test(user.email)) {
            toast.error('Please enter a valid email');
            return;
        }

        try {

            const res = await fetch(process.env.REACT_APP_BACKEND_URL + '/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });

            const data = await res.json();

            if (res.status === 201) {

                toast.success('Registered Successfully');
                navigate('/login');
            } else if (res.status === 400) {
                toast.error(data.message);
            }



        } catch (err) {
            console.log(err);
            toast.error('Something Went Wrong');

        }finally{


            setLoading(false);

        }
    };

    return (
        <div className='container'>
            <div className='row mt-5 justify-content-center align-items-center'>
                <h1 className='text-center mt-5'>Register</h1>
                <form className='col-6' onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" name="username" className="form-control" required value={user.username} onChange={handleInputChange} id="username" placeholder="Name" />
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" name="email" required className="form-control" value={user.email} onChange={handleInputChange} id="email" placeholder="Email" />
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" name="password" required className="form-control" value={user.password} onChange={handleInputChange} id="password" placeholder="Password" />
                    </div>
                    <button className='btn btn-primary' disabled={loading} type='submit'>{loading?(<>
                        Registering...
                </>):(<>Register</>)}</button>
                </form>
            </div>
        </div>
    );
};

export default Register;
