import React from "react";
import Navbar from "../components/NavBar";

export default function HomePage(){
    const myStyle = {
        backgroundImage:
            "url('./images/swimming-pool.jpg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
    };
    return(
        <div>
            {/* <form className="search-form">
            <input type="search" id="gsearch" name="gsearch"/>
            <button>Search</button>
            </form> */}
            <div className="top">
                 </div>
            <div className="main">
                <div className="grid">
                    <div className="col"><img src="hotel-room.jpg" width="150"/></div>
                    <div className="col"><img src="hotel-room.jpg"width="150"/></div>
                    <div className="col"><img src="hotel-room.jpg" width="150"/></div>
                    <div className="col"><img src="hotel-room.jpg" width="150"/></div>
                </div>
            </div>
            <footer>
                <h6>Contacts</h6>
                <ul>
                    <li>Email: theoceanviewpalace@gmail.com</li>
                    <li>Call: 087 043 9576</li>
                </ul>
            </footer>
        </div>
    )
}