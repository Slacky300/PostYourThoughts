import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import { useAuth } from '../context/authContext';
import { useUpdate } from '../context/hasUpdated';
const Modal = (props) => {

    const [auth] = useAuth();
    const [updateContent, setUpdateContent] = useState("");
    const [updateTitle, setUpdateTitle] = useState("");

    const [loading, setLoading] = useState(false);
    const {triggerUpdate} = useUpdate();
    useEffect(() => {
        setUpdateContent(props.thoughtContent);
        setUpdateTitle(props.thoughtTitle);
    }, [props.thoughtContent, props.thoughtTitle]);
    const handleEdit = async (e) => {
        try {
            e.preventDefault();
            setLoading(true)
            const res = await fetch(process.env.REACT_APP_BACKEND_URL + '/posts/update/' + props._id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${auth.token}`
                },
                body: JSON.stringify({
                    title: updateTitle,
                    content: updateContent
                })
            });
            const data = await res.json();
            if (res.status === 200) {
                toast.success(data.message);
                triggerUpdate();
            } else if (res.status === 400) {
                toast.error(data.message);
            }
        } catch (err) {
            toast.error("Something went Wrong!");
        }finally{
            setLoading(false);
        }

    }

    const handleDelete = async (e) => {
        try {
            e.preventDefault();
            const res = await fetch(process.env.REACT_APP_BACKEND_URL + '/posts/delete/' + props._id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${auth.token}`
                }
            });
            const data = await res.json();
            if (res.status === 200) {
                toast.success(data.message);
                triggerUpdate();
            } else if (res.status === 400) {
                toast.error(data.message);
            }
        } catch (err) {
            toast.error("Something went Wrong!");
        }
    }

    return (
        <>

            <div className="modal" id="exampleModal" tabIndex={-1}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{props.title}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <div className="modal-body">
                            {props.edit ? (
                                <>
                                    <form onSubmit={handleEdit}>
                                        <div className="mb-3">
                                            <label htmlFor="exampleFormControlInput1" className="form-label">Title</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={updateTitle}
                                                onChange={(e) => setUpdateTitle(e.target.value)}
                                                id="exampleFormControlInput1"
                                                placeholder="Title"
                                            />
                                            <label htmlFor="exampleFormControlTextarea1" className="form-label">Add Your Thoughts</label>
                                            <textarea
                                                className="form-control"
                                                value={updateContent}
                                                onChange={(e) => setUpdateContent(e.target.value)}
                                                id="exampleFormControlTextarea1"
                                                rows="3"
                                            ></textarea>
                                        </div>
                                        <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="submit" className="btn btn-success" disabled={loading}>{loading?(<>
                  Saving...
                </>):(<>Save changes</>)}</button>
                                    </div>
                                    </form>
                                    
                                </>


                            ) : props.view ? (
                                <>
                                    <div className='mb-3'>
                                        <h5>{props.thoughtTitle}</h5>
                                        <p>{props.thoughtContent}</p>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <p>Are you sure you want to delete : <b> {props.thoughtTitle}</b> ?</p>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-success" data-bs-dismiss="modal">Close</button>
                                        <button type="submit" className="btn btn-danger" data-bs-dismiss="modal" onClick={handleDelete}>Delete</button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Modal