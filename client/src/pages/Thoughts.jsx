import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Thoughts = () => {
    const [thoughts, setThoughts] = useState([{}]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        const getThoughts = async () => {
            try {
                setLoading(true);
                const response = await fetch(process.env.REACT_APP_BACKEND_URL + '/posts', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                const data = await response.json();
                if (response.status === 200) {
                    console.log(data);
                    setThoughts(data.posts);
                }
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        }
        getThoughts();
    }, []);

    return (
        <div className='container my-5'>
            <div className='row my-3 d-flex justify-content-center align-items-center'>
                <h4 className='text-center my-2'><i>Thoughts</i></h4>
                <div className='d-flex justify-content-end'>
                <Link to='/add-thoughts'><button className='btn btn-success mx-3 '>Create New Thought</button></Link>
                </div>
               
                {!loading ? (
                    thoughts?.map((thought) => (
                        <div className="card my-3" key={thought._id}>
                            <div className="card-header">
                                {thought?.createdAt ? `Posted On: ${thought.createdAt.split('T')[0]}` : 'No Date'}
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{thought.title}</h5>
                                <p className="card-text">{thought.content}</p>
                                <p href="#" className="btn btn-primary">By: <i>{thought.author?.username}</i></p>
                            </div>
                        </div>
                    ))
                ) : (<>
                    <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </>)}

            </div>

        </div>
    )
}

export default Thoughts