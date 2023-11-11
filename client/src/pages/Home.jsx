import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div className='container'>
            <div className='row mt-5 justify-content-center align-items-center'>
                <h1 className='text-center mt-5'>Welcome to PostYourThoughts</h1>
                <p className='text-center mt-5'>A place to share your thoughts with the world!</p>
                <p className='text-center mt-5'>
                    <Link to='/thoughts'>
                    <button className='text-center  btn btn-primary'>Browse Thoughts</button>
                    </Link>
                    </p>
            </div>

        </div>


    )
}

export default Home