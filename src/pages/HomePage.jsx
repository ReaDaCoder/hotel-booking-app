import React from "react";
import Navbar from "../components/NavBar";
import {
    CardMeta,
    CardHeader,
    CardDescription,
    CardContent,
    Card,
    Icon,
    Image,
  } from 'semantic-ui-react'

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
                    <div className="col"><Card>
    <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} />
    <CardContent>
      <CardHeader>Matthew</CardHeader>
      <CardMeta>
        <span className='date'>Joined in 2015</span>
      </CardMeta>
      <CardDescription>
        Matthew is a musician living in Nashville.
      </CardDescription>
    </CardContent>
    <CardContent extra>
      <a>
        <Icon name='user' />
        22 Friends
      </a>
    </CardContent>
  </Card></div>
                    <div className="col"><img src="hotel-room.jpg"width="150"/></div>
                    <div className="col"><img src="hotel-room.jpg" width="150"/></div>
                    <div className="col"><img src="hotel-room.jpg" width="150"/></div>
                    <div className="col">
                    <a href="http://www.google.com">
                    <img src="./images/arrow-icon-bg.png" />
                    </a>
                    </div>
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