import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/authContext';
const Login = () => {

    const [user, setUser] = useState({
        email: '',
        password: ''
    });
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    const handleInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const res = await fetch(process.env.REACT_APP_BACKEND_URL+'/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
            const data = await res.json();

            if(res.status === 200){
                localStorage.setItem('auth', JSON.stringify(data));
                setAuth({
                    ...auth,
                    user: data.user,
                    token: data.token
                })
                toast.success('Logged In Successfully');
                navigate('/thoughts');
            }else if(res.status === 400){
                toast.error(data.message);
            }
        }catch(err){
            console.log(err);
            toast.error('Something Went Wrong');
        }
    }
  return (
    <div className='container' >
        <div className='row mt-5 justify-content-center align-items-center'>
            <h1 className='text-center mt-5'>Login</h1>
            <form className='col-6' onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Email</label>
                    <input type="email" name='email' required className="form-control" value={user.email} onChange={handleInputChange} id="exampleFormControlInput1" placeholder="Email" />
                    <label htmlFor="exampleFormControlInput1" className="form-label">Password</label>
                    <input type="password" name='password' required className="form-control" value={user.password} onChange={handleInputChange} id="exampleFormControlInput1" placeholder="Password" />
                </div>
                <button className='btn btn-primary' type='submit'>Login</button>
            </form>
        </div>
    </div>
  )
}

export default Login