import React, { Component } from 'react';
import Input from '../common/Input';
import firebase from './../../models/firebase';
import { withRouter } from 'react-router-dom';
import toastr from 'toastr';

class CreatePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
           
            name: '',
            location: '',
            description: '',
            rooms: '',
            image: '',
            parkingSlots: '',
            error: false,
            submitting: false
        };
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }
    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

     onSubmitHandler(e) {
        e.preventDefault();
       
        this.setState({ submitting: true });
        const hotel = {
            name: this.state.name,
            location: this.state.location,
            description: this.state.description,
            numberOfRooms: Number(this.state.rooms),
            image: this.state.image,
            parkingSlots: Number(this.state.parkingSlots)
        };

        const error = { message: '', errors: {} };

        if (hotel.description.length < 10) {
            error.message = 'Check the form for errors!';
            error.errors.description = 'Description must be more than 10 symmbols.';
        }
        if (isNaN(hotel.numberOfRooms) || hotel.numberOfRooms <= 0) {
            error.message = 'Check the form for errors!';
            error.errors.numberOfRooms = 'Number Of Rooms must be positive number.';
        }
        if (isNaN(hotel.parkingSlots) || hotel.parkingSlots <= 0) {
            error.message = 'Check the form for errors!';
            error.errors.parkingSlots = 'Parking slots must be positive number.';
        }
        if (error.message) {
            this.setState({ error, submitting:false });
            return;
        }
        firebase.database().ref('hotels')
        .push(hotel).then(() => {
            console.log('created')
            this.props.history.push('/');
            toastr.success('Hotel created successfully');   
        }).catch(err => {
            this.setState({ error: err });
            toastr.error('Created is not successfully');
            return;
        })
        this.setState({ error: false });
    }

    render() {
        if (this.state.error) {
            return (
                < div className="error">
                    <h2>{this.state.error.message}</h2>
                </div >
            )
        }
        return (
            <div>
                <h1 className="pageTitle">Create Hotel</h1>
                {this.state.error}
                <form onSubmit={this.onSubmitHandler}>
                    <Input
                        name="name"
                        value={this.state.name}
                        onChange={this.onChangeHandler}
                        label="Name"
                    />
                    <Input
                        name="location"
                        value={this.state.location}
                        onChange={this.onChangeHandler}
                        label="Location"
                    />
                    <Input
                        name="description"
                        value={this.state.description}
                        onChange={this.onChangeHandler}
                        label="Description"
                    />
                    <Input
                        name="rooms"
                        type="number"
                        value={this.state.numberOfRooms}
                        onChange={this.onChangeHandler}
                        label="NumberOfRooms"
                    />
                    <Input
                        name="image"
                        value={this.state.image}
                        onChange={this.onChangeHandler}
                        label="Image"
                    />
                    <Input
                        name="parkingSlots"
                        type="number"
                        value={this.state.parkingSlots}
                        onChange={this.onChangeHandler}
                        label="ParkingSlots"
                    />
                    <input
                        type="submit"
                        value="Create"
                        disabled={this.state.submitting}
                    />

                </form>
            </div>
        );
    };
}

export default withRouter(CreatePage);