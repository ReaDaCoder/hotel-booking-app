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
                    <div className="col"><img src=""/></div>
                    <div className="col"></div>
                    <div className="col"></div>
                    <div className="col"></div>
                </div>
            </div>
        </div>
    )
}