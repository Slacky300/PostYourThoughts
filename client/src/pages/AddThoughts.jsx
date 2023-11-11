import React,{useState}from 'react'
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const AddThoughts = () => {
  const [auth] = useAuth();

  const [thoughts, setThoughts] = useState({
    title:"",
    content:""
  });

  const navigate = useNavigate(); 



  const handleInput = (e) => {
    setThoughts({
      ...thoughts,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(thoughts.title.length < 3){
      toast.error('Title should be at least 3 characters long');
      return;
    }
    if(thoughts.content.length < 10){
      toast.error('Thoughts should be at least 10 characters long');
      return;
    }
    if(thoughts.content.length>500){
      toast.error('Thoughts should be not more than 500 characters long');
      return;
    }
    try {
      const res = await fetch(process.env.REACT_APP_BACKEND_URL+'/posts/add', {

        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}`
        },
        body: JSON.stringify(thoughts)
      });
      const data = await res.json();
      if (res.status === 200) {
        toast.success('Thoughts Added Successfully');
        navigate('/your-thoughts');
      } else if (res.status === 400) {
        toast.error(data.message);
      }
    }catch(err){
      console.log(err);
      toast.error('Something Went Wrong');
    }
  }

  return (
    <div className='container'>
        <div className='row mt-5 justify-content-center align-items-center'>
            <h4 className='text-center mt-5'><i>Add Your Thoughts</i></h4>
            <form className='col-6' onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Title</label>
                    <input type="text" className="form-control"  required name='title' value={thoughts.title} onChange={handleInput} id="exampleFormControlInput1" placeholder="Title" />
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Add Your Thoughts ({thoughts.content.length}/500)</label>
                    <textarea className="form-control" name='content' required value={thoughts.content} onChange={handleInput} id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>
                <button className='btn btn-primary' type='submit'>Post</button>
            </form>
        </div>
    </div>
  )
}

export default AddThoughts