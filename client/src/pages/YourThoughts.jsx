import React, { useEffect, useState } from 'react'
import Modal from '../components/Modal';
import { useAuth } from '../context/authContext';
import { useUpdate } from '../context/hasUpdated';


const YourThoughts = () => {
    const [modalType, setModalType] = useState('');

    const { triggerUpdate } = useUpdate();


    const [auth] = useAuth();

    const [thoughts, setThoughts] = useState([{}]);

    const [loading, setLoading] = useState(false);
    const [selectedThought, setSelectedThought] = useState({
        title: '',
        content: '',
        _id: ''
    });

    const handleModal = (type) => {
        setModalType(type);
    };
    useEffect(() => {

        const fetchData = async () => {

            try {
                setLoading(true);
                const res = await fetch(process.env.REACT_APP_BACKEND_URL + '/posts/userPosts', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${auth.token}`
                    }
                });
                const data = await res.json();
                if (res.status === 200) {
                    setThoughts(data.posts);
                    console.log(data.posts)
                } else if (res.status === 400) {
                    console.log(data.message);
                }
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);

            }
        }
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [triggerUpdate]);

    return (
        <div className='container'>
            <div className='row mt-5 justify-content-center align-items-center'>
                <h4 className='text-center my-2'><i>Your Thoughts</i></h4>

                <table class="table mt-3">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Title</th>
                            <th scope='col'>Posted On</th>
                            <th scope="col">View</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? <div class="spinner-border text-primary" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div> : (thoughts?.map((thought, index) => (

                            <tr key={thought._id}>
                                <th scope="row">{index + 1}</th>
                                <td>{thought.title}</td>
                                <td>{thought?.createdAt ? `${thought.createdAt.split('T')[0]}` : 'No Date'}</td>
                                <td>
                                    <button className='btn btn-primary' data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => { handleModal('view'); setSelectedThought(thought); }}>View</button>
                                </td>
                                <td>
                                    <button className='btn btn-warning' data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => { handleModal('edit'); setSelectedThought(thought); }}>Edit</button>
                                </td>
                                <td>
                                    <button className='btn btn-danger' data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => { handleModal('delete'); setSelectedThought(thought); }}>Delete</button>
                                </td>
                            </tr>
                        )))}
                    </tbody>
                </table>

            </div>

            <Modal
                title={modalType === 'delete' ? 'Delete Your Thoughts' : modalType === 'edit' ? 'Edit Your Thoughts' : 'View Your Thoughts'}
                edit={modalType === 'edit'}
                view={modalType === 'view'}
                thoughtTitle={selectedThought.title}
                thoughtContent={selectedThought.content}
                _id={selectedThought._id}
            />
        </div>
    )
}

export default YourThoughts