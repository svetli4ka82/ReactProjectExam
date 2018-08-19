import React, { Component } from 'react';
import HotelsList from './HotelsList';
import { Link } from 'react-router-dom';
import firebase from './../../models/firebase';

export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hotels: []
        };
        this.deleteHotel = this.deleteHotel.bind(this);
    }

    componentDidMount() {
        const itemsRef = firebase.database().ref('hotels/');

        itemsRef.on('value', (snapshot) => {
            let items = snapshot.val();
            let newState = [];
            for (let item in items) {
                newState.push({
                    id: item,
                    key: item,//items[item].key,
                    name: items[item].name,
                    location: items[item].location,
                    description: items[item].description,
                    numberOfRooms: Number(items[item].numberOfRooms),
                    image: items[item].image,
                    parkingSlots: Number(items[item].parkingSlots)
                });
            }
            this.setState({ hotels: newState });
        });
    }

    ///old
    // componentWillReceiveProps(nextProps) {
    //     // if (nextProps.match.params.page !== this.props.match.params.page) {
    //     //     this.getData(Number(nextProps.match.params.page));
    //     // }
    // }

    //  getData(page = Number(this.props.match.params.page) || 1) {
    // //     const data =  getPage(page);
    // //     this.setState({ hotels: data });
    //  }

    deleteHotel(id) {
        const itemRef = firebase.database().ref(`/hotels/${id}`);
        itemRef.remove();
        this.setState({ hotels: this.state.hotels.filter(h => h.id !== id) });
    }

    render() {
        const page = Number(this.props.match.params.page) || 1;
        return (
            <div className="container">
                <h1 className="pageTitle">Home Page</h1>
                <p className="pTitle">Welcome to our site.</p>

                {this.state.hotels.length === 0
                    ? <p>Loading &hellip;</p>
                    : <HotelsList
                        hotels={this.state.hotels}
                        deleteHotel={this.deleteHotel} />}

                <div className="pagination">
                    {page > 1 && <Link className="btnPage" to={'/view/' + (page - 1)}>NEXT</Link>}
                    <Link to={'/view/' + (page + 1)} className="btnPage">PREV</Link>
                </div>
            </div>
        );
    }
}