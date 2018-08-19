import React, { Component } from 'react';
import HotelCard from './HotelCard';

export default class HotelsList extends Component {
    render() {
        return (
            <div className="hotel_list">
                {this.props.hotels.map(h => (
                    <HotelCard
                        del={() => this.props.deleteHotel(h.id)}
                        key={h.key}
                        id={h.id}
                        name={h.name}
                        location={h.location}
                        image={h.image}/>
                ))}
            </div>
        );
    }
}