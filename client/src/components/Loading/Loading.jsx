import React from 'react';
import loading from '../../styles/loading (1).gif';
import '../Loading/Loading.css';


export default function Loading() {
    return (
        <div className="box_loading">
            <img src={loading} alt="Loading"/>
        </div>
    )
}