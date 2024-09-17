import React from "react";
import Navbar from "../components/NavBar";

export default function HomePage(){
    return(
        <div>
            <div className="top">
            <Navbar/>
            </div>
            <div className="main">
                <div className="grid">
                    <div className="col"><img src="hotel-room.jpg" width="150"/></div>
                    <div className="col"><img src="hotel-room.jpg"width="150"/></div>
                    <div className="col"><img src="hotel-room.jpg" width="150"/></div>
                    <div className="col"><img src="hotel-room.jpg" width="150"/></div>
                </div>
            </div>
        </div>
    )
}