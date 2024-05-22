import React from "react";
import { Routes, Route } from "react-router-dom";
import {
Bookings, 
BookingCreate, BookingEdit, BookingView, 
VehicleCreate, VehicleEdit, VehicleView, 
BookingTiles, 
VehicleTiles
} from "screens";

const Component = (props) => {

    return (
        <Routes>
            

                        
                                                                                                            <Route path="/" element={<Bookings {...props} title={'Bookings Table'} nolistbar={true} />} />
                                            <Route path="Bookings/view/:id" element={<BookingView {...props} title={'View Booking'} />} />
                        <Route path="Bookings/edit/:id" element={<BookingEdit {...props} title={'Edit Booking'} />} />
                        <Route path="Bookings/create" element={<BookingCreate {...props} title={'Create Booking'} />} />
                                            <Route path="Vehicles/view/:id" element={<VehicleView {...props} title={'View Vehicle'} />} />
                        <Route path="Vehicles/edit/:id" element={<VehicleEdit {...props} title={'Edit Vehicle'} />} />
                        <Route path="Vehicles/create" element={<VehicleCreate {...props} title={'Create Vehicle'} />} />

                                                                                                                <Route path="/booking/tiles" element={<BookingTiles {...props} title={'Booking Tiles'} />} />
                                                                                                                <Route path="/vehicle/tiles" element={<VehicleTiles {...props} title={'Vehicle Tiles'} />} />
                <Route path="/bookingstable" element={<Bookings {...props} title={'Bookings Table'} />} />
                                                                                                        </Routes>
    )

};

export default Component;