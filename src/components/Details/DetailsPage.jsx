import React, { Component } from 'react';
import ReviewSection from './ReviewSection';
import firebase from './../../models/firebase';

export default class DetailsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hotel: []
        };
        console.log(this.props.id)
    }
    componentDidMount() {
        const itemsRef = firebase.database().ref('hotels');
        itemsRef.on('value', (snapshot) => {
            let items = snapshot.val();
            console.log(1, items)
          
            let newState = [];
            for (let item in items) {

                if (item === this.props.id) {
                 console.log(2, item)
                 console.log(3, this.props.id)
                    newState.push({
                        id: item,
                        key: item,
                        name: items[item].name,
                        location: items[item].location,
                        description: items[item].description,
                        numberOfRooms: Number(items[item].numberOfRooms),
                        image: items[item].image,
                        parkingSlots: Number(items[item].parkingSlots)
                    });
                }
            }
            this.setState({ hotel: newState });
        });
    }

    // getData(id) {
    //     const hotel =  getDetails(Number(this.props.match.params.id));
    //     this.setState({ hotel });
    // }

    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        let main = <p>Loading &hellip;</p>;
        if (this.state.hotel.id === this.props.id) {
            main = (this.props.hotel.map(h => (
                <div className="hotelDetails">
                    <div>
                        <img alt={h.name} src={h.image} />
                    </div>
                    <h2>{h.name}</h2>
                    <h3>{h.location}</h3>
                    <p>{h.description}</p>
                    <p>Number of Rooms: {h.numberOfRooms}</p>
                    <p>Parking Slots: {h.parkingSlots}</p>
                </div>
            ))
            )
        }
        return (
            <div className="container">
                <h1 className="pageTitle">Details Page</h1>
                {main}

                <ReviewSection hotelId={Number(this.props.match.params.id)} />
            </div>
        );
    }
}