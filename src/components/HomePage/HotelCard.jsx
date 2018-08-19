import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default function HotelCard({ name, image, location, id, del }) {
    return (
        <article className="hotelCard">
            <div className="boxHotelImg">
                <img alt={name} src={image} className="hotelImg"/>
            </div>
            <p className="hotelName">{name} in {location}</p>
            <Link to={'hotels/details/' + id} state={id}  className="hotelDetails">View Details</Link>
            <a href="javascript:void(0)" onClick={del} className="hotelDelete">Delete</a>
        </article>
    );
}