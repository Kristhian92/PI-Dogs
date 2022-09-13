import React from 'react';
import { Link } from 'react-router-dom';
import '../LandingPage/LandingPage.css';


export default function LandingPage(){
    return(
        <div className='divLP' >
            <Link to='/home'>
                <button className='button'><h1><span>Home 🏡</span></h1></button>
            </Link>
        </div>
    )
}